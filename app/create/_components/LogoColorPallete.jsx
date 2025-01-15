import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import HeadingDescription from "./HeadingDescription";
import { Input } from "@/components/ui/input";
import Colors from "@/app/_data/Colors";

function LogoColorPallete({ onHandleInputChange, value }) {
  const handlePallete = (v) => {
    onHandleInputChange(v);
  };
  return (
    <>
      <div>
        <Card className="border-none shadow-none p-0">
          <CardHeader>
            {" "}
            <HeadingDescription
              main="Select Theme"
              sub="Select favorite theme according to your brand"
            />
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {/* Map through each color palette */}
            {Colors.map((palette, idx) => (
              <div key={idx} className="mb-4 ">
                {/* <h3 className="text-lg font-semibold mb-2">{palette.name}</h3> */}
                <div
                  onClick={() => handlePallete(palette.name)}
                  className={`flex ${
                    value == palette.name
                      ? "border-2 border-primary rounded-md shadow-lg p-1"
                      : ""
                  }`}
                >
                  {/* Render individual colors */}
                  {palette.colors.map((color, colorIdx) => (
                    <div
                      key={colorIdx}
                      className="w-full h-24 "
                      style={{
                        backgroundColor: color,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default LogoColorPallete;
