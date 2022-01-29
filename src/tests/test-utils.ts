import * as chai from 'chai';
import * as Joi from 'joi';

const chaiHttp = require('chai-http');

const expect = chai.expect;

const handleError = (error: any) => {
  const message: string = error.response
    ? error.response.res.text
    : error.message || error;
  return Promise.reject(`${error.name}: ${message}`);
};

chai.use(chaiHttp);

export { chai, expect, Joi, handleError };
