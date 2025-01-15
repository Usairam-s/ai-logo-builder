"use client";
import React, { useState } from "react";
import Lookup from "../_data/Lookup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  const [title, setTitle] = useState("");
  return (
    <>
      <div className="min-h-[80vh] bg-gradient-to-b from-blue-200 via-cyan-200 to-transparent rounded-t-sm  w-full flex items-center flex-col justify-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-4">
          <h1 className="lg:text-6xl md:text-5xl text-4xl font-semibold text-primary">
            {Lookup.HeroHeading}
          </h1>
          <h2 className="lg:text-5xl md:text-4xl text-3xl text-center font-semibold lg:leading-tight">
            {Lookup.HeroSubheading}
          </h2>
          <p className="md:text-base text-sm text-muted-foreground text-center max-w-2xl mx-auto">
            {Lookup.HeroDesc}
          </p>
        </div>

        <div className="mt-6 max-w-2xl mx-auto  grid w-full grid-cols-3 gap-2 p-4">
          <Input
            placeholder="Logo/Brand Name"
            className="col-span-2 shadow-md bg-white text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Link href={`/create?title=${title}`}>
            <Button className="col-span-1 shadow-md">Search</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Hero;
