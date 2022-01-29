import { chai } from '@tests/test-utils';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { FindUserByEmailRequest } from '@modules/user/core/domain/services/user/request/findUserByEmailRequest';
import { BaseError } from '@core/domain/models/errors/baseError.model';

describe('Core/Domain/Services/User', () => {
  describe('FindUserByEmailRequest', () => {
    it('Should create an FindUserByEmailRequest', () => {
      const findUserByEmailRequest = new FindUserByEmailRequest({
        email: 'email@email.com',
      });
      chai.expect(findUserByEmailRequest).to.be.an('object');
      chai.expect(findUserByEmailRequest.email).to.be.an('string');
      chai.expect(findUserByEmailRequest).to.not.have.keys(['id']);
      chai.expect(findUserByEmailRequest).to.have.keys(['email']);
    });

    it('Should not create an FindUserByEmailRequest, because FindUserByEmailRequest.email should be a valid email', () => {
      try {
        const findUserByEmailRequest = new FindUserByEmailRequest({
          email: 'email',
        });
        chai.expect(findUserByEmailRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"email" must be a valid email');
      }
    });
  });
});
