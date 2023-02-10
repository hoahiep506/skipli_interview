import { memo, useMemo } from 'react';

type TInputNumberProps = {
  containerClassName?: string;
  label?: string;
  name?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputNumber = ({
  name,
  containerClassName,
  label,
  ...rest
}: TInputNumberProps) => {
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
