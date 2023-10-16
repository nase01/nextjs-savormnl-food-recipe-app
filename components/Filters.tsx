"use client"
import { formUrlQuery } from "@/sanity/utils"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

const links = ['break fast', 'lunch / dinner', 'desserts', 'pasta', 'other']

const Filters = () => {
  const [active, setActive] = useState("")
  const searhParams = useSearchParams()
  const router = useRouter()

  const handleFilter = (link: string) => {
    let newUrl = ""
    
    if (active === link)  {
      setActive("")

      newUrl = formUrlQuery({
        params: searhParams.toString(),
        keysToRemove: ['category']
      })
    } else {
      setActive(link)

      newUrl = formUrlQuery({
        params: searhParams.toString(),
        key: 'category',
        value: link.toLowerCase()
      })
    }

    router.push(newUrl, {
      scroll: false
    })
    
  }

  return (
    <div className="flex items-center justify-center">
      <ul className="body-text no-scrollbar flex w-full max-full
      gap-2 overflow-auto py-12 sm:max-w-2xl">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => handleFilter(link)}
            className={`${active === link && 'text-orange font-bold border-orange' } 
            whitespace-nowrap border-b-4 px-8 py-2.5 capitalize`}
          >{link}</button>
        ))}
      </ul>
    </div>
  )
}

export default Filters