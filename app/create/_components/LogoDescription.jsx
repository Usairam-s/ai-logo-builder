import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import HeadingDescription from "./HeadingDescription";
import { Input } from "@/components/ui/input";

function LogoDescription({ value, onHandleInputChange }) {
  const handleDescriptionChange = (e) => {
    onHandleInputChange(e.target.value);
  };
  return (
    <>
      <div>
        <Card className="border-none shadow-none p-0">
          <CardHeader>
            {" "}
            <HeadingDescription
              main="Logo Description"
              sub="Enter your brand details and little desription"
            />
          </CardHeader>
          <CardContent>
            <Input onChange={handleDescriptionChange} value={value} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default LogoDescription;
