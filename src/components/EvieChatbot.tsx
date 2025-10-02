import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { colors, spacing, borderRadius, shadows, typography } from '../styles/design-system';

const ChatbotContainer = styled.div<{ isOpen: boolean; isMinimized: boolean }>`
  position: fixed;
  bottom: ${spacing[6]};
  right: ${spacing[6]};
  z-index: 1000;
  transition: all 0.3s ease;
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(100px)'};
  opacity: ${props => props.isOpen ? 1 : 0};
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};

  /* Adjust positioning for smaller screens */
  @media (max-width: 1366px) {
    bottom: ${spacing[4]};
    right: ${spacing[4]};
  }

  @media (max-width: 1280px) {
    bottom: ${spacing[3]};
    right: ${spacing[3]};
  }
`;

const ChatButton = styled.button<{ isOpen: boolean }>`
  position: fixed;
  bottom: ${spacing[6]};
  right: ${spacing[6]};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.everlyOrange} 0%, ${colors.everlyCherry} 100%);
  border: none;
  color: ${colors.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${shadows.lg};
  transition: all 0.3s ease;
  z-index: 1001;
  transform: ${props => props.isOpen ? 'scale(0)' : 'scale(1)'};
  opacity: ${props => props.isOpen ? 0 : 1};

  &:hover {
    transform: ${props => props.isOpen ? 'scale(0)' : 'scale(1.1)'};
    box-shadow: ${shadows.xl};
  }

  /* Adjust positioning for smaller screens */
  @media (max-width: 1366px) {
    bottom: ${spacing[4]};
    right: ${spacing[4]};
    width: 55px;
    height: 55px;
  }

  @media (max-width: 1280px) {
    bottom: ${spacing[3]};
    right: ${spacing[3]};
    width: 50px;
    height: 50px;
  }

  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${colors.everlyOrange} 0%, ${colors.everlyCherry} 100%);
    opacity: 0.3;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.1;
    }
    100% {
      transform: scale(1);
      opacity: 0.3;
    }
  }
`;

const ChatWindow = styled.div<{ isMinimized: boolean }>`
  width: ${props => props.isMinimized ? '390px' : '520px'};
  height: ${props => props.isMinimized ? '78px' : '780px'};
  background: ${colors.white};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.xl};
  border: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;

  /* Responsive sizing for different desktop screens */
  @media (max-width: 1366px) {
    width: ${props => props.isMinimized ? '350px' : '420px'};
    height: ${props => props.isMinimized ? '70px' : '500px'};
  }

  @media (max-width: 1280px) {
    width: ${props => props.isMinimized ? '320px' : '380px'};
    height: ${props => props.isMinimized ? '65px' : '400px'};
  }

  @media (max-width: 1024px) {
    width: ${props => props.isMinimized ? '300px' : '350px'};
    height: ${props => props.isMinimized ? '60px' : '350px'};
  }

  /* Maximum height constraint to prevent overflow */
  @media (max-height: 800px) {
    height: ${props => props.isMinimized ? '60px' : '400px'};
  }

  @media (max-height: 600px) {
    height: ${props => props.isMinimized ? '60px' : '300px'};
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, ${colors.everlyOrange} 0%, ${colors.everlyCherry} 100%);
  color: ${colors.white};
  padding: ${spacing[4]} ${spacing[6]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
`;

const EvieAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: ${colors.white}20;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
`;

const EvieName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.white};
`;

const EvieStatus = styled.div`
  font-size: 11px;
  color: ${colors.white}80;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
`;

const HeaderButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: ${colors.white}20;
  border-radius: ${borderRadius.base};
  color: ${colors.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.white}30;
  }
`;

const ChatBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: ${spacing[3]};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  max-height: 620px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.lightGray};
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.border};
    border-radius: 2px;
  }
`;

const Message = styled.div<{ isUser: boolean }>`
  display: flex;
  gap: ${spacing[3]};
  align-items: flex-start;
  flex-direction: ${props => props.isUser ? 'row-reverse' : 'row'};
`;

const MessageAvatar = styled.div<{ isUser: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
  background: ${props => props.isUser 
    ? colors.everlyCherry 
    : `linear-gradient(135deg, ${colors.everlyOrange} 0%, ${colors.everlyCherry} 100%)`
  };
`;

const MessageContent = styled.div<{ isUser: boolean }>`
  max-width: ${props => props.isUser ? '75%' : '80%'};
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
  align-items: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  background: ${props => props.isUser ? colors.everlyCherry : colors.lightGray};
  color: ${props => props.isUser ? colors.white : colors.textPrimary};
  padding: ${spacing[2]} ${spacing[3]};
  border-radius: ${props => props.isUser 
    ? `${borderRadius.lg} ${borderRadius.lg} ${borderRadius.base} ${borderRadius.lg}`
    : `${borderRadius.lg} ${borderRadius.lg} ${borderRadius.lg} ${borderRadius.base}`
  };
  font-size: 13px;
  line-height: 1.4;
  word-wrap: break-word;
`;

const MessageTime = styled.div<{ isUser: boolean }>`
  font-size: 11px;
  color: ${colors.textLight};
  text-align: ${props => props.isUser ? 'right' : 'left'};
  margin-top: ${spacing[1]};
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
`;

const TypingDots = styled.div`
  display: flex;
  gap: ${spacing[1]};
  padding: ${spacing[3]} ${spacing[4]};
  background: ${colors.lightGray};
  border-radius: ${borderRadius.lg} ${borderRadius.lg} ${borderRadius.lg} ${borderRadius.base};
`;

const TypingDot = styled.div`
  width: 6px;
  height: 6px;
  background: ${colors.textLight};
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;

  &:nth-child(1) { animation-delay: -0.32s; }
  &:nth-child(2) { animation-delay: -0.16s; }

  @keyframes typing {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const ChatInput = styled.div`
  padding: ${spacing[4]};
  border-top: 1px solid ${colors.border};
  background: ${colors.white};
`;

const InputContainer = styled.div`
  display: flex;
  gap: ${spacing[3]};
  align-items: flex-end;
`;

const InputField = styled.textarea`
  flex: 1;
  min-height: 36px;
  max-height: 100px;
  padding: ${spacing[2]} ${spacing[3]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  font-size: 13px;
  font-family: ${typography.fontPrimary};
  resize: none;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 3px ${colors.everlyCherry}20;
  }

  &::placeholder {
    color: ${colors.textLight};
  }
`;

const SendButton = styled.button<{ disabled: boolean }>`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: ${props => props.disabled ? colors.border : colors.everlyCherry};
  color: ${props => props.disabled ? colors.textLight : colors.white};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: #A0005A;
    transform: scale(1.05);
  }
`;

const QuickActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]};
  margin-bottom: ${spacing[3]};
