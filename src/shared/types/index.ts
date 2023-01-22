import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

export interface IFormItem {
  value: string | number | readonly string[] | undefined;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  validateInfo: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
