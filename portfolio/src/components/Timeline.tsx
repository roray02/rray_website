'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Experience, Education } from '@/types';

const TimelineContainer = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  background: var(--gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--primary-text);

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const TimelineWrapper = styled.div`
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border);
  }

  @media (max-width: 768px) {
    padding-left: 1.5rem;
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 1rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--accent);
    border: 3px solid var(--primary-bg);
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding-left: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const Card = styled(motion.div)<{ type?: string }>`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => {
      switch(props.type) {
        case 'work': return 'linear-gradient(90deg, #3b82f6, #2563eb)';
        case 'research': return 'linear-gradient(90deg, #10b981, #059669)';
        case 'leadership': return 'linear-gradient(90deg, #f59e0b, #d97706)';
        case 'clinical experience': return 'linear-gradient(90deg, #f59e0b, #d97706)';
        case 'education': return 'linear-gradient(90deg, #8b5cf6, #7c3aed)';
        default: return 'var(--accent)';
      }
    }};
  }

  &:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
    box-shadow: 0 10px 40px rgba(59, 130, 246, 0.1);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const CardHeader = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const LogoContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f8f9fa;
  border: 3px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  padding: 8px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    filter: brightness(0.9) contrast(1.1);
    transition: filter 0.3s ease;
  }

  &:hover img {
    filter: brightness(1) contrast(1.2);
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    padding: 6px;
  }
`;

const HeaderText = styled.div`
  flex: 1;
  min-width: 0;
`;

const Company = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-text);
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Position = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--accent);
  margin-bottom: 0.5rem;
`;

const LocationDate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--secondary-text);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Description = styled.div`
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    color: var(--secondary-text);
    margin-bottom: 0.75rem;
    position: relative;
    padding-left: 1.5rem;
    line-height: 1.6;

    &::before {
      content: '▸';
      position: absolute;
      left: 0;
      color: var(--accent);
      font-weight: bold;
    }

    a {
      color: var(--accent);
      text-decoration: underline;
      text-decoration-color: transparent;
      transition: all 0.3s ease;
      
      &:hover {
        color: var(--accent-hover);
        text-decoration-color: var(--accent-hover);
      }
    }
  }
`;

const TypeBadge = styled.span<{ type: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  
  background: ${props => {
    switch(props.type) {
      case 'work': return 'rgba(59, 130, 246, 0.1)';
      case 'research': return 'rgba(16, 185, 129, 0.1)';
      case 'leadership': return 'rgba(245, 158, 11, 0.1)';
      case 'clinical experience': return 'rgba(245, 158, 11, 0.1)';
      case 'education': return 'rgba(139, 92, 246, 0.1)';
      default: return 'rgba(59, 130, 246, 0.1)';
    }
  }};
  
  color: ${props => {
    switch(props.type) {
      case 'work': return '#3b82f6';
      case 'research': return '#10b981';
      case 'leadership': return '#f59e0b';
      case 'clinical experience': return '#f59e0b';
      case 'education': return '#8b5cf6';
      default: return '#3b82f6';
    }
  }};
`;

const CourseworkSection = styled.div`
  margin-top: 1rem;
  
  h5 {
    color: var(--primary-text);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--secondary-text);
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

interface TimelineProps {
  experiences?: Experience[];
  education?: Education[];
  title: string;
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -50,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

function TimelineItemComponent({ item, type }: { item: Experience | Education, type: 'experience' | 'education' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const isExperience = 'company' in item;
  const isEducation = 'institution' in item;

  return (
    <TimelineItem
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={controls}
    >
      <Card 
        variants={cardVariants}
        type={isExperience ? item.type : 'education'}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <TypeBadge type={isExperience ? item.type : 'education'}>
          {isExperience ? item.type : 'education'}
        </TypeBadge>
        
        <CardHeader>
          {isEducation && item.logo && (
            <LogoContainer>
              <img src={item.logo} alt={`${item.institution} logo`} />
            </LogoContainer>
          )}
          <HeaderText>
            <Company>
              {isExperience ? item.company : item.institution}
            </Company>
            <Position>
              {isExperience ? item.position : item.degree}
            </Position>
            <LocationDate>
              <span>{item.location}</span>
              <span>{item.startDate} - {item.endDate}</span>
            </LocationDate>
          </HeaderText>
        </CardHeader>

        <Description>
          {isExperience ? (
            <ul>
              {item.description.map((desc, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: desc }} />
              ))}
            </ul>
          ) : (
            <>
              {item.gpa && (
                <p style={{ color: 'var(--primary-text)', marginBottom: '1rem' }}>
                  <strong>GPA: {item.gpa}</strong>
                </p>
              )}
              
              {item.awards && item.awards.length > 0 && (
                <CourseworkSection>
                  <h5>Awards & Recognition</h5>
                  <p>{item.awards.join(' • ')}</p>
                </CourseworkSection>
              )}
              
              {item.activities && item.activities.length > 0 && (
                <CourseworkSection>
                  <h5>Activities & Involvement</h5>
                  <p>{item.activities.join(' • ')}</p>
                </CourseworkSection>
              )}
              
              {item.coursework && item.coursework.length > 0 && (
                <CourseworkSection>
                  <h5>Relevant Coursework</h5>
                  <p>{item.coursework.join(' • ')}</p>
                </CourseworkSection>
              )}
            </>
          )}
        </Description>
      </Card>
    </TimelineItem>
  );
}

export default function Timeline({ experiences = [], education = [], title }: TimelineProps) {
  const items = [...experiences, ...education].sort((a, b) => {
    const getYear = (date: string) => {
      if (date.includes('Expected')) return 2025;
      const year = parseInt(date.split(' ').pop() || '0');
      return year;
    };
    
    return getYear(b.endDate) - getYear(a.endDate);
  });

  return (
    <TimelineContainer>
      <SectionTitle
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {title}
      </SectionTitle>
      
      <TimelineWrapper>
        {items.map((item) => (
          <TimelineItemComponent
            key={item.id}
            item={item}
            type={'company' in item ? 'experience' : 'education'}
          />
        ))}
      </TimelineWrapper>
    </TimelineContainer>
  );
}