import type { NextPage } from "next";
import Link from "next/link";

const links = ["webaudio", "binary", "dataviews", "canvas"];
const Home: NextPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Next + TailwindCSS</h1>
      {links.map((link) => (
        <div key={link}>
          <Link href={`${link}`}>{link}</Link>
        </div>
      ))}
    </>
  );
};

export default Home;
