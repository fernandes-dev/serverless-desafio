import { handlerPath } from '@libs/handlerResolver'

import schema from './schema'

export default {
  handler: `${handlerPath(__dirname)}/create.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'todos/{userid}',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
}
