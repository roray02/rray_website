'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import projectsData from '@/data/projects.json';
import { Project } from '@/types';

const ProjectsContainer = styled.section`
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 80px);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: var(--gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--primary-text);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: var(--secondary-text);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const FilterTabs = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterTab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.active ? 'var(--accent)' : 'var(--border)'};
  background: ${props => props.active ? 'var(--accent)' : 'transparent'};
  color: ${props => props.active ? 'var(--primary-text)' : 'var(--secondary-text)'};

  &:hover {
    border-color: var(--accent);
    color: var(--primary-text);
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 350px));
  gap: 2rem;
  margin-bottom: 3rem;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeaturedSection = styled.div`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: var(--primary-text);
  margin-bottom: 2rem;
  text-align: center;
`;

const CategorySection = styled.div`
  margin-bottom: 3rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-text);
  margin-bottom: 1.5rem;
  text-align: left;
  position: relative;
  padding-left: 1rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 100%;
    background: ${props => {
      if (props.className?.includes('computational-biology')) return 'linear-gradient(90deg, #8b5cf6, #7c3aed)';
      if (props.className?.includes('bioinformatics')) return 'linear-gradient(90deg, #10b981, #059669)';
      if (props.className?.includes('computer-science')) return 'linear-gradient(90deg, #3b82f6, #2563eb)';
      if (props.className?.includes('public-health')) return 'linear-gradient(90deg, #ef4444, #dc2626)';
      if (props.className?.includes('for-fun')) return 'linear-gradient(90deg, #f59e0b, #d97706)';
      return 'linear-gradient(90deg, #6b7280, #4b5563)';
    }};
    border-radius: 2px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--secondary-text);
`;

type FilterType = 'all' | 'bioinformatics' | 'computational-biology' | 'computer-science' | 'for-fun' | 'public-health' | 'featured';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const projects = projectsData as Project[];

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return project.featured;
    return project.category === activeFilter;
  });

  const featuredProjects = projects.filter(project => project.featured);
  const bioinformaticsProjects = projects.filter(project => project.category === 'bioinformatics');
  const computationalBiologyProjects = projects.filter(project => project.category === 'computational-biology');
  const computerScienceProjects = projects.filter(project => project.category === 'computer-science');
  const forFunProjects = projects.filter(project => project.category === 'for-fun');
  const publicHealthProjects = projects.filter(project => project.category === 'public-health');

  const filters = [
    { key: 'all' as FilterType, label: 'All Projects' },
    { key: 'featured' as FilterType, label: 'Featured' },
    { key: 'bioinformatics' as FilterType, label: 'Bioinformatics' },
    { key: 'computational-biology' as FilterType, label: 'Computational Biology' },
    { key: 'computer-science' as FilterType, label: 'Computer Science' },
    { key: 'public-health' as FilterType, label: 'Public Health' },
    { key: 'for-fun' as FilterType, label: 'For Fun' },
  ];

  return (
    <ProjectsContainer>
      <Header>
        <Title
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A showcase of my work in bioinformatics, computational biology, and software engineering
        </Subtitle>
        
        <FilterTabs
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filters.map((filter) => (
            <FilterTab
              key={filter.key}
              active={activeFilter === filter.key}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </FilterTab>
          ))}
        </FilterTabs>
      </Header>

      {activeFilter === 'all' ? (
        <>
          {featuredProjects.length > 0 && (
            <FeaturedSection>
              <SectionTitle>Featured Projects</SectionTitle>
              <ProjectsGrid
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </ProjectsGrid>
            </FeaturedSection>
          )}

          {bioinformaticsProjects.length > 0 && (
            <CategorySection>
              <CategoryTitle className="bioinformatics">Bioinformatics Projects</CategoryTitle>
              <ProjectsGrid
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {bioinformaticsProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </ProjectsGrid>
            </CategorySection>
          )}

          <CategorySection>
            <CategoryTitle className="computational-biology">Computational Biology Projects</CategoryTitle>
            <ProjectsGrid
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {computationalBiologyProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </ProjectsGrid>
          </CategorySection>

          <CategorySection>
            <CategoryTitle className="computer-science">Computer Science Projects</CategoryTitle>
            <ProjectsGrid
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {computerScienceProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </ProjectsGrid>
          </CategorySection>

          {publicHealthProjects.length > 0 && (
            <CategorySection>
              <CategoryTitle className="public-health">Public Health Projects</CategoryTitle>
              <ProjectsGrid
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {publicHealthProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </ProjectsGrid>
            </CategorySection>
          )}

          {forFunProjects.length > 0 && (
            <CategorySection>
              <CategoryTitle className="for-fun">For Fun Projects</CategoryTitle>
              <ProjectsGrid
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {forFunProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </ProjectsGrid>
            </CategorySection>
          )}
        </>
      ) : (
        <ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <EmptyState>
              <p>No projects found for the selected filter.</p>
            </EmptyState>
          )}
        </ProjectsGrid>
      )}
    </ProjectsContainer>
  );
}