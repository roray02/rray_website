import React from 'react';
import Timeline from '@/components/Timeline';
import experiencesData from '@/data/experiences.json';
import { Experience } from '@/types';

export default function WorkPage() {
  const experiences = experiencesData as Experience[];

  return (
    <Timeline 
      experiences={experiences}
      title="Work Experience"
    />
  );
}