import * as Joi from 'joi';

export const findSchema = Joi.object({
  condition: Joi.alternatives(
    Joi.object(),
    Joi.string(),
    Joi.number(),
    Joi.array(),
  ).required(),
  findOptions: Joi.alternatives(
    Joi.object(),
    Joi.string(),
    Joi.number(),
    Joi.array(),
  ),
});
