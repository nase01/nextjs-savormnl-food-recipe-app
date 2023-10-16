const schema = {
    name: "recipePlaylist",
    title: "Recipe Playlist",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "recipes",
        title: "Recipes",
        type: "array",
        of: [
          {
            type: "reference",
            to: [{ type: "recipe" }],
          },
        ],
      },
    ],
  };
  
  export default schema;