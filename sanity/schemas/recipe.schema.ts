const schema = {
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      require,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      require,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'views',
      title: 'Views',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'serving',
      title: 'Serving',
      type: 'object',
      fields: [
        {
          name: 'min',
          title: 'Min',
          type: 'number',
          validation: (Rule: any) => Rule.required().min(1).max(10).error('Minimum serving must be between 1 and 10'),
        },
        {
          name: 'max',
          title: 'Max',
          type: 'number',
          validation: (Rule: any) => Rule.required().min(1).max(10).error('Maximum serving must be between 1 and 10'),
        },
      ],
      initialValue: {
        min: 1,
        max: 2,
      },
    },
    {
      name: 'preparation',
      title: 'Preparation',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'poster',
      title: 'Poster',
      type: 'image',
      validation: (Rule: any) => Rule.required(),
      options: {
        hotspot: true,
      }
    },
    {
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      options: {
        list: ['easy', 'intermediate', 'advanced']
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      options: {
        list: ['break fast', 'lunch / dinner', 'desserts', 'pasta', 'other']
      }
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'ingredient',
              title: 'Ingredient',
              type: 'string',
            },
            {
              name: 'unit',
              title: 'Unit',
              type: 'string',
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
            }
          ],
        },
      ],
    },
    {
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'step',
              title: 'Step',
              type: 'number',
            },
            {
              name: 'details',
              title: 'Details',
              type: 'string',
            }
          ],
        },
      ],
    }
  ],
  permissions: [
    {
      role: 'editor',
      fields: {
        'views': 'update' // Ensure 'update' permission is granted for the 'views' field.
      }
    }
  ]
}

export default schema