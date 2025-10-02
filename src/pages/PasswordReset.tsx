import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { colors, spacing, borderRadius, shadows, typography } from '../styles/design-system';

const PasswordResetContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: ${spacing[8]};
`;

const ResetCard = styled.div`
  width: 100%;
  max-width: 600px;
  background: ${colors.white};
  border-radius: ${borderRadius.xl};
  box-shadow: ${shadows.xl};
  overflow: hidden;
  min-height: 500px;
`;

const ResetHeader = styled.div`
  padding: ${spacing[12]} ${spacing[10]} ${spacing[8]};
  text-align: center;
  background: ${colors.white};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing[8]};
`;

const LogoIcon = styled.img`
  height: 64px;
  object-fit: contain;
`;

const ResetTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0 0 ${spacing[4]} 0;
  font-family: ${typography.fontSerif};
`;

const ResetSubtitle = styled.p`
  font-size: 20px;
  color: ${colors.textSecondary};
  margin: 0;
  line-height: 1.6;
`;

const ResetForm = styled.div`
  padding: 0 ${spacing[10]} ${spacing[10]};
`;

const FormGroup = styled.div`
  margin-bottom: ${spacing[8]};
`;

const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing[3]};
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: ${spacing[5]} ${spacing[5]} ${spacing[5]} ${spacing[12]};
  border: 2px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  font-size: 18px;
  transition: all 0.2s ease;
  background: ${colors.white};
  height: 60px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 4px ${colors.everlyCherry}15;
    transform: translateY(-1px);
  }

  &::placeholder {
    color: ${colors.textLight};
    font-size: 18px;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: ${spacing[5]};
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.textSecondary};
  z-index: 1;
`;

const ResetButton = styled.button`
  width: 100%;
  padding: ${spacing[5]} ${spacing[8]};
  background: ${colors.everlyCherry};
  color: ${colors.white};
  border: none;
  border-radius: ${borderRadius.lg};
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: ${spacing[8]};
  height: 60px;
  box-shadow: ${shadows.md};
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  &:hover {
    background: #A0005A;
    transform: translateY(-2px);
    box-shadow: ${shadows.lg};
  }

  &:disabled {
    background: ${colors.textLight};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[3]};
  color: ${colors.textSecondary};
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: ${spacing[3]} ${spacing[4]};
  border-radius: ${borderRadius.base};

  &:hover {
    color: ${colors.everlyCherry};
    background: ${colors.everlyCherry}10;
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: ${spacing[8]} 0;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${colors.success}20;
  color: ${colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${spacing[6]};
`;

const SuccessTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0 0 ${spacing[4]} 0;
`;

const SuccessText = styled.p`
  font-size: 20px;
  color: ${colors.textSecondary};
  margin: 0 0 ${spacing[8]} 0;
  line-height: 1.6;
`;

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <PasswordResetContainer>
        <ResetCard>
          <ResetHeader>
            <Logo>
              <LogoIcon src="/Everly_HorizontalLogo.png" alt="Everly Logo" />
            </Logo>
          </ResetHeader>
          
          <ResetForm>
            <SuccessMessage>
              <SuccessIcon>
                <CheckCircle size={32} />
              </SuccessIcon>
              <SuccessTitle>Check Your Email</SuccessTitle>
              <SuccessText>
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your email and follow the instructions to reset your password.
              </SuccessText>
              <BackLink to="/login">
                <ArrowLeft size={16} />
                Back to Login
              </BackLink>
            </SuccessMessage>
          </ResetForm>
        </ResetCard>
      </PasswordResetContainer>
    );
  }

  return (
    <PasswordResetContainer>
      <ResetCard>
        <ResetHeader>
          <Logo>
            <LogoIcon src="/Everly_HorizontalLogo.png" alt="Everly Logo" />
          </Logo>
          <ResetTitle>Reset Password</ResetTitle>
          <ResetSubtitle>
            Enter your email address and we'll send you a link to reset your password.
          </ResetSubtitle>
        </ResetHeader>

        <ResetForm>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Email Address</Label>
              <InputContainer>
                <InputIcon>
                  <Mail size={20} />
                </InputIcon>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputContainer>
            </FormGroup>

            <ResetButton type="submit" disabled={isLoading || !email}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </ResetButton>
          </form>

          <BackLink to="/login">
            <ArrowLeft size={16} />
            Back to Login
          </BackLink>
        </ResetForm>
      </ResetCard>
    </PasswordResetContainer>
  );
};

export default PasswordReset;
