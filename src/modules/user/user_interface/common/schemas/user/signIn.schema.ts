import * as Joi from 'joi';

export const signInSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  roleName: Joi.string().required(),
});
