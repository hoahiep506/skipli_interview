import { ChangeEventHandler } from 'react';

export interface InputTextProps extends React.HTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  label?: string;
  name?: string;
}
