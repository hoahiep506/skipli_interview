import { memo, useMemo } from 'react';
import { ErrorMessage, Field, FieldProps } from 'formik';
import { isString } from 'ramda-adjunct';

type TInputTextProps = {
  containerClassName?: string;
  label?: string;
  name?: string;
} & React.HTMLAttributes<HTMLInputElement>;

const InputText = ({
  name,
  containerClassName,
  label,
  ...rest
}: TInputTextProps) => {
  const finalContainerClassnames = useMemo(() => {
    if (!containerClassName) return 'block';
    return `block relative ${containerClassName}`;
  }, [containerClassName]);

  if (isString(name))
    return (
      <Field name={name}>
        {({ field, meta }: FieldProps) => {
          return (
            <label className={finalContainerClassnames}>
              <span className='input-text-label'>{label}</span>
              <input className='input-text mb-6' {...field} {...rest} />
              {meta.touched && meta.error && (
                <p className='input-text-error'>
                  <ErrorMessage name={name!} />
                </p>
              )}
            </label>
          );
        }}
      </Field>
    );

  return (
    <label className={finalContainerClassnames}>
      <input className='input-text' {...rest} />
    </label>
  );
};

export default memo(InputText);
