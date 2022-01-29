import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
} from 'inversify-express-utils';

@controller('/graphql')
export class GraphQLController extends BaseHttpController {
  @httpGet('/')
  public async get(): Promise<void> {}

  @httpPost('/')
  public async post(): Promise<void> {}
}
