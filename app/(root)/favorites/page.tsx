'use client'

import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { fetchUser } from '@/sanity/actions/user.actions'
import RecipeCardLoader from '@/components/loaders/RecipeCardLoader'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'

const RecipeCard = dynamic(() => import('@/components/RecipeCard'), { ssr: false, loading: () => <RecipeCardLoader /> })

interface UserData {
  name: string
  email: string
	image: string
	favorites: []
}

const page = () => {
	const router = useRouter()
  const { data: session } = useSession()
	const [userData, setUserData] = useState<UserData | null>(null)

	useEffect(() => {
		if (session) {
			const fetchData = async () => {
				const response = await fetchUser(session.user.id)

				setUserData(response)
			}
			
			if (session.user.id) fetchData()
		} 
  }, [session])
	
  return (
    <main className="paddings mx-auto w-full max-w-screen-2xl flex-col">
			<section className="w-full flex-col mt-20 sm:my-14">
				<Header 
					query=""
					category="My Favorite"
				/>
				
				{ userData ? (
					<div className="mt-12 flex w-full flex-wrap justify-center 
					gap-16 sm:justify-start">
						{userData.favorites?.length > 0 ? (
							
							userData.favorites.map((recipe: any) => (
								<RecipeCard
									key={recipe._id}
									title={recipe.title}
									description={recipe.description}
									id={recipe._id}
									image={recipe.image}
									views={recipe.views}
									preparation={recipe.preparation}
									difficulty={recipe.difficulty}
									serving={recipe.serving}
								/>
							))
						): (
							<div className="body-regular text-white-400 min-h-[500px]">
								No Recipe Found, 
								<button 
									className="text-orange ml-3"
								 	onClick={() => router.push('/')} >
									Browse Recipe
								</button>
							</div>
						)}
					</div>
				) : (
					<div className="mt-12 flex w-full flex-wrap justify-center 
					gap-16 sm:justify-start body-regular text-white-400 min-h-[500px]">Loading...</div>
				)}
			</section>
		</main>
  )
}

export default page