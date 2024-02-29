const yup = require('yup');

class Validation {
    static ProfileValidation = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        socialAccount: yup.array().of(
            yup.object().shape({
                social: yup.string(),
                url: yup.string(),
            })
        ),
        portfolio: yup.string(),
        tagline: yup.array().of(yup.string()),
    });
}

module.exports = Validation;
