import { chai } from '@tests/test-utils';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { AddUserRequest } from '@modules/user/core/domain/services/user/request/addUserRequest';
import { BaseError } from '@core/domain/models/errors/baseError.model';

describe('Core/Domain/Services/User', () => {
  describe('AddUserRequest', () => {
    it('Should create an AddUserRequest', () => {
      const addUserRequest = new AddUserRequest({
        name: 'name',
        email: 'email@email.com',
        password: 'password',
        roleName: 'roleName',
      });
      chai.expect(addUserRequest).to.be.an('object');
      chai.expect(addUserRequest.name).to.be.an('string');
      chai.expect(addUserRequest.email).to.be.an('string');
      chai.expect(addUserRequest.password).to.be.an('string');
      chai.expect(addUserRequest.roleName).to.be.an('string');
      chai.expect(addUserRequest).to.not.have.keys(['role']);
      chai
        .expect(addUserRequest)
        .to.have.keys(['name', 'email', 'password', 'roleName']);
    });

    it('Should not create an AddUserRequest, because AddUserRequest.name should not be empty', () => {
      try {
        const addUserRequest = new AddUserRequest({
          name: '',
          email: 'email@email.com',
          password: 'password',
          roleName: 'roleName',
        });
        chai.expect(addUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"name" is not allowed to be empty');
      }
    });

    it('Should not create an AddUserRequest, because AddUserRequest.name should not be over 50 characteres', () => {
      try {
        const addUserRequest = new AddUserRequest({
          name: 'namesnamesnamesnamesnamesnamesnamesnamesnamesnames0',
          email: 'email@email.com',
          password: 'password',
          roleName: 'roleName',
        });
        chai.expect(addUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai
          .expect(error.message)
          .to.eql('"name" length must be less than or equal to 50 characters long');
      }
    });

    it('Should not create an AddUserRequest, because AddUserRequest.email should be a valid email', () => {
      try {
        const addUserRequest = new AddUserRequest({
          name: 'name',
          email: 'email',
          password: 'password',
          roleName: 'roleName',
        });
        chai.expect(addUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"email" must be a valid email');
      }
    });

    it('Should not create an AddUserRequest, because AddUserRequest.password should not be empty', () => {
      try {
        const addUserRequest = new AddUserRequest({
          name: 'name',
          email: 'email@email.com',
          password: '',
          roleName: 'roleName',
        });
        chai.expect(addUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"password" is not allowed to be empty');
      }
    });

    it('Should not create an AddUserRequest, because AddUserRequest.password should not be over 50 characteres', () => {
      try {
        const addUserRequest = new AddUserRequest({
          name: 'name',
          email: 'email@email.com',
          password: 'passwordpasswordpasswordpasswordpasswordpasswordpass',
          roleName: 'roleName',
        });
        chai.expect(addUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai
          .expect(error.message)
          .to.eql(
            '"password" length must be less than or equal to 50 characters long',
          );
      }
    });

    it('Should not create an AddUserRequest, because AddUserRequest.roleName should not be empty', () => {
      try {
        const addUserRequest = new AddUserRequest({
          name: 'name',
          email: 'email@email.com',
          password: 'password',
          roleName: '',
        });
        chai.expect(addUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"roleName" is not allowed to be empty');
      }
    });

    it('Should not create an AddUserRequest, because AddUserRequest.roleName should not be over 50 characteres', () => {
      try {
        const addUserRequest = new AddUserRequest({
          name: 'name',
          email: 'email@email.com',
          password: 'password',
          roleName: 'roleNameroleNameroleNameroleNameroleNameroleName01234',
        });
        chai.expect(addUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai
          .expect(error.message)
          .to.eql(
            '"roleName" length must be less than or equal to 50 characters long',
          );
      }
    });
  });
});
