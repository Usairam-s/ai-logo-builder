"use client";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { UserContext } from "./_context/UserContext";

function Provider({ children }) {
  const [userDetail, setUserDetail] = useState({});
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    //get user from db
    const getUserAuth = async () => {
      const response = await axios.post("/api/user", {
        userName: user?.firstName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });

      setUserDetail(response.data.user);

      console.log(response.data);
    };
    getUserAuth();
  }, [user]);

  return (
    <>
      <UserContext.Provider value={{ userDetail, setUserDetail }}>
        <Header />
        <div className="p-4 md:px-10 lg:px-16">{children}</div>
      </UserContext.Provider>
    </>
  );
}

export default Provider;
