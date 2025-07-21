'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Option 1: Hero Image Layout
const HeroImageCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
    box-shadow: 0 10px 40px rgba(59, 130, 246, 0.1);
  }
`;

const HeroImage = styled.div`
  height: 200px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeroContent = styled.div`
  padding: 1.5rem;
`;

// Option 2: Side Image Layout
const SideImageCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border);
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
    box-shadow: 0 10px 40px rgba(59, 130, 246, 0.1);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const SideImage = styled.div`
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 8px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

// Option 3: Gallery Layout
const GalleryCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border);
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
    box-shadow: 0 10px 40px rgba(59, 130, 246, 0.1);
  }
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const GalleryImage = styled.div<{ primary?: boolean }>`
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 6px;
  aspect-ratio: ${props => props.primary ? '16/10' : '1'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${props => props.primary ? '1rem' : '0.8rem'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.primary && `
    grid-column: 1 / 3;
  `}

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
`;

// Option 4: Modal/Lightbox Layout
const ModalCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border);
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
    box-shadow: 0 10px 40px rgba(59, 130, 246, 0.1);
  }
`;

const PreviewButton = styled.button`
  background: var(--accent);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &:hover {
    background: var(--accent-hover);
    transform: translateY(-1px);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid var(--border);
`;

const ModalImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ModalImage = styled.div`
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 8px;
  aspect-ratio: 16/10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--accent);
  color: white;
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Shared components
const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-text);
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: var(--secondary-text);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background: rgba(59, 130, 246, 0.1);
  color: var(--accent);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const OptionTitle = styled.h2`
  color: var(--primary-text);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`;

const sampleProject = {
  title: "First On Scene Emergency Response App",
  description: "iOS emergency response app for college campuses providing AED locations and step-by-step medical guidance for first responders and bystanders.",
  technologies: ["React Native", "iOS", "Geolocation", "UI/UX Design"]
};

export default function ProjectImageOptions() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ background: 'var(--primary-bg)', minHeight: '100vh', padding: '2rem 0' }}>
      <h1 style={{ color: 'var(--primary-text)', textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem' }}>
        Project Card Layout Options
      </h1>
      
      <OptionsContainer>
        {/* Option 1: Hero Image */}
        <div>
          <OptionTitle>Option 1: Hero Image Layout</OptionTitle>
          <HeroImageCard>
            <HeroImage>
              App Screenshots Hero
            </HeroImage>
            <HeroContent>
              <CardTitle>{sampleProject.title}</CardTitle>
              <CardDescription>{sampleProject.description}</CardDescription>
              <TechStack>
                {sampleProject.technologies.map((tech) => (
                  <TechTag key={tech}>{tech}</TechTag>
                ))}
              </TechStack>
            </HeroContent>
          </HeroImageCard>
        </div>

        {/* Option 2: Side Image */}
        <div>
          <OptionTitle>Option 2: Side Image Layout</OptionTitle>
          <SideImageCard>
            <SideImage>
              App Icon / Screenshot
            </SideImage>
            <div>
              <CardTitle>{sampleProject.title}</CardTitle>
              <CardDescription>{sampleProject.description}</CardDescription>
              <TechStack>
                {sampleProject.technologies.map((tech) => (
                  <TechTag key={tech}>{tech}</TechTag>
                ))}
              </TechStack>
            </div>
          </SideImageCard>
        </div>

        {/* Option 3: Gallery */}
        <div>
          <OptionTitle>Option 3: Gallery Layout</OptionTitle>
          <GalleryCard>
            <CardTitle>{sampleProject.title}</CardTitle>
            <GalleryContainer>
              <GalleryImage primary>Main Screenshot</GalleryImage>
              <GalleryImage>Screen 2</GalleryImage>
              <GalleryImage>Screen 3</GalleryImage>
              <GalleryImage>Screen 4</GalleryImage>
            </GalleryContainer>
            <CardDescription>{sampleProject.description}</CardDescription>
            <TechStack>
              {sampleProject.technologies.map((tech) => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </TechStack>
          </GalleryCard>
        </div>

        {/* Option 4: Modal/Lightbox */}
        <div>
          <OptionTitle>Option 4: Modal/Lightbox</OptionTitle>
          <ModalCard>
            <CardTitle>{sampleProject.title}</CardTitle>
            <CardDescription>{sampleProject.description}</CardDescription>
            <TechStack>
              {sampleProject.technologies.map((tech) => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </TechStack>
            <PreviewButton onClick={() => setModalOpen(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              View Screenshots
            </PreviewButton>
          </ModalCard>
        </div>
      </OptionsContainer>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setModalOpen(false)}>×</CloseButton>
              <h2 style={{ color: 'var(--primary-text)', marginBottom: '1rem' }}>
                {sampleProject.title} - Screenshots
              </h2>
              <ModalImageGrid>
                <ModalImage>Screenshot 1</ModalImage>
                <ModalImage>Screenshot 2</ModalImage>
                <ModalImage>Screenshot 3</ModalImage>
                <ModalImage>Screenshot 4</ModalImage>
              </ModalImageGrid>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </div>
  );
}