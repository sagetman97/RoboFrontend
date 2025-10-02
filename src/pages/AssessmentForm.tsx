import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Send, 
  User, 
  DollarSign, 
  Target, 
  Settings,
  ChevronDown,
  ChevronUp,
  Info,
  Loader2
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { colors, spacing, borderRadius, shadows, typography } from '../styles/design-system';

const AssessmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[4]};
  background: none;
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.base};
  color: ${colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    background: ${colors.lightGray};
    color: ${colors.textPrimary};
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing[6]};
`;

const HeaderInfo = styled.div`
  flex: 1;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0 0 ${spacing[2]} 0;
  font-family: ${typography.fontSerif};
`;

const PageSubtitle = styled.p`
  font-size: 16px;
  color: ${colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${spacing[2]};
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 8px;
  background: ${colors.lightGray};
  border-radius: ${borderRadius.full};
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(135deg, ${colors.everlyOrange} 0%, ${colors.everlyCherry} 100%);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textSecondary};
`;

const FormContainer = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.base};
  border: 1px solid ${colors.border};
  overflow: hidden;
`;

const StepContainer = styled.div`
  padding: ${spacing[8]};
`;

const StepTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0 0 ${spacing[6]} 0;
  font-family: ${typography.fontSerif};
`;

const QuestionGroup = styled.div`
  margin-bottom: ${spacing[8]};
`;

const QuestionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0 0 ${spacing[4]} 0;
`;

const QuestionSubtitle = styled.p`
  font-size: 14px;
  color: ${colors.textSecondary};
  margin: 0 0 ${spacing[4]} 0;
  line-height: 1.5;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
`;

const RadioOption = styled.label`
  display: flex;
  align-items: flex-start;
  gap: ${spacing[3]};
  padding: ${spacing[4]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.everlyCherry};
    background: ${colors.everlyCherry}05;
  }

  &.selected {
    border-color: ${colors.everlyCherry};
    background: ${colors.everlyCherry}10;
  }
`;

const RadioInput = styled.input`
  margin: 0;
  accent-color: ${colors.everlyCherry};
`;

const RadioText = styled.span`
  font-size: 14px;
  color: ${colors.textPrimary};
  line-height: 1.4;
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${spacing[4]};
  margin-bottom: ${spacing[6]};
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textPrimary};
`;

const Input = styled.input`
  padding: ${spacing[3]} ${spacing[4]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.base};
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 3px ${colors.everlyCherry}20;
  }
`;

const Select = styled.select`
  padding: ${spacing[3]} ${spacing[4]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.base};
  font-size: 14px;
  background: ${colors.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 3px ${colors.everlyCherry}20;
  }
`;

const AdvancedSection = styled.div`
  margin-top: ${spacing[8]};
  border-top: 1px solid ${colors.border};
  padding-top: ${spacing[6]};
`;

const AdvancedToggle = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  background: none;
  border: none;
  color: ${colors.everlyCherry};
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: ${spacing[4]};

  &:hover {
    color: #A0005A;
  }
