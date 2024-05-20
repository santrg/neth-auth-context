import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";

export async function GET() {
  console.log("buscando en base de datos");
  const data = await prisma.Users.findMany();
  return NextResponse.json(data);
}

export async function POST(request) {
  const reqjson = await request.json();
  try {
    const userFound = await prisma.users.findUnique({
      where: {
        email: reqjson.email,
      },
    });
    if (userFound) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    } else {
      const hashedPassword = await bcrypt.hash(reqjson.password, 10);
      const newUser = await prisma.users.create({
        data: {
          email: reqjson.email,
          password: hashedPassword,
        },
      });
      return NextResponse.json(
        {
          message: "Nuevo usuario creado",
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error database",
      },
      { status: 400 }
    );
  }
}
