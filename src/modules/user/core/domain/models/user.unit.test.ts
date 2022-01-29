import { chai } from '@tests/test-utils';
import { User } from '@modules/user/core/domain/models/user.model';
import { Role } from '@modules/user/core/domain/models/role.model';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { BaseError } from '@core/domain/models/errors/baseError.model';

const role = new Role({
  id: 'id',
  name: 'name',
});

describe('Core/Domain/Models/User', () => {
  describe('User', () => {
    it('Should create an User', () => {
      const user = new User({
        id: 'id',
        name: 'name',
        email: 'email@email.com',
        password: 'password',
        role,
      });
      chai.expect(user).to.be.an('object');
      chai.expect(user.id).to.be.an('string');
      chai.expect(user.name).to.be.an('string');
      chai.expect(user.email).to.be.an('string');
      chai.expect(user.password).to.be.an('string');
      chai.expect(user.role).to.be.an('object');
      chai.expect(user).to.not.have.keys(['roleName']);
      chai.expect(user).to.have.keys(['id', 'name', 'email', 'password', 'role']);
    });

    it('Should not create an User, because User.id should not be empty', () => {
      try {
        const user = new User({
          id: '',
          name: 'name',
          email: 'email@email.com',
          password: 'password',
          role,
        });
        chai.expect(user).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"id" is not allowed to be empty');
      }
    });

    it('Should not create an User, because User.name should not be empty', () => {
      try {
        const user = new User({
          id: 'id',
          name: '',
          email: 'email@email.com',
          password: 'password',
          role,
        });
        chai.expect(user).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"name" is not allowed to be empty');
      }
    });

    it('Should not create an User, because User.name should not be over 50 characteres', () => {
      try {
        const user = new User({
          id: 'id',
          name: 'namesnamesnamesnamesnamesnamesnamesnamesnamesnames0',
          email: 'email@email.com',
          password: 'password',
          role,
        });
        chai.expect(user).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai
          .expect(error.message)
          .to.eql('"name" length must be less than or equal to 50 characters long');
      }
    });

    it('Should not create an User, because User.email should be a valid email', () => {
      try {
        const user = new User({
          id: 'id',
          name: 'name',
          email: 'email',
          password: 'password',
          role,
        });
        chai.expect(user).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"email" must be a valid email');
      }
    });

    it('Should not create an User, because User.password should not be empty', () => {
      try {
        const user = new User({
          id: 'id',
          name: 'name',
          email: 'email@email.com',
          password: '',
          role,
        });
        chai.expect(user).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai.expect(error.message).to.eql('"password" is not allowed to be empty');
      }
    });

    it('Should not create an User, because User.password should not be over 50 characteres', () => {
      try {
        const user = new User({
          id: 'id',
          name: 'name',
          email: 'email@email.com',
          password: 'passwordpasswordpasswordpasswordpasswordpasswordpass',
          role,
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
