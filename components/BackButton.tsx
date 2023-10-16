'use client'

import Image from 'next/image'
import { useRouter } from "next/navigation"

const backButton = () => {
  const router = useRouter()

  return (
    <div className="mb-8">
      <button
        onClick={() => router.back()}
        className="text-orange font-medium flex gap-1 align-middle"
      >
        <Image src="/back-svgrepo-com.svg" width={20} height={20} alt="back"/> Back
      </button>
    </div>
  )
}

export default backButton