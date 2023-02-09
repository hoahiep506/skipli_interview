import { number } from 'yup';

export interface ButtonProps {
  label?: string | number;
  onClick?: () => void;
  containerClassName?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
