import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda'
import type { FromSchema } from 'json-schema-to-ts'

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>
}
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>

export const formatJSONResponse = ({
  body,
  status,
}: {
  body: Record<string, unknown>
  status?: number
}) => {
  return {
    statusCode: status || 200,
    body: JSON.stringify(body),
  }
}
