'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import personalData from '@/data/personal.json';

const ContactContainer = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
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
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--border);
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-text);
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: var(--secondary-text);

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--accent);
  }

  a {
    color: var(--secondary-text);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--accent);
    }
  }
`;

const ContactForm = styled(motion.form)`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--border);
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-text);
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: var(--primary-text);
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--primary-bg);
  color: var(--primary-text);
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  &::placeholder {
    color: var(--secondary-text);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--primary-bg);
  color: var(--primary-text);
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  &::placeholder {
    color: var(--secondary-text);
  }
`;

const SubmitButton = styled(motion.button)`
  background: var(--accent);
  color: var(--primary-text);
  padding: 1rem 2rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background: var(--accent-hover);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid #10b981;
  color: #10b981;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  color: #ef4444;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--primary-bg);
  border: 1px solid var(--border);
  color: var(--secondary-text);
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-2px);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const ResumeDownload = styled(motion.div)`
  text-align: center;
  margin-top: 3rem;
`;

const DownloadButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--card-bg);
  border: 2px solid var(--border);
  border-radius: 8px;
  color: var(--primary-text);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, we'll just show a success message
      // In a real implementation, you'd send this to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <Header>
        <Title
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Let&apos;s discuss opportunities in bioinformatics, software engineering, or research collaboration
        </Subtitle>
      </Header>

      <ContactContent>
        <ContactInfo
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <InfoTitle>Contact Information</InfoTitle>
          
          <InfoItem>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <a href={`mailto:${personalData.email}`}>{personalData.email}</a>
          </InfoItem>

          <InfoItem>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <a href={`tel:${personalData.phone}`}>{personalData.phone}</a>
          </InfoItem>

          <InfoItem>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>{personalData.location}</span>
          </InfoItem>

          <SocialLinks>
            <SocialLink href={personalData.github} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </SocialLink>
            
            {personalData.linkedin && (
              <SocialLink href={personalData.linkedin} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </SocialLink>
            )}
          </SocialLinks>
        </ContactInfo>

        <ContactForm
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSubmit}
        >
          <FormTitle>Send a Message</FormTitle>
          
          {submitStatus === 'success' && (
            <SuccessMessage
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Thank you for your message! I&apos;ll get back to you soon.
            </SuccessMessage>
          )}
          
          {submitStatus === 'error' && (
            <ErrorMessage
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              There was an error sending your message. Please try again.
            </ErrorMessage>
          )}

          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Your name"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your.email@example.com"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Tell me about your project or opportunity..."
            />
          </FormGroup>

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>
        </ContactForm>
      </ContactContent>

      <ResumeDownload
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <DownloadButton
          href="/resume.pdf"
          download="Rohan_Ray_Resume.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
          </svg>
          Download Resume
        </DownloadButton>
      </ResumeDownload>
    </ContactContainer>
  );
}