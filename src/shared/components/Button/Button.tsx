import React, { FC } from 'react';
import classes from './Button.module.scss';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'danger';
}

export const Button: FC<IButton> = ({ color = 'primary', children, ...props }) => {
  return (
    <button
      className={`${classes.button} ${color === 'danger' ? classes.danger : classes.primary}`}
      {...props}
    >
      {children}
    </button>
  );
};
