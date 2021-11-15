import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { document } from '..'

interface ITodo {
  id: string
  user_id: string
  title: string
  done?: boolean
  deadline: string
}

class Todo {
  private TableName: string

  constructor() {
    this.TableName = 'todos'
  }

  async create({ id, title, deadline, user_id }: ITodo): Promise<ITodo> {
    const newTodo = {
      id,
      title,
      deadline,
      user_id,
      done: false,
    }

    await document
      .put({
        TableName: this.TableName,
        Item: newTodo,
      })
      .promise()

    return newTodo
  }

  async findByUserId(user_id: string): Promise<DocumentClient.ItemList> {
    const result = await document
      .scan({
        TableName: this.TableName,
        FilterExpression: 'user_id = :user_id',
        ExpressionAttributeValues: {
          ':user_id': user_id,
        },
      })
      .promise()

    const todos = result.Items

    return todos
  }
}

export { Todo }
