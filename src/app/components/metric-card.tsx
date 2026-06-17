import React from 'react';
import { T } from './ui-kit';

interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
  trend?: string;
  icon?: React.ReactNode;
}

export function MetricCard({ label, value, sub, color = '#16A34A', trend, icon }: MetricCardProps) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 14,
      border: `1px solid ${T.gray200}`,
      padding: '18px 20px',
      flex: 1,
      minWidth: 0,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: T.gray400, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
        {icon && (
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </div>
        )}
      </div>
      <div style={{ fontSize: 26, fontWeight: 900, color: T.gray900, letterSpacing: '-0.03em', marginBottom: 4 }}>{value}</div>
      <div style={{ display: 'flex', gap: 6 }}>
        {trend && <span style={{ fontSize: 11, fontWeight: 700, color: '#16A34A' }}>{trend}</span>}
        {sub && <span style={{ fontSize: 11, color: T.gray400 }}>{sub}</span>}
      </div>
    </div>
  );
}
