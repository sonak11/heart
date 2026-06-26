import * as React from 'react';

export type TabItem = string | { value: string; label: string; count?: number };

export interface TabsProps {
  tabs: TabItem[];
  /** Active tab value. */
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

/** Underline tab navigation with optional count chips. */
export function Tabs(props: TabsProps): JSX.Element;
