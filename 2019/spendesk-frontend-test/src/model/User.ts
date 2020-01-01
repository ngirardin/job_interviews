import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().notRequired(), // optinnal
  lastName: yup.string().notRequired(), // optional
  gender: yup
    .mixed<"m" | "f">()
    .oneOf(["m", "f"], `The gender must be either "f" or "m".`)
    .notRequired(),
  email: yup
    .string()
    .notRequired()
    .email(`This doesn't look like a valid email address.`),
  phone: yup
    .string()
    .matches(/^(\+?)[0-9]{0,14}$/, `This doesn't look like a valid phone number.`)
    .notRequired()
});

export type IUser = yup.InferType<typeof schema>;

export default {
  schema,
  validate: (user: IUser): string[] => {
    try {
      schema.validateSync(user, { abortEarly: false });
      return [];
    } catch (exception) {
      return (exception as yup.ValidationError).errors;
    }
  }
};
