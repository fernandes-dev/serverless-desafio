export default {
  type: 'object',
  properties: {
    title: { type: 'string' },
    deadline: { type: 'date' },
  },
  required: ['title', 'deadline'],
} as const
