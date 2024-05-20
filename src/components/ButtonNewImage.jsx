"use client"
import {useRouter} from 'next/navigation'

export default function ButtonNewImage() {
    const router = useRouter()
    const handleSubmit = () => {
        router.push("/frontend/dashboard/newimage")
    }
  return (
    <div>
      <button onClick={handleSubmit} className='bg-green-600'>New Image</button>
    </div>
  )
}
