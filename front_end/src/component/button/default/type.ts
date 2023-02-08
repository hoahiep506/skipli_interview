export interface ButtonProps {
  label?: string;
  onClick?: () => void;
  containerClassName?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
