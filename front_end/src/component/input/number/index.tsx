import { memo, useMemo } from 'react';

import { ErrorMessage, Field, FieldProps } from 'formik';
import { isString } from 'ramda-adjunct';

interface InputNumberProps extends React.HTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  label?: string;
  name?: string;
}

const InputNumber = ({
  name,
  containerClassName,
  label,
  ...rest
}: InputNumberProps) => {
  const finalContainerClassnames = useMemo(() => {
    if (!containerClassName) return 'block';
    return `block relative ${containerClassName}`;
  }, [containerClassName]);

  return (
    <label className={finalContainerClassnames}>
      <input className='input-text' {...rest} type='number' />
    </label>
  );
};

export default memo(InputNumber);
