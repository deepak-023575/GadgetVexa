import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5' }) => {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.Layers;
  return <IconComponent className={className} />;
};

export const AVAILABLE_CATEGORY_ICONS = [
  'Laptop',
  'Smartphone',
  'Headphones',
  'Camera',
  'Tv',
  'Gamepad2',
  'Microwave',
  'Watch',
  'Tablet',
  'Speaker',
  'Monitor',
  'Cpu',
  'HardDrive',
  'Radio',
  'Printer',
  'Wifi',
  'BatteryCharging',
  'Plug',
  'ShieldCheck',
  'Zap',
];

export const formatPrice = (amount: number, symbol: string = '₹'): string => {
  if (isNaN(amount) || amount === undefined || amount === null) return `${symbol}0`;
  return `${symbol}${Number(amount).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
};

export const STORE_BADGES: Record<string, { name: string; bg: string; text: string; logoColor: string }> = {
  amazon: {
    name: 'Amazon India',
    bg: 'bg-amber-500/10 dark:bg-amber-400/10',
    text: 'text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700/50',
    logoColor: '#FF9900',
  },
  flipkart: {
    name: 'Flipkart',
    bg: 'bg-blue-600/10 dark:bg-blue-400/10',
    text: 'text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700/50',
    logoColor: '#2874F0',
  },
  croma: {
    name: 'Croma',
    bg: 'bg-teal-600/10 dark:bg-teal-400/10',
    text: 'text-teal-700 dark:text-teal-400 border-teal-300 dark:border-teal-700/50',
    logoColor: '#00B5B8',
  },
  reliance: {
    name: 'Reliance Digital',
    bg: 'bg-red-600/10 dark:bg-red-400/10',
    text: 'text-red-700 dark:text-red-400 border-red-300 dark:border-red-700/50',
    logoColor: '#E42529',
  },
  bestbuy: {
    name: 'Best Buy',
    bg: 'bg-blue-600/10 dark:bg-blue-400/10',
    text: 'text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700/50',
    logoColor: '#0046BE',
  },
  walmart: {
    name: 'Walmart',
    bg: 'bg-sky-500/10 dark:bg-sky-400/10',
    text: 'text-sky-700 dark:text-sky-400 border-sky-300 dark:border-sky-700/50',
    logoColor: '#0071DC',
  },
  bhphoto: {
    name: 'B&H Photo',
    bg: 'bg-emerald-600/10 dark:bg-emerald-400/10',
    text: 'text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700/50',
    logoColor: '#00843D',
  },
  newegg: {
    name: 'Newegg',
    bg: 'bg-orange-600/10 dark:bg-orange-400/10',
    text: 'text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-700/50',
    logoColor: '#FA7C00',
  },
  target: {
    name: 'Target',
    bg: 'bg-red-600/10 dark:bg-red-400/10',
    text: 'text-red-700 dark:text-red-400 border-red-300 dark:border-red-700/50',
    logoColor: '#CC0000',
  },
  apple: {
    name: 'Apple India',
    bg: 'bg-zinc-600/10 dark:bg-zinc-400/10',
    text: 'text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700/50',
    logoColor: '#A2AAAD',
  },
};
