import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { formatJSONResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { Todo } from 'src/database/models/todos'
import { v4 as uuidV4 } from 'uuid'

import schema from './schema'

const todoRepository = new Todo()

const createTodo: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const { title, deadline } = event.body
    const { userid } = event.pathParameters

    const todo = await todoRepository.create({
      id: uuidV4(),
      title,
      user_id: userid,
      deadline: new Date(deadline).toISOString(),
    })

    return formatJSONResponse({
      body: { todo },
    })
  } catch (error) {
    return formatJSONResponse({
      body: { error: error.message },
    })
  }
}

export const main = middyfy(createTodo)