`;

const QuickActionButton = styled.button`
  padding: ${spacing[1]} ${spacing[2]};
  background: ${colors.lightGray};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.full};
  font-size: 11px;
  color: ${colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.everlyCherry}10;
    border-color: ${colors.everlyCherry};
    color: ${colors.everlyCherry};
  }
`;

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const EvieChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Evie, your AI assistant. I can help you with questions about the platform, reports, or life insurance products. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const quickActions = [
    "How do I send an assessment?",
    "What is a protection score?",
    "How do I generate a report?",
    "Help with client management"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('assessment') || input.includes('send')) {
      return "To send an assessment, go to the Clients page, find your client, and click the 'Send Assessment' button. This will email them a form to complete their life insurance needs analysis.";
    }
    
    if (input.includes('protection score') || input.includes('score')) {
      return "A protection score is a percentage that indicates how well a client's current life insurance coverage meets their needs. Scores below 60% indicate high need, 60-79% moderate need, and 80%+ adequate coverage.";
    }
    
    if (input.includes('report') || input.includes('generate')) {
      return "Reports are automatically generated after a client completes their assessment form. You can view and edit reports in the Reports section, then approve them before sending to clients.";
    }
    
    if (input.includes('client') || input.includes('manage')) {
      return "You can manage clients in the Clients page. There you can view their protection scores, send assessments, track communication history, and manage their life insurance needs.";
    }
    
    if (input.includes('help') || input.includes('how')) {
      return "I'm here to help! You can ask me about:\n• Sending assessments to clients\n• Understanding protection scores\n• Generating and reviewing reports\n• Client management features\n• Life insurance products\n\nWhat would you like to know more about?";
    }
    
    return "I understand you're asking about: \"" + userInput + "\". I can help with questions about the platform, life insurance products, client management, or reports. Could you be more specific about what you'd like to know?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={() => setIsOpen(true)}>
        <MessageCircle size={24} />
      </ChatButton>

      <ChatbotContainer isOpen={isOpen} isMinimized={isMinimized}>
        <ChatWindow isMinimized={isMinimized}>
          <ChatHeader onClick={() => setIsMinimized(!isMinimized)}>
            <HeaderInfo>
              <EvieAvatar>
                <Bot size={16} />
              </EvieAvatar>
              <HeaderText>
                <EvieName>Evie</EvieName>
                <EvieStatus>AI Assistant</EvieStatus>
              </HeaderText>
            </HeaderInfo>
            <HeaderActions>
              <HeaderButton onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}>
                {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </HeaderButton>
              <HeaderButton onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}>
                <X size={14} />
              </HeaderButton>
            </HeaderActions>
          </ChatHeader>

          {!isMinimized && (
            <ChatBody>
              <MessagesContainer>
                {messages.map((message) => (
                  <Message key={message.id} isUser={message.isUser}>
                    <MessageAvatar isUser={message.isUser}>
                      {message.isUser ? <User size={16} /> : <Bot size={16} />}
                    </MessageAvatar>
                    <MessageContent isUser={message.isUser}>
                      <MessageBubble isUser={message.isUser}>
                        {message.text}
                      </MessageBubble>
                      <MessageTime isUser={message.isUser}>
                        {formatTime(message.timestamp)}
                      </MessageTime>
                    </MessageContent>
                  </Message>
                ))}

                {isTyping && (
                  <Message isUser={false}>
                    <MessageAvatar isUser={false}>
                      <Bot size={16} />
                    </MessageAvatar>
                    <MessageContent isUser={false}>
                      <TypingIndicator>
                        <TypingDots>
                          <TypingDot />
                          <TypingDot />
                          <TypingDot />
                        </TypingDots>
                      </TypingIndicator>
                    </MessageContent>
                  </Message>
                )}
                <div ref={messagesEndRef} />
              </MessagesContainer>

              <ChatInput>
                <QuickActions>
                  {quickActions.map((action, index) => (
                    <QuickActionButton
                      key={index}
                      onClick={() => handleQuickAction(action)}
                    >
                      {action}
                    </QuickActionButton>
                  ))}
                </QuickActions>
                <InputContainer>
                  <InputField
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    rows={1}
                  />
                  <SendButton
                    disabled={!inputValue.trim()}
                    onClick={handleSendMessage}
                  >
                    <Send size={16} />
                  </SendButton>
                </InputContainer>
              </ChatInput>
            </ChatBody>
          )}
        </ChatWindow>
      </ChatbotContainer>
    </>
  );
};

export default EvieChatbot;
