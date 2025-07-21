'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import personalData from '@/data/personal.json';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--primary-bg);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const TextContent = styled.div`
  z-index: 1;
`;

const Name = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1rem;
  background: var(--gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--primary-text);
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 300;
  color: var(--secondary-text);
  margin-bottom: 2rem;
  line-height: 1.3;
`;

const Description = styled(motion.p)`
  font-size: 1.25rem;
  color: var(--secondary-text);
  margin-bottom: 3rem;
  max-width: 600px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 0 auto 2rem;
  }
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled(motion.a)`
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &.primary {
    background: var(--accent);
    color: var(--primary-text);
    
    &:hover {
      background: var(--accent-hover);
      transform: translateY(-2px);
    }
  }

  &.secondary {
    border: 2px solid var(--border);
    color: var(--primary-text);
    
    &:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
    }
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    order: -1;
  }
`;

const ProfileImage = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 4px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }

  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
  }
`;

const FullScreenOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--primary-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LargeName = styled(motion.h1)`
  font-size: clamp(4rem, 15vw, 12rem);
  font-weight: 700;
  background: var(--gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--primary-text);
  text-align: center;
  line-height: 1;
`;

const introVariants = {
  initial: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const overlayVariants = {
  initial: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8,
      delay: 0.4,
    },
  },
};

const contentVariants = {
  hidden: { 
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const imageVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
    },
  },
};

export default function Hero() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000); // Show intro for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <FullScreenOverlay
            variants={overlayVariants}
            initial="initial"
            exit="exit"
          >
            <LargeName
              variants={introVariants}
              initial="initial"
              exit="exit"
            >
              {personalData.name}
            </LargeName>
          </FullScreenOverlay>
        )}
      </AnimatePresence>

      <HeroSection>
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={showIntro ? "hidden" : "visible"}
        >
          <HeroContent>
            <TextContent>
              <Name variants={itemVariants}>
                {personalData.name}
              </Name>
              <Title variants={itemVariants}>
                {personalData.title}
              </Title>
              <Description variants={itemVariants}>
                {personalData.description}
              </Description>
              <CTAButtons variants={itemVariants}>
                <Button 
                  className="primary"
                  href="/projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </Button>
                <Button 
                  className="secondary"
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </Button>
              </CTAButtons>
            </TextContent>
            
            <ImageContainer variants={imageVariants}>
              <ProfileImage>
                <img 
                  src="/RohanRay_Headshot.JPG" 
                  alt="Rohan Ray"
                />
              </ProfileImage>
            </ImageContainer>
          </HeroContent>
        </motion.div>
      </HeroSection>
    </>
  );
}