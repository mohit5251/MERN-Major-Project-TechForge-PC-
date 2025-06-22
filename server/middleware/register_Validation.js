//getting schema from the router passing schema as argument

export const registerValidation = (schema) => async(req,res,next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (error) {
        const status = 400;
        const message = "fill the input properly";
        const extraDetails = error.errors[0].message;

        const err = {
            status,
            message,
            extraDetails,
        }
        next(err);
    }
};