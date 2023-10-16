const schema = {
	name: "user",
	title: "User",
	type: "document",
	fields: [
		{
			name: "id", // from auth provider
			title: "Id",
			type: "string",
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: "email",
			title: "Email",
			type: "string",
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: "name",
			title: "Name",
			type: "string",
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: "image",
			title: "Image",
			type: "string"
		},
		{
			name: "favorites",
			title: "Favorites",
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