import * as yup from 'yup';

export type TValidateValues = {
  phoneCode: string;
  phoneNumber: string;
  accessCode: string;
};
const phoneRegExp = /^[0-9]{9,12}$/im;

export const validationSchema = yup.object().shape({
  phoneCode: yup.string().trim().required('Required'),
  phoneNumber: yup
    .string()
    .trim()
    .required('Required')
    .matches(phoneRegExp, 'Phone number is not valid'),
  accessCode: yup.string().trim().required('Required'),
});
