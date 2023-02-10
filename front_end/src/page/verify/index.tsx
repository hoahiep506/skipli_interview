import { Button, CustomFormik, InputText } from 'component';
import { TValidateValues, validationSchema } from './helper';
import { Field, FormikHelpers, FormikProps } from 'formik';
import { useCallback, useRef } from 'react';
import { apiCreateAccessCode, apiVerifyAccessCode } from 'api';
import { useNavigate } from 'react-router';
import { isNull } from 'ramda-adjunct';
import { ROUTER, phoneCodes } from 'constant';

const VerifyPage = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<TValidateValues>>(null);

  const handleSubmit = useCallback(
    async (
      values: TValidateValues,
      actions: FormikHelpers<TValidateValues>
    ) => {
      const params = {
        phoneNumber: values.phoneCode + values.phoneNumber,
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
    const phoneNumber = formikRef.current?.values.phoneNumber;
    const phoneCode = formikRef.current?.values.phoneCode;
    if (formikRef.current?.errors?.phoneNumber) return;
    await apiCreateAccessCode({
      phoneNumber: phoneCode + phoneNumber,
    });
  }, []);

  return (
    <CustomFormik
      initialValues={{
        phoneCode: phoneCodes[0]?.phoneCode,
        phoneNumber: '',
        accessCode: '',
      }}
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
            <label>
              <span className='input-text-label'>Phone country code</span>
              <Field
                as='select'
                name='phoneCode'
                className='input-text w-full h-[38px] mb-4'
              >
                {phoneCodes.map((item) => {
                  return (
                    <option
                      value={item.phoneCode}
                      key={item.code}
                    >{`${item.phoneCode} ${item.code}`}</option>
                  );
                })}
              </Field>
            </label>
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
