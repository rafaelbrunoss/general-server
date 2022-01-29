import { chai } from '@tests/test-utils';
import { Authentication } from '@core/domain/models/auth/authentication.model';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { BaseError } from '@core/domain/models/errors/baseError.model';

describe('Core/Domain/Models/User', () => {
  describe('Authentication', () => {
    it('Should create an Authentication', () => {
      const authentication = new Authentication({ token: 'token' });
      chai.expect(authentication).to.be.an('object');
      chai.expect(authentication.token).to.be.a('string');
      chai.expect(authentication).to.not.have.keys(['id']);
      chai.expect(authentication).to.have.keys(['token']);
    });

    it('Should not create an Authentication, because Authentication.token should not be empty', () => {
      try {
        const authentication = new Authentication({ token: '' });
        chai.expect(authentication).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"token" is not allowed to be empty');
      }
    });

    it('Should not create an Authentication, because Authentication.token should not be over 50 characteres', () => {
      try {
        const authentication = new Authentication({
          token: 'tokentokentokentokentokentokentokentokentokentoken0',
        });
        chai.expect(authentication).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai
          .expect(error.message)
          .to.eql('"token" length must be less than or equal to 50 characters long');
      }
    });
  });
});
