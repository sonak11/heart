import * as React from 'react';

export interface KpiCardProps {
  /** Mono eyebrow label, e.g. "Themes coded". */
  label: string;
  /** The headline value (string or number). */
  value: string | number;
  /** Trailing unit, e.g. "%". */
  unit?: string;
  trend?: 'up' | 'down' | 'flat' | null;
  /** Trend delta text, e.g. "+12 vs Q1". */
  trendValue?: string;
  caption?: string;
  /** Number color. @default scarlet */
  accent?: string;
  style?: React.CSSProperties;
}

/**
 * Headline KPI card with a big editorial-serif number.
 * @startingPoint section="Data" subtitle="KPI metric cards with trend" viewport="700x200"
 */
export function KpiCard(props: KpiCardProps): JSX.Element;
