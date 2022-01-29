import { GraphQLResolveInfo } from 'graphql';
import { injectable } from 'inversify';
import { difference, union } from 'lodash';

const graphqlFields = require('graphql-fields');

@injectable()
export class RequestedFields {
  public getFields(
    info: GraphQLResolveInfo,
    options?: { keep?: string[]; exclude?: string[] },
  ): string[] {
    let fields: string[] = Object.keys(graphqlFields(info));
    if (!options) {
      return fields;
    }
    fields = options.keep ? union<string>(fields, options.keep) : fields;
    return options.exclude ? difference<string>(fields, options.exclude) : fields;
  }
}
