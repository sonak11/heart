import * as React from 'react';

export interface InputProps {
  label?: string;
  helper?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  style?: React.CSSProperties;
}

/** Labeled text input with helper/error and scarlet focus ring. */
export function Input(props: InputProps): JSX.Element;
