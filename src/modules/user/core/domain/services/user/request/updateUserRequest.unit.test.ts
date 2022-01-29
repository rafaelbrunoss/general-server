import { chai } from '@tests/test-utils';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { UpdateUserRequest } from '@modules/user/core/domain/services/user/request/updateUserRequest';
import { BaseError } from '@core/domain/models/errors/baseError.model';

describe('Core/Domain/Services/User', () => {
  describe('UpdateUserRequest', () => {
    it('Should create an UpdateUserRequest', () => {
      const updateUserRequest = new UpdateUserRequest({
        id: 'id',
        name: 'name',
        email: 'email@email.com',
        password: 'password',
        roleName: 'roleName',
      });
      chai.expect(updateUserRequest).to.be.an('object');
      chai.expect(updateUserRequest.id).to.be.an('string');
      chai.expect(updateUserRequest.name).to.be.an('string');
      chai.expect(updateUserRequest.email).to.be.an('string');
      chai.expect(updateUserRequest.password).to.be.an('string');
      chai.expect(updateUserRequest.roleName).to.be.an('string');
      chai.expect(updateUserRequest).to.not.have.keys(['role']);
      chai
        .expect(updateUserRequest)
        .to.have.keys(['id', 'name', 'email', 'password', 'roleName']);
    });

    it('Should not create an UpdateUserRequest, because UpdateUserRequest.id should not be empty', () => {
      try {
        const updateUserRequest = new UpdateUserRequest({
          id: '',
          name: 'name',
          email: 'email@email.com',
          password: 'password',
          roleName: 'roleName',
        });
        chai.expect(updateUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"id" is not allowed to be empty');
      }
    });

    it('Should not create an UpdateUserRequest, because UpdateUserRequest.name should not be empty', () => {
      try {
        const updateUserRequest = new UpdateUserRequest({
          id: 'id',
          name: '',
          email: 'email@email.com',
          password: 'password',
          roleName: 'roleName',
        });
        chai.expect(updateUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"name" is not allowed to be empty');
      }
    });

    it('Should not create an UpdateUserRequest, because UpdateUserRequest.name should not be over 50 characteres', () => {
      try {
        const updateUserRequest = new UpdateUserRequest({
          id: 'id',
          name: 'namesnamesnamesnamesnamesnamesnamesnamesnamesnames0',
          email: 'email@email.com',
          password: 'password',
          roleName: 'roleName',
        });
        chai.expect(updateUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai
          .expect(error.message)
          .to.eql('"name" length must be less than or equal to 50 characters long');
      }
    });

    it('Should not create an UpdateUserRequest, because UpdateUserRequest.email should be a valid email', () => {
      try {
        const updateUserRequest = new UpdateUserRequest({
          id: 'id',
          name: 'name',
          email: 'email',
          password: 'password',
          roleName: 'roleName',
        });
        chai.expect(updateUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"email" must be a valid email');
      }
    });

    it('Should not create an UpdateUserRequest, because UpdateUserRequest.password should not be empty', () => {
      try {
        const updateUserRequest = new UpdateUserRequest({
          id: 'id',
          name: 'name',
          email: 'email@email.com',
          password: '',
          roleName: 'roleName',
        });
        chai.expect(updateUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"password" is not allowed to be empty');
      }
    });

    it('Should not create an UpdateUserRequest, because UpdateUserRequest.password should not be over 50 characteres', () => {
      try {
        const updateUserRequest = new UpdateUserRequest({
          id: 'id',
          name: 'name',
          email: 'email@email.com',
          password: 'passwordpasswordpasswordpasswordpasswordpasswordpass',
          roleName: 'roleName',
        });
        chai.expect(updateUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai
          .expect(error.message)
          .to.eql(
            '"password" length must be less than or equal to 50 characters long',
          );
      }
    });

    it('Should not create an UpdateUserRequest, because UpdateUserRequest.roleName should not be empty', () => {
      try {
        const updateUserRequest = new UpdateUserRequest({
          id: 'id',
          name: 'name',
          email: 'email@email.com',
          password: 'password',
          roleName: '',
        });
        chai.expect(updateUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"roleName" is not allowed to be empty');
      }
    });

    it('Should not create an UpdateUserRequest, because UpdateUserRequest.roleName should not be over 50 characteres', () => {
      try {
        const updateUserRequest = new UpdateUserRequest({
          id: 'id',
          name: 'name',
          email: 'email@email.com',
          password: 'password',
          roleName: 'roleNameroleNameroleNameroleNameroleNameroleName01234',
        });
        chai.expect(updateUserRequest).to.not.be.an('object');
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
