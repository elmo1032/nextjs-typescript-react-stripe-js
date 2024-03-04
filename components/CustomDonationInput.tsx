import React from 'react';
import { formatAmountForDisplay } from '../utils/stripe-helpers'; // Importing the utility function to format the amount for display

type Props = {
  name: string;
  value: number;
  min: number;
  max: number;
  currency: string;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // Optional className property
};

const CustomDonationInput = ({
  name,
  value,
  min,
  max,
  currency,
  step,
  onChange,
  className,
}: Props) => (
  <label>
    Custom donation amount (
    {formatAmountForDisplay(min, currency)}- // Display the minimum donation amount in the preferred currency format
    {formatAmountForDisplay(max, currency)}):
    <input
      className={className}
      type="number" // Using number type input for precise value input
      name={name}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    />
    <input
      type="range" // Using range type input for visual representation of the value between min and max
      name={name}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    />
  </label>
);

export default CustomDonationInput;
