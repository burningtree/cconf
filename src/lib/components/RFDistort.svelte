<script>
  /**
   * LoRa broadcast simulator rendered onto the hero backdrop.
   *
   * The antenna is an omnidirectional transmitter. It radiates concentric
   * packet bursts; each burst is filled with fine "symbol" ripples. The physics
   * is driven by the current radio config (see `profile` prop):
   *   - symbol ripple cadence  ← symbol rate (BW / 2^SF)
   *   - burst length (on-air)  ← real time-on-air (SF · CR · BW · payload)
   * so lowering SF / raising BW gives fast, tight ripples and short bursts,
   * while SF12 gives slow, long, widely-spaced waves.
   *
   * Drawn through a WebGL shader that warps the actual backdrop pixels, over the
   * <img> (kept as a no-WebGL fallback) with the same object-cover fit.
   */
  import { broadcastTiming, simTime } from '../lora.js';

  const base = import.meta.env.BASE_URL;

  /** @type {{ symbolRate:number, airtime:number, totalSymbols:number, preamble:number }} */
  let { profile } = $props();

  let canvas;

  // Visual mapping from the radio profile → shader params (shared with monitor).
  let sim = { cadence: 8, airtime: 0.6, period: 3.6 };
  $effect(() => {
    if (profile) sim = broadcastTiming(profile);
  });

  const VERT = `
    attribute vec2 aPos;
    void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
  `;

  const FRAG = `
    precision highp float;
    uniform sampler2D uTex;
    uniform vec2  uRes;
    uniform vec2  uImg;
    uniform vec2  uCenter;   // antenna beacon (device px), fixed
    uniform float uTime;
    uniform float uWeak;
    uniform float uDpr;
    uniform float uV;        // wave propagation speed (css px/s)
    uniform float uCadence;  // symbol ripples per second
    uniform float uPeriod;   // seconds between packet bursts
    uniform float uAirtime;  // burst on-air duration (seconds)
    uniform float uAmp;      // ripple amplitude (css px)

    void main() {
      vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);

      // object-cover, object-right, vertically centered
      float scale = max(uRes.x / uImg.x, uRes.y / uImg.y);
      vec2 drawn = uImg * scale;
      vec2 offset = vec2(uRes.x - drawn.x, (uRes.y - drawn.y) * 0.5);
      vec2 uv = (p - offset) / drawn;

      vec2 md = p - uCenter;
      float dpx = length(md);
      vec2 dir = dpx > 0.001 ? md / dpx : vec2(0.0);
      float d = dpx / uDpr;                 // work in css px

      // retarded time: the wave now at distance d left the antenna at t - d/v
      float tr = uTime - d / uV;
      float started = step(0.0, tr);

      // packet burst envelope (repeats every uPeriod, on-air for uAirtime)
      float ph = mod(tr, uPeriod);
      float edge = 0.16 * uAirtime;
      float env = smoothstep(0.0, edge, ph) * (1.0 - smoothstep(uAirtime - edge, uAirtime, ph));

      // fine symbol ripples inside the burst
      float ripple = sin(6.2831853 * uCadence * tr);

      float att = exp(-d / 2300.0);         // spreads far, fades gently
      float dispCss = ripple * env * started * att * uAmp;

      vec2 uvD = uv + dir * (dispCss * uDpr) / drawn;

      // pixelation + chroma ride the wavefronts (local distortion energy)
      float energy = clamp(abs(dispCss) / uAmp, 0.0, 1.0);
      float px = mix(1.0, 24.0, energy);
      vec2 grid = drawn / px;
      vec2 uvPix = (floor(uvD * grid) + 0.5) / grid;
      uvD = mix(uvD, uvPix, energy * 0.75);

      uvD = clamp(uvD, 0.0, 1.0);
      vec4 col = texture2D(uTex, uvD);

      // very subtle chromatic split (kept low to stay blue)
      float ca = energy * 0.0022;
      col.r = texture2D(uTex, clamp(uvD + dir * ca, 0.0, 1.0)).r;
      col.b = texture2D(uTex, clamp(uvD - dir * ca, 0.0, 1.0)).b;

      // contrast, not brightness
      col.rgb = (col.rgb - 0.5) * 1.18 + 0.5;

      // weak-signal grain
      float n = fract(sin(dot(p, vec2(12.9898, 78.233)) + uTime) * 43758.5453);
      col.rgb += (n - 0.5) * 0.14 * uWeak;

      gl_FragColor = col;
    }
  `;

  function compile(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('RFDistort shader:', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  $effect(() => {
    const section = document.getElementById('top');
    const gl = canvas.getContext('webgl', { premultipliedAlpha: false, antialias: true });
    if (!gl || !section) {
      canvas.style.display = 'none'; // fall back to the <img> underneath
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      canvas.style.display = 'none';
      return;
    }
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // fullscreen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (n) => gl.getUniformLocation(prog, n);
    const uRes = u('uRes'), uImg = u('uImg'), uCenter = u('uCenter'), uTime = u('uTime');
    const uWeak = u('uWeak'), uDpr = u('uDpr'), uV = u('uV'), uCadence = u('uCadence');
    const uPeriod = u('uPeriod'), uAirtime = u('uAirtime'), uAmp = u('uAmp');

    // texture
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    // texel row 0 = top of image (p is top-left origin) → do NOT flip on upload
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([6, 10, 16, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let imgW = 1448, imgH = 1086, ready = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgW = img.naturalWidth;
      imgH = img.naturalHeight;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      ready = true;
      locateBeacon();
    };
    img.onerror = () => (canvas.style.display = 'none');
    img.src = `${base}backdrop.png`;

    // BX/BY = beacon position within the 1448x1086 image (1080, 426).
    const BX = 1080 / 1448, BY = 426 / 1086;

    // beacon screen position (CSS px), from object-cover / object-right fit
    let rw = 0, rh = 0, beaconX = 0, beaconY = 0;
    const locateBeacon = () => {
      const scale = Math.max(rw / imgW, rh / imgH);
      const dw = imgW * scale, dh = imgH * scale;
      beaconX = rw - dw + BX * dw; // right-aligned
      beaconY = (rh - dh) / 2 + BY * dh; // vertically centered
    };

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = section.getBoundingClientRect();
      rw = r.width;
      rh = r.height;
      canvas.width = Math.round(rw * dpr);
      canvas.height = Math.round(rh * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      locateBeacon();
    };
    resize();

    window.addEventListener('resize', resize);

    let raf;
    const render = (now) => {
      // shared sim clock (negative during startup delay ⇒ no waves yet). Lines
      // up with the monitor + waterfall so "transmitting" matches a burst.
      const t = simTime(now);

      gl.useProgram(prog);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uImg, imgW, imgH);
      gl.uniform2f(uCenter, beaconX * dpr, beaconY * dpr);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uWeak, 0.12);
      gl.uniform1f(uDpr, dpr);
      gl.uniform1f(uV, 820);
      gl.uniform1f(uAmp, ready ? 16 : 0);
      gl.uniform1f(uCadence, sim.cadence);
      gl.uniform1f(uPeriod, sim.period);
      gl.uniform1f(uAirtime, sim.airtime);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  });
</script>

<canvas bind:this={canvas} class="absolute inset-0 h-full w-full" aria-hidden="true"></canvas>
