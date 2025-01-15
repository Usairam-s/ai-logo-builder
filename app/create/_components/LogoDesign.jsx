import React from "react";
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

function LogoDesign({ onDesignSelect, value }) {
  function handleDesignClick(designTitle, designPrompt) {
    if (onDesignSelect) {
      onDesignSelect(designTitle, designPrompt); // Call the parent's function
    }
  }

  return (
    <>
      <div>
        <Card className="border-none shadow-none p-0">
          <CardHeader>
            {" "}
            <HeadingDescription
              main="Select Design"
              sub="Select favorite design according to your brand"
            />
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {/* Map through each logo palette */}
            {Designs.map((design, idx) => {
              return (
                <div
                  className={`${
                    value == design.title
                      ? "border-2 border-primary rounded-md shadow-lg p-2"
                      : ""
                  }`}
                  onClick={() => handleDesignClick(design.title, design.prompt)}
                  key={idx}
                >
                  <Image
                    src={design.image}
                    alt="image"
                    width={250}
                    height={250}
                    className="object-cover"
                  />
                  <p className="text-center mt-2 text-sm ">{design.title}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default LogoDesign;
