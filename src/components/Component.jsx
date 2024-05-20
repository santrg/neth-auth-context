"use client"
import { useSession ,signOut} from "next-auth/react"


export default function Component() {
  const { data: session, status } = useSession()  
  if (status === "authenticated") {
    return (
      <div>
        <p>Signed in as {session.user.email}</p>
        <button onClick={()=>signOut()} className="bg-red-700 p-3 ">Sign Out</button>
      </div>
    )
  }else{
    return <a href="/api/auth/signin">Sign in</a>
  }

  
}