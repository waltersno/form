import { FC } from 'react';

import { IFormItem } from 'shared/types';

import classes from './FormItem.module.scss';

export const FormItem: FC<IFormItem> = ({ value, placeholder, type, validateInfo, onChange }) => {
  return (
    <div className={classes.formItem}>
      <input
        value={value}
        className={classes.input}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      {validateInfo && <span className={classes.errorText}>{validateInfo}</span>}
    </div>
  );
};
