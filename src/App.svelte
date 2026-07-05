<script>
  import Nav from './lib/components/Nav.svelte';
  import Hero from './lib/components/Hero.svelte';
  import About from './lib/components/About.svelte';
  import Communities from './lib/components/Communities.svelte';
  import Speakers from './lib/components/Speakers.svelte';
  import Sponsors from './lib/components/Sponsors.svelte';
  import Tickets from './lib/components/Tickets.svelte';
  import Footer from './lib/components/Footer.svelte';
  // Program, Venue and Hardware are built but hidden for now — re-add when content is ready.
  // import Program from './lib/components/Program.svelte';
  // import Venue from './lib/components/Venue.svelte';
  // import Hardware from './lib/components/Hardware.svelte';
</script>

<Nav />
<main>
  <Hero />
  <About />
  <Speakers />
  <Communities />
  <Sponsors />
  <Tickets />
</main>
<Footer />
