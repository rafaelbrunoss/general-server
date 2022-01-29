import * as Joi from 'joi';

export const usersSchema = Joi.object({
  limit: Joi.number().integer().greater(0),
  offset: Joi.number().integer().greater(0),
});
