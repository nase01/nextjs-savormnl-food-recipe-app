'use client'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { formUrlQuery } from '@/sanity/utils'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const SearchForm = () => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()
	

	const [search, setSearch] = useState("")

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			let newUrl = ""

			if(search) {
				newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: 'query',
					value: search
				})
			} else {
				newUrl = formUrlQuery({
					params: searchParams.toString(),
					keysToRemove: ['query']
				})
			}

			router.push(newUrl, {
				scroll: false
			})

		}, 300 /* 300 Milli Seconds*/)

		return () => clearTimeout(delayDebounceFn)
	}, [search])

  return (
    <form className="flex-center mx-auto w-full -mt-7 sm:-mt-7 px-5 sm:px-5">
			<label className="flex-center relative w-full max-w-3xl">
				<Image
					src="/magnifying-glass.svg"
					className="absolute left-8"
					width={32}
					height={32}
					alt="Search Icon"
				/>
				<Input
					type="text"
					className="base-regular h-fit border-0 rounded-xl
					bg-green py-3 pl-20 pr-8 text-white
					!ring-0 !ring-offset-0 placeholder:text-white"
					placeholder="Search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</label>
		</form>
  )
}

export default SearchForm