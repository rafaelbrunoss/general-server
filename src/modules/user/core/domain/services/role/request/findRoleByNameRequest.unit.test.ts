import { chai } from '@tests/test-utils';
import { FindRoleByNameRequest } from '@modules/user/core/domain/services/role/request/findRoleByNameRequest';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { BaseError } from '@core/domain/models/errors/baseError.model';

describe('Core/Domain/Services/User', () => {
  describe('FindRoleByName', () => {
    it('Should create a FindRoleByNameRequest', () => {
      const findRoleByNameRequest = new FindRoleByNameRequest({ name: 'name' });
      chai.expect(findRoleByNameRequest).to.be.an('object');
      chai.expect(findRoleByNameRequest.name).to.be.a('string');
      chai.expect(findRoleByNameRequest).to.not.have.keys(['id']);
      chai.expect(findRoleByNameRequest).to.have.keys(['name']);
    });

    it('Should not create a FindRoleByNameRequest, because FindRoleByNameRequest.name should not be empty', () => {
      try {
        const findRoleByNameRequest = new FindRoleByNameRequest({ name: '' });
        chai.expect(findRoleByNameRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"name" is not allowed to be empty');
      }
    });

    it('Should not create a FindRoleByNameRequest, because FindRoleByNameRequest.name should not be over 50 characteres', () => {
      try {
        const findRoleByNameRequest = new FindRoleByNameRequest({
          name: 'namesnamesnamesnamesnamesnamesnamesnamesnamesnames0',
        });
        chai.expect(findRoleByNameRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai
          .expect(error.message)
          .to.eql('"name" length must be less than or equal to 50 characters long');
      }
    });
  });
});
