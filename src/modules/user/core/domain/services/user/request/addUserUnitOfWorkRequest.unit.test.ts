import { chai } from '@tests/test-utils';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { AddUserUnitOfWorkRequest } from '@modules/user/core/domain/services/user/request/addUserUnitOfWorkRequest';
import { BaseError } from '@core/domain/models/errors/baseError.model';

describe('Core/Domain/Services/User', () => {
  describe('AddUserUnitOfWorkRequest', () => {
    it('Should create an AddUserUnitOfWorkRequest', () => {
      const addUserUnitOfWorkRequest = new AddUserUnitOfWorkRequest({
        name: 'name',
        email: 'email@email.com',
        password: 'password',
      });
      chai.expect(addUserUnitOfWorkRequest).to.be.an('object');
      chai.expect(addUserUnitOfWorkRequest.name).to.be.an('string');
      chai.expect(addUserUnitOfWorkRequest.email).to.be.an('string');
      chai.expect(addUserUnitOfWorkRequest.password).to.be.an('string');
      chai.expect(addUserUnitOfWorkRequest).to.not.have.keys(['role']);
      chai
        .expect(addUserUnitOfWorkRequest)
        .to.have.keys(['name', 'email', 'password']);
    });

    it('Should not create an AddUserUnitOfWorkRequest, because AddUserUnitOfWorkRequest.name should not be empty', () => {
      try {
        const addUserUnitOfWorkRequest = new AddUserUnitOfWorkRequest({
          name: '',
          email: 'email@email.com',
          password: 'password',
        });
        chai.expect(addUserUnitOfWorkRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"name" is not allowed to be empty');
      }
    });

    it('Should not create an AddUserUnitOfWorkRequest, because AddUserUnitOfWorkRequest.name should not be over 50 characteres', () => {
      try {
        const addUserUnitOfWorkRequest = new AddUserUnitOfWorkRequest({
          name: 'namesnamesnamesnamesnamesnamesnamesnamesnamesnames0',
          email: 'email@email.com',
          password: 'password',
        });
        chai.expect(addUserUnitOfWorkRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai
          .expect(error.message)
          .to.eql('"name" length must be less than or equal to 50 characters long');
      }
    });

    it('Should not create an AddUserUnitOfWorkRequest, because AddUserUnitOfWorkRequest.email should be a valid email', () => {
      try {
        const addUserUnitOfWorkRequest = new AddUserUnitOfWorkRequest({
          name: 'name',
          email: 'email',
          password: 'password',
        });
        chai.expect(addUserUnitOfWorkRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"email" must be a valid email');
      }
    });

    it('Should not create an AddUserUnitOfWorkRequest, because AddUserUnitOfWorkRequest.password should not be empty', () => {
      try {
        const addUserUnitOfWorkRequest = new AddUserUnitOfWorkRequest({
          name: 'name',
          email: 'email@email.com',
          password: '',
        });
        chai.expect(addUserUnitOfWorkRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"password" is not allowed to be empty');
      }
    });

    it('Should not create an AddUserUnitOfWorkRequest, because AddUserUnitOfWorkRequest.password should not be over 50 characteres', () => {
      try {
        const addUserUnitOfWorkRequest = new AddUserUnitOfWorkRequest({
          name: 'name',
          email: 'email@email.com',
          password: 'passwordpasswordpasswordpasswordpasswordpasswordpass',
        });
        chai.expect(addUserUnitOfWorkRequest).to.not.be.an('object');
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
