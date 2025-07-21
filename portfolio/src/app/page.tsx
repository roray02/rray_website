import React from 'react';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import experiencesData from '@/data/experiences.json';
import educationData from '@/data/education.json';
import { Experience, Education } from '@/types';

export default function HomePage() {
  const experiences = experiencesData as Experience[];
  const education = educationData as Education[];

  return (
    <>
      <Hero />
      <Timeline 
        education={education}
        title="Education"
      />
      <Timeline 
        experiences={experiences}
        title="Experience"
      />
    </>
  );
}