`;

const AdvancedContent = styled.div<{ isOpen: boolean }>`
  max-height: ${props => props.isOpen ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const AdvancedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${spacing[4]};
  margin-bottom: ${spacing[6]};
`;

const AdvancedField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const AdvancedLabel = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
`;

const PrePopulatedBadge = styled.span`
  font-size: 10px;
  padding: 2px 6px;
  background: ${colors.info}20;
  color: ${colors.info};
  border-radius: ${borderRadius.full};
  font-weight: 500;
  text-transform: none;
`;

const AdvancedInput = styled.input`
  padding: ${spacing[2]} ${spacing[3]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.base};
  font-size: 13px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 2px ${colors.everlyCherry}20;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[6]} ${spacing[8]};
  background: ${colors.lightGray};
  border-top: 1px solid ${colors.border};
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[6]};
  border: none;
  border-radius: ${borderRadius.base};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;

  ${props => props.variant === 'primary' ? `
    background: ${colors.everlyCherry};
    color: ${colors.white};
    
    &:hover {
      background: #A0005A;
      transform: translateY(-1px);
      box-shadow: ${shadows.md};
    }
  ` : `
    background: ${colors.white};
    color: ${colors.textSecondary};
    border: 1px solid ${colors.border};
    
    &:hover {
      background: ${colors.lightGray};
      color: ${colors.textPrimary};
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// Processing Popup Styled Components
const ProcessingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ProcessingPopup = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.xl};
  box-shadow: ${shadows.xl};
  padding: ${spacing[8]};
  max-width: 500px;
  width: 90%;
  text-align: center;
`;

const ProcessingTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0 0 ${spacing[6]} 0;
  font-family: ${typography.fontSerif};
`;

const ProcessingText = styled.p`
  font-size: 16px;
  color: ${colors.textSecondary};
  line-height: 1.6;
  margin: 0 0 ${spacing[6]} 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing[4]};
  margin: ${spacing[6]} 0;
`;

const LoadingSpinner = styled(Loader2)`
  color: ${colors.everlyCherry};
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ProcessingSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  text-align: left;
  margin-top: ${spacing[4]};
`;

const ProcessingStep = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  font-size: 14px;
  color: ${props => props.active ? colors.everlyCherry : colors.textLight};
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.3s ease;
`;

const StepIcon = styled.div<{ active: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.active ? colors.everlyCherry : colors.lightGray};
  color: ${props => props.active ? colors.white : colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
`;

const AssessmentForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentProcessingStep, setCurrentProcessingStep] = useState(0);
  const [formData, setFormData] = useState({
    // Essential Suitability Questions
    coverageDuration: '',
    cashValueInterest: '',
    riskTolerance: '',
    premiumFlexibility: '',
    cashAccessNeeds: '',
    educationFunding: '',
    budgetPriority: '',
    healthConcerns: '',
    
    // Core Required Variables (Pre-populated from protection score)
    ageInsured: 35,
    maritalStatus: 'married',
    numDependents: 2,
    youngestDepAge: 8,
    annualIncomePrimary: 85000,
    annualEssentialExpenses: 59500, // 0.7 × income
    liquidAssets: 25000,
    debtsToClear: 150000,
    availableDeathBenefit: 200000,
    
    // Advanced Optional Variables (Pre-populated with defaults)
    annualIncomeSurvivor: 45000,
    otherSurvivorIncomeAnnual: 0,
    ssaSurvivorsAnnualEst: 12000,
    educationFundingPv: 150000,
    retirementAgeGoal: 65,
    targetEfMonths: 6,
    realDiscountRate: 1.5,
    taxableAssets: 50000,
    taxDeferredAssets: 120000,
    rothAssets: 25000,
    beneficiariesCurrent: true,
    ownershipCorrect: true,
    premiumsCurrent: true,
    ltdPercent: 60,
    ltdCapMonthly: 5000,
    ltdEliminationDays: 90,
    ltcStatus: 'none'
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  // Validation functions
  const isStep1Valid = () => {
    return formData.coverageDuration && 
           formData.cashValueInterest && 
           formData.riskTolerance && 
           formData.premiumFlexibility;
  };

  const isStep2Valid = () => {
    return formData.cashAccessNeeds && 
           formData.educationFunding && 
           formData.budgetPriority && 
           formData.healthConcerns;
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1: return isStep1Valid();
      case 2: return isStep2Valid();
      case 3: return true; // Step 3 doesn't require validation
      default: return false;
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (isCurrentStepValid() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    // Save draft logic
    console.log('Saving draft:', formData);
  };

  const handleSubmit = () => {
    // Start processing popup
    setIsProcessing(true);
    setCurrentProcessingStep(0);
    
    // Simulate processing steps
    const processingSteps = [
      "Analyzing your insurance needs...",
      "Identifying suitable products...",
      "Tailoring to your individual life...",
      "Building visualizations..."
    ];

    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      setCurrentProcessingStep(stepIndex);
      stepIndex++;
      
      if (stepIndex >= processingSteps.length) {
        clearInterval(stepInterval);
        // After 12 seconds total, navigate to report
        setTimeout(() => {
          setIsProcessing(false);
          navigate('/report/1'); // Using client ID 1 for demo
        }, 3000); // 3 seconds for the last step
      }
    }, 3000); // 3 seconds per step
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <StepTitle>Essential Suitability Questions</StepTitle>
            
            <QuestionGroup>
              <QuestionTitle>1. Coverage Duration</QuestionTitle>
              <QuestionSubtitle>How long do you need life insurance coverage?</QuestionSubtitle>
              <RadioGroup>
                {[
                  'For a specific period (like until retirement or kids are grown)',
                  'For my entire lifetime',
                  'I\'m not sure - I want flexibility'
                ].map((option, index) => (
                  <RadioOption 
                    key={index}
                    className={formData.coverageDuration === option ? 'selected' : ''}
                  >
                    <RadioInput
                      type="radio"
                      name="coverageDuration"
                      value={option}
                      checked={formData.coverageDuration === option}
                      onChange={(e) => handleInputChange('coverageDuration', e.target.value)}
                    />
                    <RadioText>{option}</RadioText>
                  </RadioOption>
                ))}
              </RadioGroup>
            </QuestionGroup>

            <QuestionGroup>
              <QuestionTitle>2. Cash Value Interest</QuestionTitle>
              <QuestionSubtitle>Are you interested in building cash value in your life insurance policy?</QuestionSubtitle>
              <RadioGroup>
                {[
                  'No, I just want the death benefit protection',
                  'Yes, I want to build savings/cash value over time',
                  'Maybe - I want to learn more about the benefits'
                ].map((option, index) => (
                  <RadioOption 
                    key={index}
                    className={formData.cashValueInterest === option ? 'selected' : ''}
                  >
                    <RadioInput
                      type="radio"
                      name="cashValueInterest"
                      value={option}
                      checked={formData.cashValueInterest === option}
                      onChange={(e) => handleInputChange('cashValueInterest', e.target.value)}
                    />
                    <RadioText>{option}</RadioText>
                  </RadioOption>
                ))}
              </RadioGroup>
            </QuestionGroup>

            <QuestionGroup>
              <QuestionTitle>3. Risk Tolerance</QuestionTitle>
              <QuestionSubtitle>How do you feel about market risk in your life insurance?</QuestionSubtitle>
              <RadioGroup>
                {[
                  'I want guaranteed returns only',
                  'I\'m comfortable with some market risk for growth potential',
                  'I want to participate in market gains but with downside protection'
                ].map((option, index) => (
                  <RadioOption 
                    key={index}
                    className={formData.riskTolerance === option ? 'selected' : ''}
                  >
                    <RadioInput
                      type="radio"
                      name="riskTolerance"
                      value={option}
                      checked={formData.riskTolerance === option}
                      onChange={(e) => handleInputChange('riskTolerance', e.target.value)}
                    />
                    <RadioText>{option}</RadioText>
                  </RadioOption>
                ))}
              </RadioGroup>
            </QuestionGroup>

            <QuestionGroup>
              <QuestionTitle>4. Premium Flexibility</QuestionTitle>
              <QuestionSubtitle>What type of premium payments do you prefer?</QuestionSubtitle>
              <RadioGroup>
                {[
                  'Level premiums that never increase',
                  'Flexible premiums I can adjust over time',
                  'I want to start with lower premiums'
                ].map((option, index) => (
                  <RadioOption 
                    key={index}
                    className={formData.premiumFlexibility === option ? 'selected' : ''}
                  >
                    <RadioInput
                      type="radio"
                      name="premiumFlexibility"
                      value={option}
                      checked={formData.premiumFlexibility === option}
                      onChange={(e) => handleInputChange('premiumFlexibility', e.target.value)}
                    />
                    <RadioText>{option}</RadioText>
                  </RadioOption>
                ))}
              </RadioGroup>
            </QuestionGroup>
          </>
        );

      case 2:
        return (
          <>
            <StepTitle>Essential Suitability Questions (Continued)</StepTitle>
            
            <QuestionGroup>
              <QuestionTitle>5. Cash Access Needs</QuestionTitle>
              <QuestionSubtitle>Do you want to be able to access cash from your life insurance while you're alive?</QuestionSubtitle>
              <RadioGroup>
                {[
                  'No, I only need the death benefit',
                  'Yes, I want to use it for emergencies or major purchases',
                  'Yes, I want to supplement my retirement income'
                ].map((option, index) => (
                  <RadioOption 
                    key={index}
                    className={formData.cashAccessNeeds === option ? 'selected' : ''}
                  >
                    <RadioInput
                      type="radio"
                      name="cashAccessNeeds"
                      value={option}
                      checked={formData.cashAccessNeeds === option}
                      onChange={(e) => handleInputChange('cashAccessNeeds', e.target.value)}
                    />
                    <RadioText>{option}</RadioText>
                  </RadioOption>
                ))}
              </RadioGroup>
            </QuestionGroup>

            <QuestionGroup>
              <QuestionTitle>6. Education Funding</QuestionTitle>
              <QuestionSubtitle>Are you interested in using life insurance to help fund your children's education?</QuestionSubtitle>
              <RadioGroup>
                {[
                  'No, I have other education savings plans',
                  'Yes, I want guaranteed education funding',
                  'Yes, but I want growth potential for education costs'
                ].map((option, index) => (
                  <RadioOption 
                    key={index}
                    className={formData.educationFunding === option ? 'selected' : ''}
                  >
                    <RadioInput
                      type="radio"
                      name="educationFunding"
                      value={option}
                      checked={formData.educationFunding === option}
                      onChange={(e) => handleInputChange('educationFunding', e.target.value)}
                    />
                    <RadioText>{option}</RadioText>
                  </RadioOption>
                ))}
              </RadioGroup>
            </QuestionGroup>

            <QuestionGroup>
              <QuestionTitle>7. Budget Priority</QuestionTitle>
              <QuestionSubtitle>What's most important to you?</QuestionSubtitle>
              <RadioGroup>
                {[
                  'Maximum death benefit for my premium dollar',
                  'Building wealth and cash value over time',
                  'A balance of protection and savings'
                ].map((option, index) => (
                  <RadioOption 
                    key={index}
                    className={formData.budgetPriority === option ? 'selected' : ''}
                  >
                    <RadioInput
                      type="radio"
                      name="budgetPriority"
                      value={option}
                      checked={formData.budgetPriority === option}
                      onChange={(e) => handleInputChange('budgetPriority', e.target.value)}
                    />
                    <RadioText>{option}</RadioText>
                  </RadioOption>
                ))}
              </RadioGroup>
            </QuestionGroup>

            <QuestionGroup>
              <QuestionTitle>8. Health Concerns</QuestionTitle>
              <QuestionSubtitle>Are you concerned about qualifying for life insurance?</QuestionSubtitle>
              <RadioGroup>
                {[
                  'No, I\'m in good health',
                  'Yes, I have some health issues',
                  'Yes, and I want simplified underwriting (no medical exam)'
                ].map((option, index) => (
                  <RadioOption 
                    key={index}
                    className={formData.healthConcerns === option ? 'selected' : ''}
                  >
                    <RadioInput
                      type="radio"
                      name="healthConcerns"
                      value={option}
                      checked={formData.healthConcerns === option}
                      onChange={(e) => handleInputChange('healthConcerns', e.target.value)}
                    />
                    <RadioText>{option}</RadioText>
                  </RadioOption>
                ))}
              </RadioGroup>
            </QuestionGroup>
          </>
        );

      case 3:
        return (
          <>
            <StepTitle>Review & Adjust Financial Information</StepTitle>
            <p style={{ color: colors.textSecondary, marginBottom: spacing[6], fontSize: '14px' }}>
              The following information has been pre-populated from your protection score analysis. 
              You can review and adjust these values if needed.
            </p>
            
            <InputGroup>
              <FormField>
                <Label>Age of Insured *</Label>
                <Input
                  type="number"
                  value={formData.ageInsured || ''}
                  onChange={(e) => handleInputChange('ageInsured', parseInt(e.target.value) || 0)}
                  placeholder="Enter age"
                />
              </FormField>
              
              <FormField>
                <Label>Marital Status *</Label>
                <Select
                  value={formData.maritalStatus}
                  onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                >
                  <option value="">Select status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </Select>
              </FormField>
              
              <FormField>
                <Label>Number of Dependents *</Label>
                <Input
                  type="number"
                  value={formData.numDependents || ''}
                  onChange={(e) => handleInputChange('numDependents', parseInt(e.target.value) || 0)}
                  placeholder="Number of children"
                />
              </FormField>
              
              <FormField>
                <Label>Age of Youngest Dependent</Label>
                <Input
                  type="number"
                  value={formData.youngestDepAge || ''}
                  onChange={(e) => handleInputChange('youngestDepAge', parseInt(e.target.value) || 0)}
                  placeholder="Age of youngest child"
                />
              </FormField>
              
              <FormField>
                <Label>Primary Annual Income *</Label>
                <Input
                  type="number"
                  value={formData.annualIncomePrimary || ''}
                  onChange={(e) => handleInputChange('annualIncomePrimary', parseFloat(e.target.value) || 0)}
                  placeholder="Annual income"
                />
              </FormField>
              
              <FormField>
                <Label>Essential Living Expenses</Label>
                <Input
                  type="number"
                  value={formData.annualEssentialExpenses || ''}
                  onChange={(e) => handleInputChange('annualEssentialExpenses', parseFloat(e.target.value) || 0)}
                  placeholder="Annual essential expenses"
                />
              </FormField>
              
              <FormField>
                <Label>Liquid Assets *</Label>
                <Input
                  type="number"
                  value={formData.liquidAssets || ''}
                  onChange={(e) => handleInputChange('liquidAssets', parseFloat(e.target.value) || 0)}
                  placeholder="Cash and liquid investments"
                />
              </FormField>
              
              <FormField>
                <Label>Debts to Clear *</Label>
                <Input
                  type="number"
                  value={formData.debtsToClear || ''}
                  onChange={(e) => handleInputChange('debtsToClear', parseFloat(e.target.value) || 0)}
                  placeholder="Total debts to be cleared"
                />
              </FormField>
              
              <FormField>
                <Label>Current Life Insurance Coverage *</Label>
                <Input
                  type="number"
                  value={formData.availableDeathBenefit || ''}
                  onChange={(e) => handleInputChange('availableDeathBenefit', parseFloat(e.target.value) || 0)}
                  placeholder="Current coverage amount"
                />
              </FormField>
            </InputGroup>

            <AdvancedSection>
              <AdvancedToggle onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}>
                <Settings size={16} />
                Advanced Variables (Pre-populated from Protection Score)
                {isAdvancedOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </AdvancedToggle>
              
              <AdvancedContent isOpen={isAdvancedOpen}>
                <p style={{ 
                  color: colors.textSecondary, 
                  marginBottom: spacing[4], 
                  fontSize: '13px',
                  fontStyle: 'italic'
                }}>
                  These variables were calculated from your protection score analysis. Adjust only if you have more accurate information.
                </p>
                <AdvancedGrid>
                  <AdvancedField>
                    <AdvancedLabel>
                      Survivor Annual Income
                      <PrePopulatedBadge>Pre-filled</PrePopulatedBadge>
                    </AdvancedLabel>
                    <AdvancedInput
                      type="number"
                      value={formData.annualIncomeSurvivor || ''}
                      onChange={(e) => handleInputChange('annualIncomeSurvivor', parseFloat(e.target.value) || 0)}
                      placeholder="Surviving spouse income"
                    />
                  </AdvancedField>
                  
                  <AdvancedField>
                    <AdvancedLabel>
                      Other Survivor Income
                      <PrePopulatedBadge>Pre-filled</PrePopulatedBadge>
                    </AdvancedLabel>
                    <AdvancedInput
                      type="number"
                      value={formData.otherSurvivorIncomeAnnual || ''}
                      onChange={(e) => handleInputChange('otherSurvivorIncomeAnnual', parseFloat(e.target.value) || 0)}
                      placeholder="Other survivor income sources"
                    />
                  </AdvancedField>
                  
                  <AdvancedField>
                    <AdvancedLabel>
                      Social Security Survivor Benefits
                      <PrePopulatedBadge>Pre-filled</PrePopulatedBadge>
                    </AdvancedLabel>
                    <AdvancedInput
                      type="number"
                      value={formData.ssaSurvivorsAnnualEst || ''}
                      onChange={(e) => handleInputChange('ssaSurvivorsAnnualEst', parseFloat(e.target.value) || 0)}
                      placeholder="SSA survivor benefits"
                    />
                  </AdvancedField>
                  
                  <AdvancedField>
                    <AdvancedLabel>
                      Education Funding Present Value
                      <PrePopulatedBadge>Pre-filled</PrePopulatedBadge>
                    </AdvancedLabel>
                    <AdvancedInput
                      type="number"
                      value={formData.educationFundingPv || ''}
                      onChange={(e) => handleInputChange('educationFundingPv', parseFloat(e.target.value) || 0)}
                      placeholder="Education funding PV"
                    />
                  </AdvancedField>
                  
                  <AdvancedField>
                    <AdvancedLabel>
                      Retirement Age Goal
                      <PrePopulatedBadge>Pre-filled</PrePopulatedBadge>
                    </AdvancedLabel>
                    <AdvancedInput
                      type="number"
                      value={formData.retirementAgeGoal || ''}
                      onChange={(e) => handleInputChange('retirementAgeGoal', parseInt(e.target.value) || 65)}
                      placeholder="Target retirement age"
                    />
                  </AdvancedField>
                  
                  <AdvancedField>
                    <AdvancedLabel>
                      Target Emergency Fund (Months)
                      <PrePopulatedBadge>Pre-filled</PrePopulatedBadge>
                    </AdvancedLabel>
                    <AdvancedInput
                      type="number"
                      value={formData.targetEfMonths || ''}
                      onChange={(e) => handleInputChange('targetEfMonths', parseFloat(e.target.value) || 6)}
                      placeholder="Emergency fund months"
                    />
                  </AdvancedField>
                  
                  <AdvancedField>
                    <AdvancedLabel>
                      Real Discount Rate (%)
                      <PrePopulatedBadge>Pre-filled</PrePopulatedBadge>
                    </AdvancedLabel>
                    <AdvancedInput
                      type="number"
                      step="0.1"
                      value={formData.realDiscountRate || ''}
                      onChange={(e) => handleInputChange('realDiscountRate', parseFloat(e.target.value) || 1.5)}
                      placeholder="Real discount rate"
                    />
                  </AdvancedField>
                  
                  <AdvancedField>
                    <AdvancedLabel>
                      Taxable Assets
                      <PrePopulatedBadge>Pre-filled</PrePopulatedBadge>
                    </AdvancedLabel>
                    <AdvancedInput
                      type="number"
                      value={formData.taxableAssets || ''}
                      onChange={(e) => handleInputChange('taxableAssets', parseFloat(e.target.value) || 0)}
                      placeholder="Taxable investment assets"
                    />
                  </AdvancedField>
                  
                  <AdvancedField>
                    <AdvancedLabel>
                      Tax-Deferred Assets
                      <PrePopulatedBadge>Pre-filled</PrePopulatedBadge>
                    </AdvancedLabel>
                    <AdvancedInput
                      type="number"
                      value={formData.taxDeferredAssets || ''}
                      onChange={(e) => handleInputChange('taxDeferredAssets', parseFloat(e.target.value) || 0)}
                      placeholder="401k, IRA assets"
                    />
                  </AdvancedField>
                  
                  <AdvancedField>
                    <AdvancedLabel>
                      Roth Assets
                      <PrePopulatedBadge>Pre-filled</PrePopulatedBadge>
                    </AdvancedLabel>
                    <AdvancedInput
                      type="number"
                      value={formData.rothAssets || ''}
                      onChange={(e) => handleInputChange('rothAssets', parseFloat(e.target.value) || 0)}
                      placeholder="Roth assets"
                    />
                  </AdvancedField>
                  
                  <AdvancedField>
                    <AdvancedLabel>
                      LTD Percentage (%)
                      <PrePopulatedBadge>Pre-filled</PrePopulatedBadge>
                    </AdvancedLabel>
                    <AdvancedInput
                      type="number"
                      value={formData.ltdPercent || ''}
                      onChange={(e) => handleInputChange('ltdPercent', parseFloat(e.target.value) || 60)}
                      placeholder="LTD percentage"
                    />
                  </AdvancedField>
                  
                  <AdvancedField>
                    <AdvancedLabel>
                      LTD Monthly Cap
                      <PrePopulatedBadge>Pre-filled</PrePopulatedBadge>
                    </AdvancedLabel>
                    <AdvancedInput
                      type="number"
                      value={formData.ltdCapMonthly || ''}
                      onChange={(e) => handleInputChange('ltdCapMonthly', parseFloat(e.target.value) || 0)}
                      placeholder="LTD monthly cap"
                    />
                  </AdvancedField>
                  
                  <AdvancedField>
                    <AdvancedLabel>
                      LTD Elimination Days
                      <PrePopulatedBadge>Pre-filled</PrePopulatedBadge>
                    </AdvancedLabel>
                    <AdvancedInput
                      type="number"
                      value={formData.ltdEliminationDays || ''}
                      onChange={(e) => handleInputChange('ltdEliminationDays', parseInt(e.target.value) || 90)}
                      placeholder="LTD elimination period"
                    />
                  </AdvancedField>
                  
                  <AdvancedField>
                    <AdvancedLabel>
                      Long-Term Care Status
                      <PrePopulatedBadge>Pre-filled</PrePopulatedBadge>
                    </AdvancedLabel>
                    <Select
                      value={formData.ltcStatus}
                      onChange={(e) => handleInputChange('ltcStatus', e.target.value)}
                    >
                      <option value="none">None</option>
                      <option value="standalone">Standalone LTC</option>
                      <option value="hybrid">Hybrid LTC</option>
                      <option value="rider">LTC Rider</option>
                    </Select>
                  </AdvancedField>
                </AdvancedGrid>
              </AdvancedContent>
            </AdvancedSection>
          </>
        );

      default:
        return null;
    }
  };

  const processingSteps = [
    "Analyzing your insurance needs...",
    "Identifying suitable products...",
    "Tailoring to your individual life...",
    "Building visualizations..."
  ];

  return (
    <MainLayout currentPage="clients">
      <AssessmentContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Back to Client Detail
        </BackButton>

        <PageHeader>
          <HeaderInfo>
            <PageTitle>Life Insurance Assessment</PageTitle>
            <PageSubtitle>Complete the assessment to generate a personalized life insurance recommendation</PageSubtitle>
          </HeaderInfo>
          <ProgressContainer>
            <ProgressText>{Math.round(progress)}% Complete</ProgressText>
            <ProgressBar>
              <ProgressFill progress={progress} />
            </ProgressBar>
          </ProgressContainer>
        </PageHeader>

        <FormContainer>
          <StepContainer>
            {renderStepContent()}
          </StepContainer>
          
          <FormActions>
            <div>
              {currentStep > 1 && (
                <ActionButton variant="secondary" onClick={handlePrevious}>
                  <ArrowLeft size={16} />
                  Previous
                </ActionButton>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: spacing[3] }}>
              <ActionButton variant="secondary" onClick={handleSaveDraft}>
                <Save size={16} />
                Save Draft
              </ActionButton>
              
              {currentStep < totalSteps ? (
                <ActionButton 
                  variant="primary" 
                  onClick={handleNext}
                  disabled={!isCurrentStepValid()}
                >
                  Next
                  <ArrowRight size={16} />
                </ActionButton>
              ) : (
                <ActionButton variant="primary" onClick={handleSubmit}>
                  <Send size={16} />
                  Submit Assessment
                </ActionButton>
              )}
            </div>
          </FormActions>
        </FormContainer>
      </AssessmentContainer>

      {/* Processing Popup */}
      {isProcessing && (
        <ProcessingOverlay>
          <ProcessingPopup>
            <ProcessingTitle>Processing Your Assessment</ProcessingTitle>
            <ProcessingText>
              Give us a moment while our AI analyzes your insurance needs and creates your personalized recommendation.
            </ProcessingText>
            
            <LoadingContainer>
              <LoadingSpinner size={48} />
            </LoadingContainer>

            <ProcessingSteps>
              {processingSteps.map((step, index) => (
                <ProcessingStep key={index} active={index <= currentProcessingStep}>
                  <StepIcon active={index <= currentProcessingStep}>
                    {index < currentProcessingStep ? '✓' : index + 1}
                  </StepIcon>
                  {step}
                </ProcessingStep>
              ))}
            </ProcessingSteps>
          </ProcessingPopup>
        </ProcessingOverlay>
      )}
    </MainLayout>
  );
};

export default AssessmentForm;
