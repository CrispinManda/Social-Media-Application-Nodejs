import joi from 'joi';

export const userValidator = (user) => {
    const userValidatorSchema = joi.object({
      first_name: joi.string().min(3).required(),
      last_name: joi.string().min(3).required(),
      username: joi.string().min(3).required(),
      password: joi.string().min(4).required(),
      email: joi.string().email().required(),
    });
    return userValidatorSchema.validate(user);

}

export const userLoginValidator = (user) => {
    const userLoginValidatorSchema = joi.object({
        username: joi.string().required(),
        password: joi.string().min(4).required(),
    });
    return userLoginValidatorSchema.validate(user);
}