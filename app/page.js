import Hero from "./_components/Hero";
import LogoList from "./dashboard/_components/LogoList";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="mt-12">{/* <LogoList /> */}</div>
    </div>
  );
}
