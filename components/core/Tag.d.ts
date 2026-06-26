import * as React from 'react';

export interface TagProps {
  children?: React.ReactNode;
  /** Render a removable × control. */
  removable?: boolean;
  onRemove?: () => void;
  style?: React.CSSProperties;
}

/** Monospace code chip for codes, IDs, and filter tokens. */
export function Tag(props: TagProps): JSX.Element;
