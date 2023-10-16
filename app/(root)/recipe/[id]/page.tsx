import Image from 'next/image'
import Header from '@/components/Header'
import DifficultyPill from "@/components/DifficultyPill"
import ServingInfo from "@/components/ServingInfo"
import { fetchRecipe, updateRecipeViews } from '@/sanity/actions/recipe.actions'
import BackButton from '@/components/BackButton'
import FavoriteButton from '@/components/FavoriteButton'
import { redirect } from 'next/navigation'

export const revalidate = 900

async function Page({ params }: { params: { id: string } }) {
	
  const recipe = await fetchRecipe(params.id)
	
	if(!recipe) {
		redirect('/')
	}

	const updatedViews = await updateRecipeViews(params.id)

	return (
		<main className="paddings mx-auto w-full max-w-screen-2xl flex-col">
			<section className="w-full flex-col mt-20 sm:my-14">
				<BackButton />
				
				<Header 
					query=""
					category={`${recipe.title} Recipe`}
				/>
				<div className="flex my-6 gap-6">
					<DifficultyPill difficulty={recipe.difficulty} />
					<div className="flex align-middle body-medium gap-1">
						<Image 
							className="-mt-1"
							src="/timer-svgrepo-com.svg" width={20} height={20} alt="time"
						/> {recipe.preparation}Min
					</div>

					{recipe.serving && (
						<ServingInfo serving={recipe.serving} />
					)} 
				
					<div className="hidden sm:flex align-middle body-medium gap-1">
						<Image 
							className="-mt-1"
							src="/eye-svgrepo-com.svg" width={20} height={20} alt="time"
						/> {updatedViews}
					</div>
				</div>
			</section>
			<section className="my-3 flex flex-col sm:flex-row gap-12 ">
				<div className="sm:w-1/2">
					<Image
						src={recipe.image}
						className="w-full max-h-[520px] rounded-md shadow-2xl object-cover"
						width={450}
						height={520}
						alt={recipe.title}
					/>
					<FavoriteButton recipeId={recipe._id} />
				</div>
				<div className="sm:w-1/2 text-lg w-full">
					<p className="pb-3">{recipe.description}</p>
					
					{(recipe.ingredients) && (
						<div className="my-6">
							<b className="text-orange-100 text-xl">Ingredients:</b>
							<ul className="my-6">
								{recipe.ingredients.map((item: any) => (
									<li className="my-2 pl-3" key={item.ingredient}>- {item.quantity}{item.unit} {item.ingredient}</li>
								))}
							</ul>
						</div>
					)}

					{(recipe.steps) && (
						<div className="my-6">
							<b className="text-orange-100 text-xl">Instructions:</b>
							<div className="my-6">
								{recipe.steps.map((item: any) => (
									<div className="flex-row" key={item.step}>
										<b className="text-black-300">Step {item.step}</b>
										<p className="my-2 pl-3">{item.details}</p>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
				
			</section>
		</main>
	);
}

export default Page