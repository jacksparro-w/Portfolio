import { EnvelopeHero } from "@/components/home/EnvelopeHero";

export default function HomePage() {
  return (
    <div className="home-scene">
      <EnvelopeHero />
      <div id="next" className="home-next">
        <p className="script">A journey written one line at a time.</p>
        <a href="/about" className="text-link">Read my story →</a>
      </div>
    </div>
  );
}
