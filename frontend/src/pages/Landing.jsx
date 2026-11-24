import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Features from "../components/Features.jsx";
import CallToAction from "../components/CallToAction.jsx";
import Footer from "../components/Footer.jsx";

function Landing() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default Landing;