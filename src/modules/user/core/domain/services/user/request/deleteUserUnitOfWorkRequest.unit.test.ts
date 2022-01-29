import { chai } from '@tests/test-utils';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { DeleteUserUnitOfWorkRequest } from '@modules/user/core/domain/services/user/request/deleteUserUnitOfWorkRequest';
import { BaseError } from '@core/domain/models/errors/baseError.model';

describe('Core/Domain/Services/User', () => {
  describe('DeleteUserUnitOfWorkRequest', () => {
    it('Should create an DeleteUserUnitOfWorkRequest', () => {
      const deleteUserUnitOfWorkRequest = new DeleteUserUnitOfWorkRequest({
        id: 'id',
      });
      chai.expect(deleteUserUnitOfWorkRequest).to.be.an('object');
      chai.expect(deleteUserUnitOfWorkRequest.id).to.be.an('string');
      chai.expect(deleteUserUnitOfWorkRequest).to.not.have.keys(['name']);
      chai.expect(deleteUserUnitOfWorkRequest).to.have.keys(['id']);
    });

    it('Should not create an DeleteUserUnitOfWorkRequest, because DeleteUserUnitOfWorkRequest.id should not be empty', () => {
      try {
        const deleteUserUnitOfWorkRequest = new DeleteUserUnitOfWorkRequest({
          id: '',
        });
        chai.expect(deleteUserUnitOfWorkRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"id" is not allowed to be empty');
      }
    });
  });
});
