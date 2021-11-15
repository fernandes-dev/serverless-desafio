import { formatJSONResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { APIGatewayProxyHandler } from 'aws-lambda'
import { Todo } from 'src/database/models/todos'

const todoRepository = new Todo()

const showTodo: APIGatewayProxyHandler = async (event) => {
  try {
    const { userid } = event.pathParameters

    const todos = await todoRepository.findByUserId(userid)

    return formatJSONResponse({
      body: { todos },
    })
  } catch (error) {
    return formatJSONResponse({
      body: { error: error.message },
    })
  }
}

export const main = middyfy(showTodo)
