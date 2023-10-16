const RecipeCardLoader = () => {
  return (
    <div className="w-full border-2 bg-transparent max-w-[394px] sm:max-w-[394px] transition-transform duration-300 ease-in-out">
      <div className="flex-center flex-col gap-2.5 p-0">
        <div className="w-full h-[250px] bg-gray-300 rounded-t-md animate-pulse"></div>
        <div className="p-5 w-full">
          <div className="paragraph-semibold line-clamp-1 w-full h-4 bg-gray-300 mb-3 animate-pulse"></div>
          <div className="line-clamp-3 my-3 h-4 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
      <div className="flex-between mt-4 p-5">
        <div className="flex-center align-middle body-medium gap-1">
          <div className="-mt-1 h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="h-4 w-12 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
        <div className="flex-center align-middle body-medium gap-1">
          <div className="-mt-1 h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="h-4 w-12 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
        <div className="text-white rounded-full bg-gray-300 h-10 w-24 hover:bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  )
};

export default RecipeCardLoader;