import Joi from 'joi'

export const jobSchema = Joi.object().keys({
  title: Joi.string()
    .alphanum()
    .required(),
  teaser: Joi.string().required(),
  company: Joi.string().required(),
  logo: Joi.string(),
  description: Joi.string()
    .max(10000)
    .min(60)
    .required(),
  salary: Joi.string()
    .alphanum()
    .replace(/chf/gi, ''),
  equity: Joi.string().replace(/%/g, ''),
  contractDuration: Joi.string(),
  contractPercentage: Joi.string(),
  location: Joi.string().required(),
  contract: Joi.string()
    .valid('full-time', 'part-time', 'contractor', 'internship')
    .required(),
  coords: Joi.array().items(Joi.number(), Joi.number())
})
