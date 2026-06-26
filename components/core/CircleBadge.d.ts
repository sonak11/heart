import * as React from 'react';

export interface CircleBadgeProps {
  /** Engagement circle. 1=Community Voice, 2=Internal Stakeholders, 3=Leadership. @default 1 */
  circle?: 1 | 2 | 3;
  /** Show full label vs just "Circle N". @default true */
  showLabel?: boolean;
  /** @default "md" */
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

/** Engagement-circle identity pill — Community / Internal / Leadership. */
export function CircleBadge(props: CircleBadgeProps): JSX.Element;
