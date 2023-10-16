import { groq } from 'next-sanity'
import { readClient, writeClient } from '../lib/client'
import { v4 as uuidv4 } from 'uuid'


export const createUser = async (userData: any) => {
	try {
  	const userExist = await readClient.fetch(groq`*[_type == "user" && email == $email][0]`, { email: userData.email });

		const newUser = {
			_type: 'user',
			...userData
		}
		
		if(!userExist) {
			await writeClient.create(newUser)
		}

    return true

	} catch (error) {
    console.error("Error creating user:", error)

    throw error
  }
}

export const fetchUser = async (id: string) => {
  try {

    const response = await readClient.fetch(groq`
      *[_type == "user" && _id == $id][0] {
        _id,
        name,
        email,
        image,
        "favorites": favorites[]->{
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
      }
    `, { id })

    return response

  } catch (error) {
    console.error("Error fetching user:", error)
    throw error
  }
}

export const createRecipeFavorite = async (userId: string, recipeId: string) => {
	try {
		
		const user = await readClient.fetch(groq`*[_type == "user" && _id == $userId][0]`, { userId })

    if (!user) {
      throw new Error('User not found')
    }

    if (!Array.isArray(user.favorites)) {
      user.favorites = [];
    }

    const isRecipeInFavorites = user.favorites.some(
      (favorite: { _type: string; _ref: string }) => favorite._type === 'reference' && favorite._ref === recipeId
    )

    const recipeReference = {
      _type: 'reference',
      _ref: recipeId,
      _key: uuidv4()
    }

    const updatedFavorites = isRecipeInFavorites
      ? user.favorites
      : [...user.favorites, recipeReference]

    if (!isRecipeInFavorites) {
      await writeClient
        .patch(user._id)
        .set({ favorites: updatedFavorites })
        .commit()
    }

	} catch (error) {
    console.error('Error adding recipe to favorites:', error)
    throw error
  }	
}

export const deleteRecipeFavorite = async (userId: string, recipeId: string) => {
  try {
    
    const user = await readClient.fetch(groq`*[_type == "user" && _id == $userId][0]`, { userId });

    if (!user) {
      throw new Error('User not found');
    }

    if (!Array.isArray(user.favorites)) {
      user.favorites = []
    }

    const updatedFavorites = user.favorites.filter(
      (favorite: { _type: string; _ref: string }) => !(favorite._type === 'reference' && favorite._ref === recipeId)
    )

    if (updatedFavorites.length !== user.favorites.length) {
      await writeClient
        .patch(user._id)
        .set({ favorites: updatedFavorites })
        .commit()
    }
  } catch (error) {
    console.error('Error removing recipe from favorites:', error)
    throw error
  }
}