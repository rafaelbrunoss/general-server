import { chai } from '@tests/test-utils';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { DeleteUserRequest } from '@modules/user/core/domain/services/user/request/deleteUserRequest';
import { BaseError } from '@core/domain/models/errors/baseError.model';

describe('Core/Domain/Services/User', () => {
  describe('DeleteUserRequest', () => {
    it('Should create an DeleteUserRequest', () => {
      const deleteUserRequest = new DeleteUserRequest({ id: 'id' });
      chai.expect(deleteUserRequest).to.be.an('object');
      chai.expect(deleteUserRequest.id).to.be.an('string');
      chai.expect(deleteUserRequest).to.not.have.keys(['name']);
      chai.expect(deleteUserRequest).to.have.keys(['id']);
    });

    it('Should not create an DeleteUserRequest, because DeleteUserRequest.id should not be empty', () => {
      try {
        const deleteUserRequest = new DeleteUserRequest({ id: '' });
        chai.expect(deleteUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"id" is not allowed to be empty');
      }
    });
  });
});
