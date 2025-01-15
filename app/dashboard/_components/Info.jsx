"use client";
import { UserContext } from "@/app/_context/UserContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useContext } from "react";

const Info = () => {
  const { userDetail } = useContext(UserContext);
  return (
    <div
      className="w-full flex items-center
     justify-between border-b pb-4"
    >
      <h1>
        Hello <br />{" "}
        <span className="mt-2 text-primary text-2xl font-semibold">
          {userDetail.userName}
        </span>
      </h1>
      <Link href={"/create"}>
        <Button>
          <Plus /> Create
        </Button>
      </Link>
    </div>
  );
};

export default Info;
