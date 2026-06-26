import * as React from 'react';

export interface BadgeProps {
  children?: React.ReactNode;
  /** @default "neutral" */
  tone?: 'neutral' | 'brand' | 'positive' | 'caution' | 'critical' | 'info';
  /** Show a leading status dot. */
  dot?: boolean;
  style?: React.CSSProperties;
}

/** Pill-shaped status or category label. */
export function Badge(props: BadgeProps): JSX.Element;
