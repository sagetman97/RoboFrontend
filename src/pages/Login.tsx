import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { colors, spacing, borderRadius, shadows, typography } from '../styles/design-system';

const LoginContainer = styled.div`
  min-height: 100vh;
  height: 100vh;
  display: flex;
  background: ${colors.white};
  justify-content: center;
  align-items: center;
  padding: ${spacing[4]};
  box-sizing: border-box;
`;

const LoginContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1400px;
  background: ${colors.white};
  border-radius: ${borderRadius.xl};
  overflow: hidden;
  height: 90vh;
  min-height: 700px;
  max-height: 800px;
  box-shadow: ${shadows.xl};
`;

const LeftPanel = styled.div`
  flex: 0 0 55%;
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${spacing[12]} ${spacing[10]};
  position: relative;
  overflow: hidden;
  height: 100%;
`;

const BrandingContent = styled.div`
  max-width: 500px;
  text-align: center;
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing[8]};
`;

const LogoIcon = styled.img`
  height: 104px;
  object-fit: contain;
`;

const Tagline = styled.h1`
  font-size: 56px;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing[6]};
  line-height: 1.1;
  font-family: ${typography.fontSerif};
`;

const CompanyName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: ${spacing[6]};
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: ${colors.textSecondary};
  line-height: 1.6;
  max-width: 450px;
  margin: 0 auto;
  font-weight: 400;
`;

const RightPanel = styled.div`
  flex: 0 0 45%;
  background: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing[8]};
  height: 100%;
`;

const LoginForm = styled.div`
  background: ${colors.white};
  padding: ${spacing[10]};
  border-radius: ${borderRadius.xl};
  width: 100%;
  max-width: 500px;
  border: 1px solid ${colors.border};
`;

const FormTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing[3]};
  text-align: center;
`;

const FormSubtitle = styled.p`
  color: ${colors.textSecondary};
  text-align: center;
  margin-bottom: ${spacing[10]};
  font-size: 18px;
  font-weight: 400;
`;

const FormGroup = styled.div`
  margin-bottom: ${spacing[6]};
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
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
  font-size: 16px;
  font-family: ${typography.fontPrimary};
  transition: all 0.2s ease;
  background: ${colors.white};
  height: 56px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 4px ${colors.everlyCherry}15;
    transform: translateY(-1px);
  }

  &::placeholder {
    color: ${colors.textLight};
    font-size: 16px;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: ${spacing[5]};
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: ${spacing[5]};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${colors.textLight};
  cursor: pointer;
  padding: ${spacing[2]};
  border-radius: 6px;
  transition: all 0.2s ease;
  z-index: 1;

  &:hover {
    color: ${colors.textSecondary};
    background: ${colors.lightGray};
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
  margin-bottom: ${spacing[8]};
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: ${colors.everlyCherry};
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 16px;
  color: ${colors.textSecondary};
  cursor: pointer;
  font-weight: 400;
`;

const LoginButton = styled.button`
  width: 100%;
  background: ${colors.everlyCherry};
  color: ${colors.white};
  border: none;
  padding: ${spacing[5]} ${spacing[8]};
  border-radius: ${borderRadius.lg};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[6]};
  height: 56px;
  box-shadow: ${shadows.md};
  box-sizing: border-box;

  &:hover {
    background: #A0005A;
    transform: translateY(-2px);
    box-shadow: ${shadows.lg};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ForgotPassword = styled(Link)`
  display: block;
  text-align: center;
  color: ${colors.textSecondary};
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: ${spacing[2]} ${spacing[4]};
  border-radius: ${borderRadius.base};

  &:hover {
    color: ${colors.everlyCherry};
    background: ${colors.everlyCherry}10;
  }
`;

const ErrorMessage = styled.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: ${colors.error};
  padding: ${spacing[3]} ${spacing[4]};
  border-radius: ${borderRadius.base};
  font-size: 14px;
  margin-bottom: ${spacing[4]};
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${colors.white}40;
  border-top: 2px solid ${colors.white};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Basic validation
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }

      if (!formData.email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }

      // Simulate successful login
      console.log('Login successful:', formData);
      // Redirect to dashboard
      navigate('/dashboard');
      
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginContent>
        <LeftPanel>
          <BrandingContent>
            <Logo>
              <LogoIcon src="/Everly_HorizontalLogo.png" alt="Everly Logo" />
            </Logo>
            
            <Tagline>Made for Living™</Tagline>
            
            <CompanyName>EVERLY LIFE INSURANCE COMPANY</CompanyName>
            
            <Subtitle>
              We're transforming the life insurance experience, because we believe it should be more than just a safety net. It should evolve with you, offering benefits that provide real value throughout your life.
            </Subtitle>
          </BrandingContent>
        </LeftPanel>

        <RightPanel>
          <LoginForm>
            <FormTitle>Welcome back</FormTitle>
            <FormSubtitle>Sign in to your agent account</FormSubtitle>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="email">Email address</Label>
                <InputContainer>
                  <InputIcon>
                    <Mail size={20} />
                  </InputIcon>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </InputContainer>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <InputContainer>
                  <InputIcon>
                    <Lock size={20} />
                  </InputIcon>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </PasswordToggle>
                </InputContainer>
              </FormGroup>

              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <CheckboxLabel htmlFor="rememberMe">
                  Remember me
                </CheckboxLabel>
              </CheckboxContainer>

              <LoginButton type="submit" disabled={isLoading}>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={20} />
                  </>
                )}
              </LoginButton>
            </form>

            <ForgotPassword to="/password-reset">
              Forgot your password?
            </ForgotPassword>
          </LoginForm>
        </RightPanel>
      </LoginContent>
    </LoginContainer>
  );
};

export default Login;
