import { chai } from '@tests/test-utils';
import { CoreErrors } from '@core/domain/models/errors/coreErrors.enum';
import { FindUserRequest } from '@modules/user/core/domain/services/user/request/findUserRequest';
import { BaseError } from '@core/domain/models/errors/baseError.model';

describe('Core/Domain/Services/User', () => {
  describe('FindUserRequest', () => {
    it('Should create an FindUserRequest with findOptions', () => {
      const findUserRequest = new FindUserRequest({
        condition: {},
        findOptions: {},
      });
      chai.expect(findUserRequest).to.be.an('object');
      chai.expect(findUserRequest.condition).to.be.an('object');
      chai.expect(findUserRequest.findOptions).to.be.an('object');
      chai.expect(findUserRequest).to.not.have.keys(['id']);
      chai.expect(findUserRequest).to.have.keys(['condition', 'findOptions']);
    });

    it('Should create an FindUserRequest without findOptions', () => {
      const findUserRequest = new FindUserRequest({
        condition: {},
      });
      chai.expect(findUserRequest).to.be.an('object');
      chai.expect(findUserRequest.condition).to.be.an('object');
      chai.expect(findUserRequest.findOptions).to.be.an('undefined');
      chai.expect(findUserRequest).to.not.have.keys(['id']);
      chai.expect(findUserRequest).to.have.keys(['condition', 'findOptions']);
    });

    it('Should create an FindUserRequest using strings', () => {
      const findUserRequest = new FindUserRequest({
        condition: 'condition',
        findOptions: 'findOptions',
      });
      chai.expect(findUserRequest).to.be.an('object');
      chai.expect(findUserRequest.condition).to.be.a('string');
      chai.expect(findUserRequest.findOptions).to.be.a('string');
      chai.expect(findUserRequest).to.not.have.keys(['id']);
      chai.expect(findUserRequest).to.have.keys(['condition', 'findOptions']);
    });

    it('Should create an FindUserRequest using numbers', () => {
      const findUserRequest = new FindUserRequest({
        condition: 1,
        findOptions: 2,
      });
      chai.expect(findUserRequest).to.be.an('object');
      chai.expect(findUserRequest.condition).to.be.a('number');
      chai.expect(findUserRequest.findOptions).to.be.a('number');
      chai.expect(findUserRequest).to.not.have.keys(['id']);
      chai.expect(findUserRequest).to.have.keys(['condition', 'findOptions']);
    });

    it('Should create an FindUserRequest using arrays', () => {
      const findUserRequest = new FindUserRequest({
        condition: ['a', 1],
        findOptions: ['b', 2],
      });
      chai.expect(findUserRequest).to.be.an('object');
      chai.expect(findUserRequest.condition).to.be.an('array');
      chai.expect(findUserRequest.findOptions).to.be.an('array');
      chai.expect(findUserRequest).to.not.have.keys(['id']);
      chai.expect(findUserRequest).to.have.keys(['condition', 'findOptions']);
    });

    it('Should not create an FindUserRequest, because FindUserRequest.condition should not be null', () => {
      try {
        const findUserRequest = new FindUserRequest({
          condition: null,
          findOptions: {},
        });
        chai.expect(findUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai
          .expect(error.message)
          .to.eql('"condition" must be one of [object, string, number, array]');
      }
    });

    it('Should not create an FindUserRequest, because FindUserRequest.findOptions should not be null', () => {
      try {
        const findUserRequest = new FindUserRequest({
          condition: {},
          findOptions: null,
        });
        chai.expect(findUserRequest).to.not.be.an('object');
      } catch (error: BaseError | any) {
        chai.expect(error.code).to.eql(CoreErrors.VALIDATION_ERROR);
        chai
          .expect(error.message)
          .to.eql('"findOptions" must be one of [object, string, number, array]');
      }
    });
  });
});
