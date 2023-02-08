import { memo, useMemo } from 'react';
import { ButtonProps } from './type';

const Button = (props: ButtonProps) => {
  const containerClassName = useMemo(() => {
    if (!props.containerClassName) {
      return 'btn';
    }
    return `btn ${props.containerClassName}`;
  }, [props.containerClassName]);

  return (
    <button
      className={containerClassName}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
};

export default memo(Button);
