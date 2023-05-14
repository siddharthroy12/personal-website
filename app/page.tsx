"use client";
import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import TextLoop from "react-text-loop";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

const TITLES = [
  "Frontend Developer",
  "Backend Developer",
  "OpenSource Contributer",
  "Newbie Designer",
];

export default function Home() {
  const [showAnimatedTitle, setShowAnimatedTitle] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setShowAnimatedTitle(true);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <div
        style={{
          visibility: showAnimatedTitle ? "visible" : "hidden",
          height: showAnimatedTitle ? 72 : 0,
        }}
      >
        <TextLoop
        delay={0}
          children={TITLES.map((title) => (
            <div key={title} className="w-screen text-center">
              {title}
            </div>
          ))}
          className="z-10 text-4xl cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-7xl whitespace-nowrap text-white"
        />
      </div>
      <h1
        className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-7xl whitespace-nowrap bg-clip-text"
        style={{ display: showAnimatedTitle ? "none" : "inline" }}
      >
        {TITLES[0]}
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">
          Hi, my name is Siddharth, I'm building solutions for IAoT at{" "}
          <Link
            target="_blank"
            href="http://www.everlytics.io/"
            className="underline duration-500 hover:text-zinc-300"
          >
            Everlytics
          </Link>
          <br />
        </h2>
      </div>
    </div>
  );
}
