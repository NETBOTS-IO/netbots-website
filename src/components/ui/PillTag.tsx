import React from 'react';
import styles from './PillTag.module.css';
import { clsx } from 'clsx';

interface PillTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function PillTag({ children, className, ...props }: PillTagProps) {
  return (
    <span className={clsx(styles.pill, className)} {...props}>
      {children}
    </span>
  );
}
