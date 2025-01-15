import { db } from "@/configs/FirebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userName, userEmail } = await req.json();

  try {
    // Check if user exists
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userEmail", "==", userEmail));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // User already exists
      const existingUser = querySnapshot.docs[0].data();
      return NextResponse.json(
        { message: "User already exists", user: existingUser },
        { status: 200 }
      );
    }

    // User doesn't exist, create new user
    const newUser = {
      userName,
      userEmail,
    };

    const docRef = await addDoc(usersRef, newUser);

    return NextResponse.json(
      {
        message: "User created successfully",
        user: { id: docRef.id, ...newUser },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
