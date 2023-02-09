import * as yup from 'yup';

export type TValidateValues = {
  phoneNumber: string;
  accessCode: string;
};

const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export const validationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .trim()
    .required('Required')
    .matches(phoneRegExp, 'Phone number is not valid'),
  accessCode: yup.string().trim().required('Required'),
});
