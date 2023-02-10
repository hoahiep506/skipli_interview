import { memo, useMemo } from 'react';

export type TButtonProps = {
  label?: string | number;
  onClick?: () => void;
  containerClassName?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const Button = (props: TButtonProps) => {
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
