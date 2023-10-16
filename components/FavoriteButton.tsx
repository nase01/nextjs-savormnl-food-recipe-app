'use client'

import { useSession, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'
import { ToastAction } from "@/components/ui/toast"
import { fetchUser, createRecipeFavorite, deleteRecipeFavorite } from '@/sanity/actions/user.actions'
import { useRouter } from 'next/navigation'

const FavoriteButton = ({ recipeId }: any) => {
	const router = useRouter()
	const { toast } = useToast()
	const [isLoading, setIsLoading] = useState(false)
	const [isFavorite, setIsFavorite] = useState(false)

	const { data: session, status } = useSession()
	
	useEffect(() => {
    if (session) {
			setIsLoading(true)
			
			fetchUser(session.user.id)
				.then((user) => {
					if (user.favorites && user.favorites.length > 0) {
						const isRecipeInFavorites = user.favorites.some((favorite: { _id: any }) => favorite._id === recipeId);

						setIsFavorite(isRecipeInFavorites)
					} else {
						setIsFavorite(false)
					}
				})
				.catch((error) => {
					console.error('Error fetching user data:', error)
				})
				.finally(() => {
					setIsLoading(false)
				})
    }
  }, [recipeId])

	const handleFavorite = async () => {
		setIsLoading(true)
	
		try {
			if(session) {
				if(!isFavorite) {
					await createRecipeFavorite(session.user.id, recipeId)
					toast({
						className: "toast-msg",
						description: "Recipe added to favorites.",
						action: <ToastAction altText="View" onClick={() => router.push('/favorites')}>View</ToastAction>,
					})
					setIsFavorite(true)
					
				} else {

					await deleteRecipeFavorite(session.user.id, recipeId)
					toast({
						className: "toast-msg",
						description: "Recipe removed to favorites.",
					})
					setIsFavorite(false)
				}
				
			} else {
				signIn()
			}
			
		} catch (error) {
			console.error("Error adding to favorites:", error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="mt-12 flex-center">
			<Button
				variant="outline"
				size="lg"
				className="px-4 gap-3 text-md align-middle w-1/2 py-2 border-b-4 rounded-none border-orange text-orange hover:text-white hover:bg-orange transition-all duration-200"
				disabled={isLoading}
				onClick={() => handleFavorite()}
			>
				{isLoading || status === "loading" ? (
					<span className="animate-bounce text-xl font-bold font-inter"> . . . </span>
				) : (
					`${isFavorite ? "Remove" : "Add"} to Favorite`
				)}
			</Button>
		</div>
	)
}

export default FavoriteButton