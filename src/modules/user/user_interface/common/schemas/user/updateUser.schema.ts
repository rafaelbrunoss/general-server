import * as Joi from 'joi';

export const updateUserSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  roleName: Joi.string().required(),
});
