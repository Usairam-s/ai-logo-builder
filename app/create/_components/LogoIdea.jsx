"use client";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import HeadingDescription from "./HeadingDescription";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Designs from "@/app/_data/Designs";
import Prompt from "@/app/_data/Prompt";
import axios from "axios";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

function LogoIdea({ value, data, onHandleInputChange }) {
  //get user
  const { user } = useUser();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleIdea = (v) => {
    onHandleInputChange(v);
  };

  useEffect(() => {
    if (data.title && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(data));
    }
  }, [data]);
  useEffect(() => {
    generateIdeas();
  }, []);
  const generateIdeas = async () => {
    setLoading(true);
    try {
      const PROMPT = Prompt.DESIGN_IDEA_PROMPT.replace(
        "{logoType}",
        data.design.title
      )
        .replace("{logoTitle}", data.title)
        .replace("{logoDesc}", data.desc)
        .replace("{logoPrompt}", data.design.prompt);

      console.log("Generated prompt", PROMPT);

      const result = await axios.post("/api/generate-ideas", {
        prompt: PROMPT,
      });

      console.log(result.data);
      setIdeas(result.data.ideas || []);
    } catch (error) {
      console.error("Failed to generate ideas:", error);
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Card className="border-none shadow-none p-0">
          <CardHeader>
            {" "}
            <HeadingDescription
              main="Logo Ideas"
              sub="Select an idea from these ai generated ideas or let ai choose best for you"
            />
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3 mt-4">
            {loading ? (
              <h3 className="flex items-center justify-center animate-spin">
                <Loader2 />
              </h3>
            ) : ideas.length > 0 ? (
              ideas.map((idea, idx) => (
                <span
                  onClick={() => handleIdea(idea)}
                  className={`p-2 my-1 w-fit rounded-full border cursor-pointer ${
                    value === idea ? "border-primary" : ""
                  }`}
                  key={idx}
                >
                  {idea}
                </span>
              ))
            ) : (
              <p>No ideas found. Try generating again!</p>
            )}
          </CardContent>

          <CardFooter className="w-full flex items-center justify-end ">
            {user ? (
              <Button asChild>
                <Link href={"/generate-logo"}>
                  Contine <ArrowRight />
                </Link>
              </Button>
            ) : (
              <SignInButton mode="modal" forceRedirectUrl="/generate-logo">
                <Button>
                  Contine <ArrowRight />
                </Button>
              </SignInButton>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default LogoIdea;
