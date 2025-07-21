'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';

const Card = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
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
      switch(props.category) {
        case 'computational-biology': return 'linear-gradient(90deg, #8b5cf6, #7c3aed)';
        case 'bioinformatics': return 'linear-gradient(90deg, #10b981, #059669)';
        case 'computer-science': return 'linear-gradient(90deg, #3b82f6, #2563eb)';
        case 'public-health': return 'linear-gradient(90deg, #ef4444, #dc2626)';
        case 'for-fun': return 'linear-gradient(90deg, #f59e0b, #d97706)';
        default: return 'linear-gradient(90deg, #6b7280, #4b5563)';
      }
    }};
  }

  &:hover {
    transform: translateY(-8px);
    border-color: var(--accent);
    box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
  }
`;

const CardHeader = styled.div`
  margin-bottom: 1rem;
  padding-top: 2.5rem;
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
`;

const GalleryImage = styled.div<{ primary?: boolean }>`
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 6px;
  aspect-ratio: ${props => props.primary ? '16/10' : '1'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${props => props.primary ? '0.9rem' : '0.7rem'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  
  ${props => props.primary && `
    grid-column: 1 / 3;
  `}

  &:hover {
    transform: scale(1.02);
  }

  &:hover .expand-icon {
    opacity: 0.9;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
`;

const ExpandIcon = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
  transition: opacity 0.3s ease;
  pointer-events: none;
  
  svg {
    width: 1rem;
    height: 1rem;
    color: white;
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-text);
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const Description = styled.p`
  color: var(--secondary-text);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: rgba(59, 130, 246, 0.1);
  color: var(--accent);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const Link = styled.a`
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-hover);
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const CategoryBadge = styled.span<{ category: string }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => {
    switch(props.category) {
      case 'computational-biology': return 'rgba(139, 92, 246, 0.1)';
      case 'bioinformatics': return 'rgba(16, 185, 129, 0.1)';
      case 'computer-science': return 'rgba(59, 130, 246, 0.1)';
      case 'public-health': return 'rgba(239, 68, 68, 0.1)';
      case 'for-fun': return 'rgba(245, 158, 11, 0.1)';
      default: return 'rgba(107, 114, 128, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.category) {
      case 'computational-biology': return '#8b5cf6';
      case 'bioinformatics': return '#10b981';
      case 'computer-science': return '#3b82f6';
      case 'public-health': return '#ef4444';
      case 'for-fun': return '#f59e0b';
      default: return '#6b7280';
    }
  }};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FeaturedBadge = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: linear-gradient(45deg, #f59e0b, #d97706);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ImageModal = styled.div`
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  background: rgba(0, 0, 0, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999 !important;
  padding: 0;
  margin: 0;
  overflow: hidden;
`;

const ModalImage = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: contain;
  border-radius: 0;
  box-shadow: none;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
`;

const NavigationButton = styled.button<{ direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'prev' ? 'left: 2rem;' : 'right: 2rem;'}
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

interface ProjectCardProps {
  project: Project;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImage = () => {
    setSelectedImageIndex(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null || !project.images) return;
    
    if (direction === 'prev') {
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : project.images.length - 1);
    } else {
      setSelectedImageIndex(selectedImageIndex < project.images.length - 1 ? selectedImageIndex + 1 : 0);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeImage();
    if (e.key === 'ArrowLeft') navigateImage('prev');
    if (e.key === 'ArrowRight') navigateImage('next');
  };

  const handleImageClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedImageIndex(index);
  };

  return (
    <Card
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      category={project.category}
    >
      {project.featured && <FeaturedBadge>Featured</FeaturedBadge>}
      <CategoryBadge category={project.category}>
        {project.category.replace('-', ' ')}
      </CategoryBadge>
      
      <CardHeader>
        <Title>{project.title}</Title>
      </CardHeader>

      {project.images && project.images.length > 0 && (
        <ImageGallery>
          {project.images.map((image, index) => (
            <GalleryImage 
              key={index} 
              primary={index === 0}
              onClick={(e) => handleImageClick(index, e)}
              onMouseDown={(e) => e.preventDefault()}
            >
              <img 
                src={image} 
                alt={`${project.title} screenshot ${index + 1}`}
                draggable={false}
              />
              <ExpandIcon className="expand-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21,16V4a2,2,0,0,0-2-2H7V4H19V16h2ZM17,8V20a2,2,0,0,1-2,2H3a2,2,0,0,1-2-2V8A2,2,0,0,1,3,6H15A2,2,0,0,1,17,8ZM15,8H3v12H15Z"/>
                </svg>
              </ExpandIcon>
            </GalleryImage>
          ))}
        </ImageGallery>
      )}
      
      <Description>{project.description}</Description>
      
      <TechStack>
        {project.technologies.map((tech) => (
          <TechTag key={tech}>{tech}</TechTag>
        ))}
      </TechStack>
      
      <Links>
        {project.githubUrl && (
          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            {project.githubUrl.includes('pubmed') ? (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                Publication
              </>
            ) : project.githubUrl.includes('cdr.lib.unc.edu') ? (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                View Thesis
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </>
            )}
          </Link>
        )}
        {project.liveUrl && (
          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            {project.liveUrl.includes('pypi.org') ? (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Open Source PyPI Package
              </>
            ) : project.liveUrl.includes('docs.google.com/presentation') ? (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9v-2h2v2zm0-4H9V9h2v2zm4 4h-2v-2h2v2zm0-4h-2V9h2v2z"/>
                </svg>
                View Slides
              </>
            ) : project.liveUrl.endsWith('.pdf') ? (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                Download Project Writeup
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Live Demo
              </>
            )}
          </Link>
        )}
      </Links>

      {selectedImageIndex !== null && project.images && typeof document !== 'undefined' && createPortal(
        <ImageModal onClick={closeImage}>
          <CloseButton onClick={closeImage}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </CloseButton>

          {project.images.length > 1 && (
            <>
              <NavigationButton 
                direction="prev" 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </NavigationButton>

              <NavigationButton 
                direction="next" 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </NavigationButton>
            </>
          )}

          <ModalImage 
            src={project.images[selectedImageIndex]} 
            alt={`${project.title} screenshot ${selectedImageIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />

          {project.images.length > 1 && (
            <ImageCounter>
              {selectedImageIndex + 1} of {project.images.length}
            </ImageCounter>
          )}
        </ImageModal>,
        document.body
      )}
    </Card>
  );
}