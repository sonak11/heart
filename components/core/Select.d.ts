import * as React from 'react';

export type SelectOption = string | { value: string; label: string };

export interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  style?: React.CSSProperties;
}

/** Styled native select for filters and forms. */
export function Select(props: SelectProps): JSX.Element;
