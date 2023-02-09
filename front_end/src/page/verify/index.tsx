import { Button, CustomFormik, InputText } from 'component';
import { TValidateValues, validationSchema } from './helper';
import { FormikHelpers, FormikProps } from 'formik';
import { useCallback, useRef } from 'react';
import { apiCreateAccessCode, apiVerifyAccessCode } from 'api';
import { useNavigate } from 'react-router';
import { isNull } from 'ramda-adjunct';
import { ROUTER } from 'constant';

const VerifyPage = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<TValidateValues>>(null);

  const handleSubmit = useCallback(
    async (
      values: TValidateValues,
      actions: FormikHelpers<TValidateValues>
    ) => {
      const params = {
        phoneNumber: values.phoneNumber,
        accessCode: values.accessCode,
      };

      const successCallback = () => {
        navigate(ROUTER.MAIN);
        localStorage.setItem('phoneNumber', values.phoneNumber);
      };

      await apiVerifyAccessCode(params)
        .then((res) => {
          if (res.status === 200) successCallback?.();
        })
        .finally(() => {
          actions.setSubmitting(false);
        });

      return;
    },
    []
  );

  const sendAccessCode = useCallback(async () => {
    if (isNull(formikRef.current)) return;
    await formikRef.current?.validateField('phoneNumber');
    formikRef.current?.setFieldTouched('phoneNumber');
    if (formikRef.current?.errors?.phoneNumber) return;
    await apiCreateAccessCode({
      phoneNumber: formikRef.current?.values.phoneNumber,
    });
  }, []);

  return (
    <CustomFormik
      initialValues={{ phoneNumber: '', accessCode: '' }}
      beforeSubmitConfig={{ trim: true }}
      validationSchema={validationSchema}
      innerRef={formikRef}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <form
          className='h-full w-full center'
          onSubmit={formikProps.handleSubmit}
        >
          <div className='bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl w-80'>
            <InputText
              label='Phone number'
              name='phoneNumber'
              containerClassName='mb-3'
            />
            <InputText
              label='Access code'
              name='accessCode'
              containerClassName='mb-8'
            />
            <div className='flex gap-3'>
              <Button
                label='Send code'
                type='button'
                containerClassName='w-full'
                disabled={formikProps.isSubmitting}
                onClick={sendAccessCode}
              />
              <Button
                label='Verify'
                type='submit'
                containerClassName='w-full bg-green-600 hover:bg-green-700'
                disabled={formikProps.isSubmitting}
              />
            </div>
          </div>
        </form>
      )}
    </CustomFormik>
  );
};

export default VerifyPage;
