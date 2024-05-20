import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  const userLogin = await request.json();
  console.log("CONEXION CON BACKEND");
  try {
    const userFound = await prisma.users.findUnique({
      where: {
        email: userLogin.email,
      },
    });
    const passwordOk = await bcrypt.compare(
      userLogin.password,
      userFound.password
    );
    if (passwordOk) {
      console.log("LOGIN CORRECTO");
      return NextResponse.json(userLogin);
    } else {
      console.log("FALLO DE LOGIN");
      return NextResponse.json(
        {
          message: "Login failure",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.log("ERROR DE LOGIN EN BACKEND");
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(userLogin);
}
