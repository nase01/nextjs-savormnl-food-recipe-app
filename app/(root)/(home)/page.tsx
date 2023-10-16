import dynamic from 'next/dynamic'
import SearchForm from "@/components/SearchForm"
import Header from '@/components/Header';
import RecipeCardLoader from '@/components/loaders/RecipeCardLoader'
import { fetchRecipesPlaylist, fetchRecipes } from '@/sanity/actions/recipe.actions'
import Filters from '@/components/Filters'

const RecipeCard = dynamic(() => import('@/components/RecipeCard'), { ssr: false, loading: () => <RecipeCardLoader /> })

export const revalidate = 900

interface Props {
  searchParams: { [key: string]: string | undefined }
}

const Page = async ({ searchParams }: Props ) => {

  const recipes = await fetchRecipes({
    query: searchParams?.query || '',
    category: searchParams?.category || '',
    page: '1'
  })
  
  const recipesPlaylist = await fetchRecipesPlaylist()
  
  return (
    <main className="flex-center paddings mx-auto
    w-full max-w-screen-2xl flex-col">
      <section className="nav-padding w-full">
        <div className="flex-center relative min-h-[274px] w-full flex-col 
        rounded-xl bg-banner bg-cover bg-center text-center">
          <h1 className="sm:heading1 heading2 mb-6 
          text-center text-white">
            Filipino Food Recipes
          </h1>
        </div>
        <SearchForm/>
        <Filters />
      </section>

      {(searchParams?.query || searchParams?.category) && (
        <section className="flex-center w-full flex-col my-6 sm:my-6">
          <Header 
            query={searchParams?.query || ''}
            category={searchParams?.category || ''}
          />

          <div className="mt-12 flex w-full flex-wrap justify-center 
          gap-16 sm:justify-start">
            {recipes?.length > 0 ? (
              recipes.map((recipe: any) => (
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
              <p className="body-regular text-white-400">
                No Recipe Found
              </p>
            )}
          </div>
        </section>
      )}
      
      {recipesPlaylist.map((item: any) => (
        <section className="flex-center w-full flex-col my-6 sm:my-6">
          <h1 className="heading3 self-start">{item.title}</h1>
          <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
            {item.recipes.map((recipe: any) => (
              <RecipeCard 
                title={recipe.title}
                description={recipe.description}
                id={recipe._id}
                image={recipe.image}
                views={recipe.views}
                preparation={recipe.preparation}
                difficulty={recipe.difficulty}
                serving={recipe.serving}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

export default Page