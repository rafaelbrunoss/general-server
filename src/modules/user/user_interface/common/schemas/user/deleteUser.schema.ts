import * as Joi from 'joi';

export const deleteUserSchema = Joi.object({
  id: Joi.string().required(),
});
