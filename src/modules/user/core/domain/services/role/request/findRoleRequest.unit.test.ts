import { chai } from '@tests/test-utils';
import { FindRoleRequest } from '@modules/user/core/domain/services/role/request/findRoleRequest';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { BaseError } from '@core/domain/models/errors/baseError.model';

describe('Core/Domain/Services/User', () => {
  describe('FindRoleRequest', () => {
    it('Should create a FindRoleRequest', () => {
      const findRoleRequest = new FindRoleRequest({ id: 'id' });
      chai.expect(findRoleRequest).to.be.an('object');
      chai.expect(findRoleRequest.id).to.be.a('string');
      chai.expect(findRoleRequest).to.not.have.keys(['name']);
      chai.expect(findRoleRequest).to.have.keys(['id']);
    });

    it('Should not create a FindRoleRequest, because FindRoleRequest.id should not be empty', () => {
      try {
        const findRoleRequest = new FindRoleRequest({ id: '' });
        chai.expect(findRoleRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"id" is not allowed to be empty');
      }
    });
  });
});
