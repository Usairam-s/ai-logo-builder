"use client";
import { UserContext } from "@/app/_context/UserContext";
import { db } from "@/configs/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";

const LogoList = () => {
  const { userDetail } = useContext(UserContext);
  const [list, setList] = useState(null);

  // Fetch user logos
  useEffect(() => {
    userDetail && getUserLogos();
  }, [userDetail]);

  const getUserLogos = async () => {
    try {
      const response = await getDocs(
        collection(db, "users", userDetail.userEmail, "logos")
      );
      const logoData = response.docs.map((doc) => doc.data());
      setList(logoData);
      console.log(logoData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onDownload = (image) => {
    const imageWindow = window.open();
    imageWindow.document.write(`<img src="${image}" alt="base64 Image" />`);
  };

  return (
    <>
      <h2 className="my-6 text-xl font-medium">Recent Logos</h2>
      {list === null ? (
        // Show skeleton loaders
        <div className="grid mt-6 sm:grid-cols-2 grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="animate-pulse flex flex-col items-center gap-2"
            >
              <div className="bg-gray-300 w-[250px] h-[250px] rounded-lg"></div>
              <div className="bg-gray-300 h-4 w-3/4 rounded-md"></div>
              <div className="bg-gray-300 h-3 w-1/2 rounded-md"></div>
            </div>
          ))}
        </div>
      ) : list.length > 0 ? (
        // Show fetched logos
        <div className="grid mt-6 sm:grid-cols-2 grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {list.map((logo, index) => (
            <div
              key={index}
              className="flex cursor-pointer flex-col items-center justify-center gap-2"
              onClick={() => {
                onDownload(logo.image);
              }}
            >
              <Image
                src={logo.image}
                alt="logo"
                width={250}
                height={250}
                className="object-cover"
              />
              <h3 className="text-base font-medium">{logo.title}</h3>
              <p className="text-muted-foreground text-sm">{logo.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        // No logos found
        <p className="text-sm text-gray-500">Your created logos display here</p>
      )}
    </>
  );
};

export default LogoList;
