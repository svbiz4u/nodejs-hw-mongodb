import Joi from 'joi';

import { contactTypeList, phoneNumberRegExp } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
   
  }),
  phoneNumber: Joi.string().pattern(phoneNumberRegExp).required().messages({
    'string.pattern.base':
      'Phone number must be in the format: +380XXXXXXXXX, without spaces',
  }),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().pattern(phoneNumberRegExp).messages({
    'string.pattern.base':
      'Phone number must be in the format: +380XXXXXXXXX, without spaces',
  }),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList),
});