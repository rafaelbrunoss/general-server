import { chai } from '@tests/test-utils';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { BaseError } from '@core/domain/models/errors/baseError.model';
import { AuthUser } from '@core/domain/models/auth/authUser.model';

describe('Core/Domain/Models/AuthUser', () => {
  describe('AuthUser', () => {
    it('Should create an AuthUser', () => {
      const user = new AuthUser({
        id: 'id',
        name: 'name',
        email: 'email@email.com',
        password: 'password',
      });
      chai.expect(user).to.be.an('object');
      chai.expect(user.id).to.be.an('string');
      chai.expect(user.name).to.be.an('string');
      chai.expect(user.email).to.be.an('string');
      chai.expect(user.password).to.be.an('string');
      chai.expect(user).to.have.keys(['id', 'name', 'email', 'password']);
    });

    it('Should not create an AuthUser, because AuthUser.id should not be empty', () => {
      try {
        const user = new AuthUser({
          id: '',
          name: 'name',
          email: 'email@email.com',
          password: 'password',
        });
        chai.expect(user).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"id" is not allowed to be empty');
      }
    });

    it('Should not create an AuthUser, because AuthUser.name should not be empty', () => {
      try {
        const user = new AuthUser({
          id: 'id',
          name: '',
          email: 'email@email.com',
          password: 'password',
        });
        chai.expect(user).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"name" is not allowed to be empty');
      }
    });

    it('Should not create an AuthUser, because AuthUser.name should not be over 50 characteres', () => {
      try {
        const user = new AuthUser({
          id: 'id',
          name: 'namesnamesnamesnamesnamesnamesnamesnamesnamesnames0',
          email: 'email@email.com',
          password: 'password',
        });
        chai.expect(user).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai
          .expect(error.message)
          .to.eql('"name" length must be less than or equal to 50 characters long');
      }
    });

    it('Should not create an AuthUser, because AuthUser.email should be a valid email', () => {
      try {
        const user = new AuthUser({
          id: 'id',
          name: 'name',
          email: 'email',
          password: 'password',
        });
        chai.expect(user).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"email" must be a valid email');
      }
    });

    it('Should not create an AuthUser, because AuthUser.password should not be empty', () => {
      try {
        const user = new AuthUser({
          id: 'id',
          name: 'name',
          email: 'email@email.com',
          password: '',
        });
        chai.expect(user).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"password" is not allowed to be empty');
      }
    });

    it('Should not create an AuthUser, because AuthUser.password should not be over 50 characteres', () => {
      try {
        const user = new AuthUser({
          id: 'id',
          name: 'name',
          email: 'email@email.com',
          password: 'passwordpasswordpasswordpasswordpasswordpasswordpass',
        });
        chai.expect(user).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai
          .expect(error.message)
          .to.eql(
            '"password" length must be less than or equal to 50 characters long',
          );
      }
    });
  });
});
