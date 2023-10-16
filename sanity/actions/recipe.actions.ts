import { groq } from 'next-sanity'
import { readClient, writeClient } from '../lib/client'
import { buildQuery } from '../utils'

export const updateRecipeViews = async (id: any) => {
	try {
		const currentRecipe = await readClient.fetch(groq`*[_type == "recipe" && _id == $id][0]`, { id })
		if (currentRecipe) {
			
			const updatedViews = (currentRecipe.views || 0) + 1;

			await writeClient
        .patch(id)
        .set({ views: updatedViews })
        .commit();
			
			return updatedViews;

		} else {
			console.error('Recipe not found');
      return null;
		}
		
	} catch (error) {
    console.log(error);
  }
}

export const fetchRecipe = async (id: any) => {
  try {
		const recipe = await readClient.fetch(
      groq`*[_type == "recipe" && _id == $id]{
        _id,
        title,
        description,
        "image": poster.asset->url,
        views,
        slug,
        preparation,
        difficulty,
        category,
				ingredients,
				steps,
				serving
      }[0]`,
      { id } // Pass the 'id' variable as a parameter
    );	
		
    return recipe
    
  } catch (error) {
    console.log(error)
  }
}

interface GetRecipesParams {
	query: string;
	category: string;
	page: string;
}

export const fetchRecipes = async (params: 
	GetRecipesParams) => {
  const { query, category, page} = params

	try {
		const recipes = await readClient.fetch(
			groq`${buildQuery({
				type: 'recipe',
				query,
				category,
				page: parseInt(page)
			})}{
				_id,
				title,
				description,
				"image": poster.asset->url,
				views,
				slug,
				preparation,
				difficulty,
				category,
				serving
			}`
		)

		return recipes
	} catch (error) {
		console.log(error)
	}
}

export const fetchRecipesPlaylist = async () => {
  try {
    const resources = await readClient.fetch(
      groq`*[_type == "recipePlaylist"]{
        _id,
        title,
        recipes[0...3]->{
          _id,
					title,
					description,
					"image": poster.asset->url,
					views,
					slug,
					preparation,
					difficulty,
					category,
					serving
        }
      }`
    )

    return resources
  } catch (error) {
    console.log(error)
  }
}