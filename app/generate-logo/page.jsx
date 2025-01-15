"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../_context/UserContext";
import Prompt from "@/app/_data/Prompt";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";

function page() {
  const { userDetail } = useContext(UserContext);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180); // 2 minutes and 30 seconds (150 seconds)
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    // Start the countdown timer
    const timerInterval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerInterval); // Stop the timer when it reaches 0
          return 0;
        }
        return prevTime - 1; // Decrease the time by 1 second
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerInterval);
  }, []);

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const texts = [
    "As AI Modal is free Est time 2-3 min",
    "Generating your unique logo...",
    "Go grab your coffee...",
    "Your wait will worth it...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setFadeOut(false);
      }, 1000); // Wait for fade out before changing text
    }, 10000); // Change text every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // if (userDetail.userEmaail && typeof window !== "undefined") {
    const storage = localStorage.getItem("formData");
    if (storage) {
      const convertToObject = JSON.parse(storage);
      setFormData(convertToObject);
      console.log(convertToObject);
    }
    // }
  }, []);

  useEffect(() => {
    if (formData) {
      generateLogoPrompt();
    }
  }, [formData]);

  const generateLogoPrompt = async () => {
    setLoading(true);
    const PROMPT = Prompt.LOGO_PROMPT.replace(
      "{logoTitle}",
      formData.title || ""
    )
      .replace("{logoDesc}", formData.desc || "")
      .replace("{logoColor}", formData.pallete || "")
      .replace("{logoIdea}", formData.idea || "")
      .replace("{logoDesign}", formData.design?.title || "")
      .replace("{logoPrompt}", formData.design?.prompt || "");

    const result = await axios.post("/api/final-logo-prompt", {
      prompt: PROMPT,
      email: userDetail.userEmail,
      title: formData.title,
      desc: formData.desc,
    });
    // console.log(result.data.prompt);
    setShowBanner(false);
    setLoading(false);
    setLogo(result.data.image);
    // setIdeas(result.data.ideas);
    // console.log(PROMPT);
  };

  //down laod logo

  const onDownload = (image) => {
    const imageWindow = window.open();
    imageWindow.document.write(`<img src="${image}" alt="base64 Image" />`);
  };

  return (
    <>
      {/* Banner for Caution */}
      {loading && (
        <div className="bg-yellow-300/30 gap-4 p-2 w-full sm:flex items-center justify-between shadow-md rounded-md">
          <h2 className="text-sm flex items-center gap-2">
            <span className="bg-black py-1 rounded-md px-2">
              <TriangleAlert size={15} className="invert" />
            </span>
            Please do not refresh the page!!
          </h2>
          <h3 className="text-sm">
            Est time remaining:{" "}
            <span className="text-white bg-black rounded-md px-2">
              {formatTime(remainingTime)}
            </span>
          </h3>
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-[80vh] flex items-center justify-center">
        {loading && !logo ? (
          <div className="flex flex-col gap-2 items-center">
            <Image
              src={"/loading.gif"}
              width={150}
              height={150}
              alt="loading"
            />
            <p
              className={`text-muted-foreground text-sm transition-opacity duration-500 ${
                fadeOut ? "opacity-0" : "opacity-100"
              }`}
            >
              {texts[currentTextIndex]}
            </p>
          </div>
        ) : logo ? (
          <div className="flex flex-col gap-2 w-[400px]">
            <Image
              src={logo}
              width={400}
              height={400}
              alt="logo"
              className="object-cover rounded-md w-full"
            />
            <Button className="w-full" onClick={() => onDownload(logo)}>
              Download Logo
            </Button>
            <Link href="/dashboard">
              <Button className="w-full" variant="outline">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default page;
