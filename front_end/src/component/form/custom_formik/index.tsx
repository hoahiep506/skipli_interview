import { Formik, FormikConfig, FormikHelpers, FormikValues } from 'formik';
import { useCallback } from 'react';
import { isNotNilOrEmpty } from 'ramda-adjunct';
import { insertObjectIf, trimValues } from 'helper';

interface ExtraProps {
  beforeSubmitConfig?: { trim: boolean };
}

const CustomFormik = <Values extends FormikValues>(
  props: FormikConfig<Values> & ExtraProps
) => {
  const { onSubmit, beforeSubmitConfig } = props;
  const handleSubmit = useCallback(
    (values: Values, formikHelpers: FormikHelpers<Values>) => {
      if (beforeSubmitConfig?.trim)
        return onSubmit?.(trimValues(values), formikHelpers);

      return onSubmit?.(values, formikHelpers);
    },
    [onSubmit]
  );

  return (
    <Formik
      {...props}
      {...insertObjectIf(isNotNilOrEmpty(beforeSubmitConfig), {
        onSubmit: handleSubmit,
      })}
    >
      {props.children}
    </Formik>
  );
};

export default CustomFormik;
