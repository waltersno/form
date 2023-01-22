import { FC, PropsWithChildren } from 'react';

import classes from './AppWrapper.module.scss';

export const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <main className={classes.main}>{children}</main>;
};
