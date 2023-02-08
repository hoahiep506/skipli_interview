import { memo, useMemo } from 'react';
import { InputTextProps } from './type';

const InputText = (props: InputTextProps) => {
  const containerClassName = useMemo(() => {
    if (!props?.containerClassName) return 'block';
    return `block ${props?.containerClassName}`;
  }, [props?.containerClassName]);

  return (
    <label className={containerClassName}>
      <span className='input-text-label'>{props.label}</span>
      <input className='input-text' placeholder={props.placeholder} />
    </label>
  );
};

export default memo(InputText);
