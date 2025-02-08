"use client"

import App from "../src/App"
import React from 'react';
import { RadioGroup } from '@/components/ui/radio-group';
import { RadioGroupItem } from '@/components/ui/radio-group';

const mockData = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export default function SyntheticV0PageForDeployment() {
  return (
    <div>
      <h1>Select an Option</h1>
      <RadioGroup>
        {mockData.map((item) => (
          <RadioGroupItem key={item.value} value={item.value}>
            {item.label}
          </RadioGroupItem>
        ))}
      </RadioGroup>
      <App />
    </div>
  );
}