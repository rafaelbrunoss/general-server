import { IDataLoaderParam } from '@user_interface/api/graphql/dataloaders/interfaces/dataLoaderParam.interface';
import { RequestedFields } from '@user_interface/api/graphql/ast/requestedFields';

import { IUserInstance } from '@modules/user/infrastructure/database/entities/sequelize/user/user';
import { UserRepository } from '@modules/user/infrastructure/database/repository/user/user.repository';

export class UserLoader {
  public static async batchUsers(
    userRepository: UserRepository,
    params: IDataLoaderParam<number>[],
    requestedFields: RequestedFields,
  ): Promise<IUserInstance[] | any[]> {
    const ids: string[] = params.map((param) => param.key.toString());
    return Promise.resolve(
      await userRepository.findManyByIds(
        ids,
        requestedFields.getFields(params[0].info, { keep: ['id'] }),
      ),
    );
  }
}
