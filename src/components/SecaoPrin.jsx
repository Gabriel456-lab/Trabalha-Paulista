import Hero from "./Hero";
import SearchBar from "./SearchBar";
import Commitments from "./Commitments";
import HomeSections from "./HomeSections";

export default function SecaoPrin() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 pb-8 pt-12 lg:px-20">
        <Hero />
        <SearchBar />
        <Commitments />
      </main>
      <HomeSections />
    </>
  );
}
