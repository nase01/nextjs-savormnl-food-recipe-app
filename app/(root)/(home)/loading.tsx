import RecipeCardLoader from '@/components/loaders/RecipeCardLoader';

const loading = () => {
  return (
    <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col">
      <section className="nav-padding w-full">
        <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl bg-gray-300 animate-pulse">
          <h1 className="sm:heading1 heading2 mb-6 text-center text-white animate-pulse"></h1>
        </div>
        <div className="animate-pulse flex-center rounded-xl mx-auto -mt-7 sm:-mt-7 px-5 sm:px-5">
            <div className="base-regular border-0 rounded-xlbg-gray-300 py-3 pl-5 pr-8 text-white !ring-0 !ring-offset-0 h-[50px] w-[450px] "></div>
        </div>
				<div className="flex items-center justify-center">
					<ul className="body-text no-scrollbar flex w-full max-full gap-9 overflow-auto py-12 sm:max-w-2xl">
						{[...Array(6)].map((_, index) => (
							<div
								key={index}
								className="animate-pulse flex-shrink-0 w-20 h-8 bg-gray-300 rounded-lg"
							></div>
						))}
					</ul>
				</div>
      </section>
			<section className="flex-left w-full flex-col my-6 sm:my-6">
				<div className="animate-pulse w-20 h-12 bg-gray-300 rounded-lg"></div>
				<div className="mt-12 flex w-full flex-wrap justify-center 
          gap-16 sm:justify-start">
					{[...Array(3)].map((_, index) => (
						<RecipeCardLoader />
					))}
				</div>
			</section>
    </main>
  )
}

export default loading