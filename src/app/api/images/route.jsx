import { NextResponse } from 'next/server'
import prisma from '@/libs/db'

export  async function GET() {
  const res = await prisma.post.findMany()
  return NextResponse.json(res)
}
export async function POST(request) {
    const data = await request.json()
    const res = await prisma.post.create({
        data:{
            title: data.title,
            content: data.content,
        }
    })
    //const images = await res.json() 
    console.log(res)
  return NextResponse.json(res)
}
