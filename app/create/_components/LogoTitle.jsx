"use client";
import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

function LogoTitle({ value, onHandleInputChange }) {
  const searchParams = useSearchParams();

  const title = searchParams.get("title");

  useEffect(() => {
    if (title) {
      onHandleInputChange(title);
    }
  }, []);

  const router = useRouter();

  return (
    <>
      <div>
        <Card className="border-none shadow-none p-0">
          <CardHeader>
            {" "}
            <HeadingDescription
              main="Logo Title"
              sub="Enter you logo title here"
            />
          </CardHeader>
          <CardContent>
            <Input
              // defaultValue={title ? title : ""}

              value={value} // Use the value passed from the parent component
              onChange={(e) => onHandleInputChange(e.target.value)} // Upda
            />
          </CardContent>
          {/* <CardFooter className="w-full flex items-center justify-between">
            <Button onClick={() => router.back()} variant="outline">
              {" "}
              <ArrowLeft /> Back
            </Button>
            <Button>
              Continue <ArrowRight />
            </Button>
          </CardFooter> */}
        </Card>
      </div>
    </>
  );
}

export default LogoTitle;
