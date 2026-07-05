import React from 'react';
import { Severity, Priority } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
  id?: string;
}

export function Badge({ children, variant = 'default', className = '', id }: BadgeProps) {
  const baseStyle = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium tracking-tight";
  
  const variants = {
    default: "bg-zinc-100 text-zinc-800 border border-zinc-200",
    outline: "bg-transparent text-zinc-600 border border-zinc-200",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    error: "bg-rose-50 text-rose-700 border border-rose-200",
    info: "bg-blue-50 text-blue-700 border border-blue-200"
  };

  return (
    <span id={id} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  const config = {
    critical: { variant: 'error' as const, label: 'Critical' },
    high: { variant: 'error' as const, label: 'High' },
    medium: { variant: 'warning' as const, label: 'Medium' },
    low: { variant: 'info' as const, label: 'Low' }
  };

  const { variant, label } = config[severity] || { variant: 'default' as const, label: severity };

  return (
    <Badge variant={variant} className="capitalize">
      {label}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const config = {
    high: { variant: 'error' as const, label: 'P1 - High' },
    medium: { variant: 'warning' as const, label: 'P2 - Med' },
    low: { variant: 'info' as const, label: 'P3 - Low' }
  };

  const { variant, label } = config[priority] || { variant: 'default' as const, label: priority };

  return (
    <Badge variant={variant} className="font-semibold">
      {label}
    </Badge>
  );
}
