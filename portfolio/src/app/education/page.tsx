import React from 'react';
import Timeline from '@/components/Timeline';
import educationData from '@/data/education.json';
import { Education } from '@/types';

export default function EducationPage() {
  const education = educationData as Education[];

  return (
    <Timeline 
      education={education}
      title="Education"
    />
  );
}