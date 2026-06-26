import * as React from 'react';

export interface PanelProps {
  title?: string;
  /** Mono overline above the title. */
  eyebrow?: string;
  /** Right-aligned header slot (buttons, menus). */
  action?: React.ReactNode;
  children?: React.ReactNode;
  /** Pad the body. @default true */
  padded?: boolean;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

/** Content panel / card with an optional titled header. */
export function Panel(props: PanelProps): JSX.Element;
