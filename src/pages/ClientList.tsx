import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical, 
  Send, 
  Eye, 
  Phone, 
  Mail,
  ChevronDown,
  ChevronUp,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Edit,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock3,
  X,
  Copy,
  ExternalLink
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { colors, spacing, borderRadius, shadows, typography } from '../styles/design-system';

const ClientListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
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

const HeaderActions = styled.div`
  display: flex;
  gap: ${spacing[3]};
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
      border-color: ${colors.everlyOrange};
      box-shadow: 0 0 0 3px ${colors.everlyOrange}15;
    }
  `}
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: ${spacing[4]};
  margin-top: ${spacing[4]};
  margin-bottom: ${spacing[4]};
  flex-wrap: wrap;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${spacing[4]};
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.textSecondary};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${spacing[3]} ${spacing[4]} ${spacing[3]} ${spacing[12]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 3px ${colors.everlyCherry}20;
  }
`;

const FilterSelect = styled.select`
  padding: ${spacing[3]} ${spacing[4]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  font-size: 14px;
  background: ${colors.white};
  cursor: pointer;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 3px ${colors.everlyCherry}20;
  }
`;

const MultiSelectDropdown = styled.div`
  position: relative;
  min-width: 200px;
`;

const MultiSelectButton = styled.button`
  width: 100%;
  padding: ${spacing[3]} ${spacing[4]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  font-size: 14px;
  background: ${colors.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 3px ${colors.everlyCherry}20;
  }

  &:hover {
    border-color: ${colors.everlyCherry};
  }
`;

const MultiSelectDropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.lg};
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease;
`;

const MultiSelectOption = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[4]};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    background: ${colors.lightGray};
  }
`;

const MultiSelectCheckbox = styled.input`
  margin: 0;
`;

const SelectAllButton = styled.button`
  width: 100%;
  padding: ${spacing[2]} ${spacing[4]};
  background: ${colors.lightGray};
  border: none;
  border-bottom: 1px solid ${colors.border};
  font-size: 12px;
  font-weight: 500;
  color: ${colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.border};
    color: ${colors.textPrimary};
  }
`;

const TableContainer = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.base};
  border: 1px solid ${colors.border};
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  
  th {
    padding: ${spacing[4]} ${spacing[6]};
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: ${colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
    background: ${colors.lightGray};
    border-bottom: 1px solid ${colors.border};
    position: relative;
    white-space: nowrap;

    &:hover {
      background: ${colors.border};
    }

    &.sortable {
      display: flex;
      align-items: center;
      gap: ${spacing[2]};
    }
  }
  
  td {
    padding: ${spacing[4]} ${spacing[6]};
    vertical-align: middle;
    border-bottom: 1px solid ${colors.border};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  tr {
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: ${colors.lightGray};
    }

    &:last-child td {
      border-bottom: none;
    }
  }
  
  /* Column widths */
  th:nth-child(1), td:nth-child(1) { width: 25%; } /* Client */
  th:nth-child(2), td:nth-child(2) { width: 12%; } /* Protection Score */
  th:nth-child(3), td:nth-child(3) { width: 12%; } /* Coverage Gap */
  th:nth-child(4), td:nth-child(4) { width: 15%; } /* Status */
  th:nth-child(5), td:nth-child(5) { width: 12%; } /* Report */
  th:nth-child(6), td:nth-child(6) { width: 14%; } /* Last Contact */
  th:nth-child(7), td:nth-child(7) { width: 10%; } /* Actions */
`;

const TableHeader = styled.thead`
  background: ${colors.lightGray};
`;

const TableHeaderRow = styled.tr`
  border-bottom: 1px solid ${colors.border};
`;

const TableHeaderCell = styled.th`
  padding: ${spacing[4]} ${spacing[6]};
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: ${colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    background: ${colors.border};
  }

  &.sortable {
    display: flex;
    align-items: center;
    gap: ${spacing[2]};
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid ${colors.border};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.lightGray};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: ${spacing[4]} ${spacing[6]};
  vertical-align: middle;
  min-width: 0; /* Allow content to shrink */
  overflow: hidden; /* Prevent content overflow */
`;

// Comprehensive table cell component for CSS Grid
const GridCell = styled.div`
  padding: ${spacing[4]};
  border-bottom: 1px solid ${colors.border};
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  min-width: 0; /* Allow content to shrink */
  overflow: hidden; /* Prevent content overflow */
  
  &:hover {
    background: ${colors.lightGray};
  }
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  min-width: 0; /* Allow flex item to shrink below content size */
  width: 100%; /* Take full available width */
`;

const ClientAvatar = styled.div<{ score: number }>`
  width: 40px;
  height: 40px;
  min-width: 40px; /* Prevent shrinking below 40px */
  min-height: 40px; /* Prevent shrinking below 40px */
  max-width: 40px; /* Prevent growing above 40px */
  max-height: 40px; /* Prevent growing above 40px */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: ${colors.white};
  background: ${props => {
    if (props.score >= 80) return colors.success;
    if (props.score >= 60) return colors.warning;
    return colors.error;
  }};
  flex-shrink: 0; /* Prevent the avatar from shrinking */
  flex-grow: 0; /* Prevent the avatar from growing */
  aspect-ratio: 1; /* Maintain perfect circle */
  box-sizing: border-box; /* Include padding/border in size calculations */
`;

const ClientDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
  min-width: 0; /* Allow text to truncate */
  flex: 1; /* Take remaining space */
`;

const ClientName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClientEmail = styled.div`
  font-size: 12px;
  color: ${colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProtectionScoreDisplay = styled.div<{ score: number }>`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  font-size: 14px;
  font-weight: 600;
  color: ${props => {
    if (props.score >= 80) return colors.success;
    if (props.score >= 60) return colors.warning;
    return colors.error;
  }};
`;

const CoverageGapDisplay = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textPrimary};
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1]};
  padding: ${spacing[1]} ${spacing[3]};
  border-radius: ${borderRadius.full};
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;

  ${props => {
    switch (props.status) {
      case 'new-lead':
        return `
          background: ${colors.info}20;
          color: ${colors.info};
        `;
      case 'assessment-sent':
        return `
          background: ${colors.warning}20;
          color: ${colors.warning};
        `;
      case 'report-ready':
        return `
          background: ${colors.everlyCherry}20;
          color: ${colors.everlyCherry};
        `;
      case 'follow-up-needed':
        return `
          background: ${colors.error}20;
          color: ${colors.error};
        `;
      case 'application-started':
        return `
          background: ${colors.success}20;
          color: ${colors.success};
        `;
      default:
        return `
          background: ${colors.lightGray};
          color: ${colors.textSecondary};
        `;
    }
  }}
`;

const StatusSelect = styled.select<{ status: string }>`
  padding: ${spacing[1]} ${spacing[3]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.full};
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  cursor: pointer;
  background: ${props => {
    switch (props.status) {
      case 'new-lead':
        return `${colors.info}20`;
      case 'assessment-sent':
        return `${colors.warning}20`;
      case 'report-ready':
        return `${colors.everlyCherry}20`;
      case 'follow-up-needed':
        return `${colors.error}20`;
      case 'application-started':
        return `${colors.success}20`;
      default:
        return colors.lightGray;
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'new-lead':
        return colors.info;
      case 'assessment-sent':
        return colors.warning;
      case 'report-ready':
        return colors.everlyCherry;
      case 'follow-up-needed':
        return colors.error;
      case 'application-started':
        return colors.success;
      default:
        return colors.textSecondary;
    }
  }};

  &:focus {
    outline: none;
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 2px ${colors.everlyCherry}20;
  }
`;

const ReportStatus = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  font-size: 14px;
  font-weight: 500;

  ${props => {
    switch (props.status) {
      case 'completed':
        return `color: ${colors.success};`;
      case 'pending':
        return `color: ${colors.warning};`;
      default:
        return `color: ${colors.textLight};`;
    }
  }}
`;

const LastContact = styled.div`
  font-size: 12px;
  color: ${colors.textSecondary};
  line-height: 1.4;
`;

const EditableContact = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  cursor: pointer;
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.base};
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.lightGray};
  }
`;

const ContactText = styled.span`
  font-size: 12px;
  color: ${colors.textSecondary};
`;

const EditIcon = styled(Edit)`
  width: 12px;
  height: 12px;
  color: ${colors.textLight};
  opacity: 0;
  transition: opacity 0.2s ease;

  ${EditableContact}:hover & {
    opacity: 1;
  }
`;

const ActionsCell = styled.div`
  display: flex;
  gap: ${spacing[2]};
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  overflow: visible;
  padding: 0 ${spacing[1]};
`;

const ActionIcon = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  border-radius: ${borderRadius.base};
  background: ${colors.lightGray};
  color: ${colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: ${colors.everlyCherry};
    color: ${colors.white};
  }
`;

// Send Assessment Popup Components
const AssessmentPopup = styled.div`
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

const AssessmentPopupContent = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.xl};
  box-shadow: ${shadows.xl};
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const AssessmentPopupHeader = styled.div`
  padding: ${spacing[6]} ${spacing[6]} ${spacing[4]};
  border-bottom: 1px solid ${colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AssessmentPopupTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0;
`;

const AssessmentCloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.textSecondary};
  cursor: pointer;
  padding: ${spacing[2]};
  border-radius: ${borderRadius.base};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.lightGray};
    color: ${colors.textPrimary};
  }
`;

const AssessmentPopupBody = styled.div`
  padding: ${spacing[2]} ${spacing[6]} ${spacing[6]} ${spacing[6]};
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const AssessmentLinkLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing[3]};
  display: block;
`;


const AssessmentDescription = styled.p`
  font-size: 14px;
  color: ${colors.textSecondary};
  line-height: 1.6;
  margin: 0 0 ${spacing[6]} 0;
`;

const AssessmentActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  width: 100%;
`;

const AssessmentActionButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};
  padding: ${spacing[4]} ${spacing[6]};
  border-radius: ${borderRadius.base};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${colors.white};
  color: ${colors.textPrimary};
  width: 100%;
  box-sizing: border-box;

  ${props => props.variant === 'primary' ? `
    border: 2px solid ${colors.everlyOrange};

    &:hover {
      background: ${colors.everlyOrange};
      color: ${colors.white};
      transform: translateY(-1px);
      box-shadow: ${shadows.md};
    }
  ` : `
    border: 2px solid ${colors.everlyCherry};

    &:hover {
      background: ${colors.everlyCherry};
      color: ${colors.white};
    }
  `}
`;

const CallPopup = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.2s ease;
`;

const CallPopupContent = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.lg};
  padding: ${spacing[6]};
  box-shadow: ${shadows.xl};
  border: 1px solid ${colors.border};
  max-width: 480px;
  width: 90%;
  overflow: visible;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CallPopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing[5]};
`;

const CallPopupTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0;
`;

const CloseButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: ${colors.lightGray};
  border-radius: 50%;
  color: ${colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: absolute;
  top: ${spacing[4]};
  right: ${spacing[4]};

  &:hover {
    background: ${colors.border};
    color: ${colors.textPrimary};
  }
`;

const CallPopupClientInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[5]};
`;

const ClientInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
`;

const ClientInfoLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textSecondary};
`;

const ClientInfoValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.textPrimary};
`;

const PhoneNumber = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.everlyCherry};
  background: ${colors.everlyCherry}10;
  padding: ${spacing[2]} ${spacing[3]};
  border-radius: ${borderRadius.lg};
  border: 2px solid ${colors.everlyCherry}20;
  text-align: center;
`;

const SalesScriptsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
`;

const SalesScriptsTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0;
`;

const SalesScriptsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[3]};
`;

const SalesScriptButton = styled.button<{ variant: 'orange' | 'cherry' }>`
  padding: ${spacing[3]} ${spacing[4]};
  background: ${colors.white};
  border: 2px solid ${props => props.variant === 'orange' ? colors.everlyOrange : colors.everlyCherry};
  border-radius: ${borderRadius.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: ${props => props.variant === 'orange' ? colors.everlyOrange : colors.everlyCherry};
    transform: translateY(-1px);
    box-shadow: ${shadows.md};
  }
`;

const SalesScriptTitle = styled.div<{ variant: 'orange' | 'cherry' }>`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing[1]};
  transition: color 0.2s ease;

  ${SalesScriptButton}:hover & {
    color: ${colors.white};
  }
`;

const SalesScriptDescription = styled.div<{ variant: 'orange' | 'cherry' }>`
  font-size: 12px;
  color: ${colors.textSecondary};
  line-height: 1.4;
  transition: color 0.2s ease;

  ${SalesScriptButton}:hover & {
    color: ${colors.white}90;
  }
`;

const CallCompletedButton = styled.button`
  align-self: flex-end;
  padding: ${spacing[2]} ${spacing[4]};
  background: ${colors.white};
  border: 2px solid ${colors.success}30;
  border-radius: ${borderRadius.lg};
  color: ${colors.textPrimary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
  margin-top: ${spacing[4]};

  &:hover {
    background: ${colors.success};
    color: ${colors.white};
    transform: translateY(-1px);
    box-shadow: ${shadows.md};
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  padding: ${spacing[6]};
  border-top: 1px solid ${colors.border};
  background: ${colors.lightGray};
`;

const PaginationInfo = styled.div`
  font-size: 14px;
  color: ${colors.textSecondary};
`;

const PaginationControls = styled.div`
  display: flex;
  gap: ${spacing[2]};
`;

const PaginationButton = styled.button<{ active?: boolean; disabled?: boolean }>`
  padding: ${spacing[2]} ${spacing[3]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.base};
  background: ${props => props.active ? colors.everlyCherry : colors.white};
  color: ${props => props.active ? colors.white : props.disabled ? colors.textLight : colors.textPrimary};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${props => props.active ? '#A0005A' : colors.lightGray};
  }
`;

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  protectionScore: number;
  coverageGap: number;
  status: 'new-lead' | 'assessment-sent' | 'report-ready' | 'follow-up-needed' | 'application-started' | 'protected';
  lastContact: string;
  reportStatus: 'not-started' | 'pending' | 'completed';
  applicationStatus: 'not-started' | 'in-progress' | 'completed';
}

const ClientList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [scoreFilters, setScoreFilters] = useState<string[]>([]);
  const [sortField, setSortField] = useState<keyof Client>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingStatus, setEditingStatus] = useState<string | null>(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [scoreDropdownOpen, setScoreDropdownOpen] = useState(false);
  const [callPopupOpen, setCallPopupOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [assessmentPopupOpen, setAssessmentPopupOpen] = useState(false);
  const [assessmentClient, setAssessmentClient] = useState<Client | null>(null);
  const itemsPerPage = 10;

  // Initialize filters from URL parameters
  useEffect(() => {
    const statusParam = searchParams.get('status');
    if (statusParam) {
      setStatusFilters(statusParam.split(','));
    }
  }, [searchParams]);

  // Enhanced mock data with comprehensive CRM information
  const clients: Client[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      protectionScore: 45,
      coverageGap: 500000,
      status: 'assessment-sent',
      lastContact: 'Assessment form sent 9/21',
      reportStatus: 'pending',
      applicationStatus: 'not-started'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 234-5678',
      protectionScore: 78,
      coverageGap: 200000,
      status: 'report-ready',
      lastContact: 'Report generated 9/19',
      reportStatus: 'completed',
      applicationStatus: 'not-started'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 (555) 345-6789',
      protectionScore: 92,
      coverageGap: 0,
      status: 'protected',
      lastContact: 'No insurance need identified 9/18',
      reportStatus: 'completed',
      applicationStatus: 'not-started'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 456-7890',
      protectionScore: 23,
      coverageGap: 750000,
      status: 'new-lead',
      lastContact: 'Never contacted',
      reportStatus: 'not-started',
      applicationStatus: 'not-started'
    },
    {
      id: '5',
      name: 'Robert Wilson',
      email: 'robert.wilson@email.com',
      phone: '+1 (555) 567-8901',
      protectionScore: 67,
      coverageGap: 300000,
      status: 'follow-up-needed',
      lastContact: 'Phone call 9/15',
      reportStatus: 'completed',
      applicationStatus: 'not-started'
    },
    {
      id: '6',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@email.com',
      phone: '+1 (555) 678-9012',
      protectionScore: 15,
      coverageGap: 900000,
      status: 'application-started',
      lastContact: 'Application started 9/20',
      reportStatus: 'completed',
      applicationStatus: 'in-progress'
    },
    {
      id: '7',
      name: 'David Martinez',
      email: 'david.martinez@email.com',
      phone: '+1 (555) 789-0123',
      protectionScore: 85,
      coverageGap: 0,
      status: 'protected',
      lastContact: 'No insurance need identified 9/22',
      reportStatus: 'completed',
      applicationStatus: 'not-started'
    }
  ];

  const filteredAndSortedClients = useMemo(() => {
    let filtered = clients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilters.length === 0 || statusFilters.includes(client.status);
      
      const matchesScore = scoreFilters.length === 0 || scoreFilters.some(filter => {
        switch (filter) {
          case 'low': return client.protectionScore < 50;
          case 'medium': return client.protectionScore >= 50 && client.protectionScore < 80;
          case 'high': return client.protectionScore >= 80;
          default: return false;
        }
      });

      return matchesSearch && matchesStatus && matchesScore;
    });

    // Sort clients
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  }, [clients, searchTerm, statusFilters, scoreFilters, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredAndSortedClients.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: keyof Client) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleStatusChange = (clientId: string, newStatus: string) => {
    // In a real app, this would update the client status via API
    console.log(`Updating client ${clientId} status to ${newStatus}`);
    setEditingStatus(null);
  };

  const handleStatusFilterChange = (status: string, checked: boolean) => {
    if (checked) {
      setStatusFilters(prev => [...prev, status]);
    } else {
      setStatusFilters(prev => prev.filter(s => s !== status));
    }
  };

  const handleScoreFilterChange = (score: string, checked: boolean) => {
    if (checked) {
      setScoreFilters(prev => [...prev, score]);
    } else {
      setScoreFilters(prev => prev.filter(s => s !== score));
    }
  };

  const selectAllStatuses = () => {
    const allStatuses = ['new-lead', 'assessment-sent', 'report-ready', 'follow-up-needed', 'application-started', 'protected'];
    setStatusFilters(allStatuses);
  };

  const selectAllScores = () => {
    const allScores = ['low', 'medium', 'high'];
    setScoreFilters(allScores);
  };

  const clearAllStatuses = () => {
    setStatusFilters([]);
  };

  const clearAllScores = () => {
    setScoreFilters([]);
  };

  const handleCallClick = (client: Client) => {
    setSelectedClient(client);
    setCallPopupOpen(true);
  };

  const handleCloseCallPopup = () => {
    setCallPopupOpen(false);
    setSelectedClient(null);
  };

  const handleSalesScriptClick = (scriptType: string) => {
    // In a real app, this would open the sales script or integrate with a calling system
    console.log(`Opening ${scriptType} sales script for ${selectedClient?.name}`);
    // For now, just close the popup
    handleCloseCallPopup();
  };

  const handleCallCompleted = () => {
    if (selectedClient) {
      // In a real app, this would update the client's last contact date
      const today = new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
      console.log(`Marking call as completed for ${selectedClient.name} on ${today}`);
      // Update the client's last contact
      // This would typically be done via API call
    }
    handleCloseCallPopup();
  };

  // Assessment popup handlers
  const handleSendAssessmentClick = (client: Client) => {
    setAssessmentClient(client);
    setAssessmentPopupOpen(true);
  };

  const handleCloseAssessmentPopup = () => {
    setAssessmentPopupOpen(false);
    setAssessmentClient(null);
  };

  const handleCopyLink = () => {
    if (assessmentClient) {
      const assessmentLink = `https://everly-agent-platform.com/assessment/${assessmentClient.id}`;
      navigator.clipboard.writeText(assessmentLink);
    }
  };

  const handleEmailAssessment = () => {
    if (assessmentClient) {
      setAssessmentPopupOpen(false);
      // Navigate to communication page with assessment template
      navigate('/communication?template=assessment&clientId=' + assessmentClient.id);
    }
  };

  const handleCompleteAssessment = () => {
    if (assessmentClient) {
      setAssessmentPopupOpen(false);
      // Navigate to assessment form
      navigate(`/assessment/${assessmentClient.id}`);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-dropdown]')) {
        setStatusDropdownOpen(false);
        setScoreDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new-lead':
        return <Users size={12} />;
      case 'assessment-sent':
        return <Send size={12} />;
      case 'report-ready':
        return <FileText size={12} />;
      case 'follow-up-needed':
        return <AlertCircle size={12} />;
      case 'application-started':
        return <CheckCircle2 size={12} />;
      case 'protected':
        return <CheckCircle size={12} />;
      default:
        return <Clock3 size={12} />;
    }
  };

  const getReportIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={14} />;
      case 'pending':
        return <Clock size={14} />;
      default:
        return <XCircle size={14} />;
    }
  };

  return (
    <MainLayout currentPage="clients">
      <ClientListContainer>
        <PageHeader>
          <HeaderInfo>
            <PageTitle>Clients</PageTitle>
            <PageSubtitle>Manage your clients and track their life insurance journey</PageSubtitle>
          </HeaderInfo>
          <HeaderActions>
            <ActionButton variant="secondary">
              <Download size={16} />
              Export
            </ActionButton>
            <ActionButton variant="primary">
              <Plus size={16} />
              Add Client
            </ActionButton>
          </HeaderActions>
        </PageHeader>

        <FiltersContainer>
          <SearchContainer>
            <SearchIcon>
              <Search size={20} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search clients by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <MultiSelectDropdown data-dropdown>
            <MultiSelectButton onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}>
              <span>
                {statusFilters.length === 0 
                  ? 'All Statuses' 
                  : `${statusFilters.length} status${statusFilters.length > 1 ? 'es' : ''} selected`
                }
              </span>
              <ChevronDown size={16} />
            </MultiSelectButton>
            <MultiSelectDropdownMenu isOpen={statusDropdownOpen}>
              <SelectAllButton onClick={statusFilters.length === 6 ? clearAllStatuses : selectAllStatuses}>
                {statusFilters.length === 6 ? 'Clear All' : 'Select All Statuses'}
              </SelectAllButton>
              <MultiSelectOption>
                <MultiSelectCheckbox
                  type="checkbox"
                  checked={statusFilters.includes('new-lead')}
                  onChange={(e) => handleStatusFilterChange('new-lead', e.target.checked)}
                />
                New Lead
              </MultiSelectOption>
              <MultiSelectOption>
                <MultiSelectCheckbox
                  type="checkbox"
                  checked={statusFilters.includes('assessment-sent')}
                  onChange={(e) => handleStatusFilterChange('assessment-sent', e.target.checked)}
                />
                Assessment Sent
              </MultiSelectOption>
              <MultiSelectOption>
                <MultiSelectCheckbox
                  type="checkbox"
                  checked={statusFilters.includes('report-ready')}
                  onChange={(e) => handleStatusFilterChange('report-ready', e.target.checked)}
                />
                Report Ready
              </MultiSelectOption>
              <MultiSelectOption>
                <MultiSelectCheckbox
                  type="checkbox"
                  checked={statusFilters.includes('follow-up-needed')}
                  onChange={(e) => handleStatusFilterChange('follow-up-needed', e.target.checked)}
                />
                Follow-up Needed
              </MultiSelectOption>
              <MultiSelectOption>
                <MultiSelectCheckbox
                  type="checkbox"
                  checked={statusFilters.includes('application-started')}
                  onChange={(e) => handleStatusFilterChange('application-started', e.target.checked)}
                />
                Application Started
              </MultiSelectOption>
              <MultiSelectOption>
                <MultiSelectCheckbox
                  type="checkbox"
                  checked={statusFilters.includes('protected')}
                  onChange={(e) => handleStatusFilterChange('protected', e.target.checked)}
                />
                Protected (No Insurance Need)
              </MultiSelectOption>
            </MultiSelectDropdownMenu>
          </MultiSelectDropdown>

          <MultiSelectDropdown data-dropdown>
            <MultiSelectButton onClick={() => setScoreDropdownOpen(!scoreDropdownOpen)}>
              <span>
                {scoreFilters.length === 0 
                  ? 'All Protection Scores' 
                  : `${scoreFilters.length} score${scoreFilters.length > 1 ? 's' : ''} selected`
                }
              </span>
              <ChevronDown size={16} />
            </MultiSelectButton>
            <MultiSelectDropdownMenu isOpen={scoreDropdownOpen}>
              <SelectAllButton onClick={scoreFilters.length === 3 ? clearAllScores : selectAllScores}>
                {scoreFilters.length === 3 ? 'Clear All' : 'Select All Protection Scores'}
              </SelectAllButton>
              <MultiSelectOption>
                <MultiSelectCheckbox
                  type="checkbox"
                  checked={scoreFilters.includes('low')}
                  onChange={(e) => handleScoreFilterChange('low', e.target.checked)}
                />
                Low (0-49%)
              </MultiSelectOption>
              <MultiSelectOption>
                <MultiSelectCheckbox
                  type="checkbox"
                  checked={scoreFilters.includes('medium')}
                  onChange={(e) => handleScoreFilterChange('medium', e.target.checked)}
                />
                Medium (50-79%)
              </MultiSelectOption>
              <MultiSelectOption>
                <MultiSelectCheckbox
                  type="checkbox"
                  checked={scoreFilters.includes('high')}
                  onChange={(e) => handleScoreFilterChange('high', e.target.checked)}
                />
                High (80-100%)
              </MultiSelectOption>
            </MultiSelectDropdownMenu>
          </MultiSelectDropdown>
        </FiltersContainer>

        <TableContainer>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '22% 11% 11% 14% 11% 13% 18%',
            width: '100%',
            background: colors.white,
            border: `1px solid ${colors.border}`,
            borderRadius: borderRadius.lg,
            overflow: 'hidden',
            minWidth: 0, /* Allow grid to shrink */
            gridAutoRows: 'minmax(60px, auto)' /* Ensure minimum row height */
          }}>
            {/* Header Row */}
            <div style={{ 
              padding: spacing[4], 
              background: colors.lightGray, 
              borderBottom: `1px solid ${colors.border}`,
              fontSize: '12px',
              fontWeight: 600,
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              cursor: 'pointer'
            }} onClick={() => handleSort('name')}>
              Client
              {sortField === 'name' && (
                sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
              )}
            </div>
            <div style={{ 
              padding: spacing[4], 
              background: colors.lightGray, 
              borderBottom: `1px solid ${colors.border}`,
              fontSize: '12px',
              fontWeight: 600,
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              cursor: 'pointer'
            }} onClick={() => handleSort('protectionScore')}>
              Protection Score
              {sortField === 'protectionScore' && (
                sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
              )}
            </div>
            <div style={{ 
              padding: spacing[4], 
              background: colors.lightGray, 
              borderBottom: `1px solid ${colors.border}`,
              fontSize: '12px',
              fontWeight: 600,
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              cursor: 'pointer'
            }} onClick={() => handleSort('coverageGap')}>
              Coverage Gap
              {sortField === 'coverageGap' && (
                sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
              )}
            </div>
            <div style={{ 
              padding: spacing[4], 
              background: colors.lightGray, 
              borderBottom: `1px solid ${colors.border}`,
              fontSize: '12px',
              fontWeight: 600,
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Status
            </div>
            <div style={{ 
              padding: spacing[4], 
              background: colors.lightGray, 
              borderBottom: `1px solid ${colors.border}`,
              fontSize: '12px',
              fontWeight: 600,
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Report
            </div>
            <div style={{ 
              padding: spacing[4], 
              background: colors.lightGray, 
              borderBottom: `1px solid ${colors.border}`,
              fontSize: '12px',
              fontWeight: 600,
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              cursor: 'pointer'
            }} onClick={() => handleSort('lastContact')}>
              Last Contact
              {sortField === 'lastContact' && (
                sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
              )}
            </div>
            <div style={{ 
              padding: spacing[4], 
              background: colors.lightGray, 
              borderBottom: `1px solid ${colors.border}`,
              fontSize: '12px',
              fontWeight: 600,
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Actions
            </div>

            {/* Data Rows */}
            {paginatedClients.map((client) => (
              <React.Fragment key={client.id}>
                <div 
                  style={{ 
                    padding: spacing[4], 
                    borderBottom: `1px solid ${colors.border}`,
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 0, /* Allow content to shrink */
                    overflow: 'hidden' /* Prevent content overflow */
                  }}
                  onClick={() => navigate(`/clients/${client.id}`)}
                  onMouseEnter={(e) => e.currentTarget.style.background = colors.lightGray}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <ClientInfo>
                    <ClientAvatar score={client.protectionScore}>
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </ClientAvatar>
                    <ClientDetails>
                      <ClientName>{client.name}</ClientName>
                      <ClientEmail>{client.email}</ClientEmail>
                    </ClientDetails>
                  </ClientInfo>
                </div>
                <div 
                  style={{ 
                    padding: spacing[4], 
                    borderBottom: `1px solid ${colors.border}`,
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onClick={() => navigate(`/clients/${client.id}`)}
                  onMouseEnter={(e) => e.currentTarget.style.background = colors.lightGray}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <ProtectionScoreDisplay score={client.protectionScore}>
                    {client.protectionScore}%
                  </ProtectionScoreDisplay>
                </div>
                <div 
                  style={{ 
                    padding: spacing[4], 
                    borderBottom: `1px solid ${colors.border}`,
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onClick={() => navigate(`/clients/${client.id}`)}
                  onMouseEnter={(e) => e.currentTarget.style.background = colors.lightGray}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <CoverageGapDisplay>
                    {formatCurrency(client.coverageGap)}
                  </CoverageGapDisplay>
                </div>
                <div 
                  style={{ 
                    padding: spacing[4], 
                    borderBottom: `1px solid ${colors.border}`,
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onClick={() => navigate(`/clients/${client.id}`)}
                  onMouseEnter={(e) => e.currentTarget.style.background = colors.lightGray}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  {editingStatus === client.id ? (
                    <StatusSelect
                      status={client.status}
                      value={client.status}
                      onChange={(e) => handleStatusChange(client.id, e.target.value)}
                      onBlur={() => setEditingStatus(null)}
                      autoFocus
                    >
                      <option value="new-lead">New Lead</option>
                      <option value="assessment-sent">Assessment Sent</option>
                      <option value="report-ready">Report Ready</option>
                      <option value="follow-up-needed">Follow-up Needed</option>
                      <option value="application-started">Application Started</option>
                      <option value="protected">Protected (No Insurance Need)</option>
                    </StatusSelect>
                  ) : (
                    <StatusBadge 
                      status={client.status}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingStatus(client.id);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {getStatusIcon(client.status)}
                      {client.status === 'protected' ? 'Protected' : client.status.replace('-', ' ')}
                    </StatusBadge>
                  )}
                </div>
                <div 
                  style={{ 
                    padding: spacing[4], 
                    borderBottom: `1px solid ${colors.border}`,
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onClick={() => navigate(`/clients/${client.id}`)}
                  onMouseEnter={(e) => e.currentTarget.style.background = colors.lightGray}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  {client.status === 'protected' ? (
                    <ReportStatus status="completed">
                      {getReportIcon('completed')}
                      <span style={{ color: colors.textSecondary }}>
                        No Insurance Need
                      </span>
                    </ReportStatus>
                  ) : client.reportStatus === 'completed' ? (
                    <ReportStatus status={client.reportStatus}>
                      {getReportIcon(client.reportStatus)}
                      <span 
                        style={{ cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/report/${client.id}`);
                        }}
                      >
                        View Report
                      </span>
                    </ReportStatus>
                  ) : (
                    <ReportStatus status={client.reportStatus}>
                      {getReportIcon(client.reportStatus)}
                      {client.reportStatus === 'pending' ? 'Pending' : 'Not Started'}
                    </ReportStatus>
                  )}
                </div>
                <div 
                  style={{ 
                    padding: spacing[4], 
                    borderBottom: `1px solid ${colors.border}`,
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onClick={() => navigate(`/clients/${client.id}`)}
                  onMouseEnter={(e) => e.currentTarget.style.background = colors.lightGray}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <EditableContact>
                    <ContactText>{client.lastContact}</ContactText>
                    <EditIcon />
                  </EditableContact>
                </div>
                <div 
                  style={{ 
                    padding: spacing[4], 
                    borderBottom: `1px solid ${colors.border}`,
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onClick={() => navigate(`/clients/${client.id}`)}
                  onMouseEnter={(e) => e.currentTarget.style.background = colors.lightGray}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <ActionsCell>
                    <ActionIcon 
                      title="Send Assessment"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!['report-ready', 'follow-up-needed', 'application-started', 'protected'].includes(client.status)) {
                          handleSendAssessmentClick(client);
                        }
                      }}
                      style={{ 
                        opacity: !['report-ready', 'follow-up-needed', 'application-started', 'protected'].includes(client.status) ? 1 : 0.5,
                        cursor: !['report-ready', 'follow-up-needed', 'application-started', 'protected'].includes(client.status) ? 'pointer' : 'not-allowed'
                      }}
                    >
                      <Send size={14} />
                    </ActionIcon>
                    <ActionIcon 
                      title="View Report"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (client.reportStatus === 'completed' && client.status !== 'protected') {
                          navigate(`/report/${client.id}`);
                        }
                      }}
                      style={{ 
                        opacity: (client.reportStatus === 'completed' && client.status !== 'protected') ? 1 : 0.5,
                        cursor: (client.reportStatus === 'completed' && client.status !== 'protected') ? 'pointer' : 'not-allowed'
                      }}
                    >
                      <Eye size={14} />
                    </ActionIcon>
                    <ActionIcon 
                      title="Call Client"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCallClick(client);
                      }}
                    >
                      <Phone size={14} />
                    </ActionIcon>
                    <ActionIcon title="Email Client">
                      <Mail size={14} />
                    </ActionIcon>
                  </ActionsCell>
                </div>
              </React.Fragment>
            ))}
          </div>
        </TableContainer>

        <PaginationContainer>
          <PaginationInfo>
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAndSortedClients.length)} of {filteredAndSortedClients.length} clients
          </PaginationInfo>
          <PaginationControls>
            <PaginationButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </PaginationButton>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationButton
                key={page}
                active={currentPage === page}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationButton>
            ))}
            <PaginationButton
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </PaginationButton>
          </PaginationControls>
        </PaginationContainer>

        {/* Call Popup */}
        <CallPopup isOpen={callPopupOpen} onClick={handleCloseCallPopup}>
          <CallPopupContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseCallPopup}>
              <X size={14} />
            </CloseButton>
            
            <CallPopupHeader>
              <CallPopupTitle>Contact Info</CallPopupTitle>
            </CallPopupHeader>
            
            {selectedClient && (
              <>
                <CallPopupClientInfo>
                  <ClientInfoItem>
                    <ClientInfoLabel>Name</ClientInfoLabel>
                    <ClientInfoValue>{selectedClient.name}</ClientInfoValue>
                  </ClientInfoItem>
                  
                  <ClientInfoItem>
                    <ClientInfoLabel>Email</ClientInfoLabel>
                    <ClientInfoValue>{selectedClient.email}</ClientInfoValue>
                  </ClientInfoItem>
                  
                  <ClientInfoItem>
                    <ClientInfoLabel>Phone Number</ClientInfoLabel>
                    <PhoneNumber>{selectedClient.phone}</PhoneNumber>
                  </ClientInfoItem>
                </CallPopupClientInfo>

                <SalesScriptsSection>
                  <SalesScriptsTitle>Sales Scripts</SalesScriptsTitle>
                  <SalesScriptsGrid>
                    <SalesScriptButton 
                      variant="orange"
                      onClick={() => handleSalesScriptClick('assessment-follow-up')}
                    >
                      <SalesScriptTitle variant="orange">Assessment Follow-up</SalesScriptTitle>
                      <SalesScriptDescription variant="orange">
                        Script for following up on assessment completion and next steps
                      </SalesScriptDescription>
                    </SalesScriptButton>
                    
                    <SalesScriptButton 
                      variant="cherry"
                      onClick={() => handleSalesScriptClick('report-review')}
                    >
                      <SalesScriptTitle variant="cherry">Report Review</SalesScriptTitle>
                      <SalesScriptDescription variant="cherry">
                        Script for discussing life insurance report findings and recommendations
                      </SalesScriptDescription>
                    </SalesScriptButton>
                  </SalesScriptsGrid>
                </SalesScriptsSection>

                <CallCompletedButton onClick={handleCallCompleted}>
                  <CheckCircle size={16} />
                  Call Completed
                </CallCompletedButton>
              </>
            )}
          </CallPopupContent>
        </CallPopup>

        {/* Send Assessment Popup */}
        {assessmentPopupOpen && (
          <AssessmentPopup onClick={handleCloseAssessmentPopup}>
            <AssessmentPopupContent onClick={(e) => e.stopPropagation()}>
              <AssessmentPopupHeader>
                <AssessmentPopupTitle>Send Assessment</AssessmentPopupTitle>
                <AssessmentCloseButton onClick={handleCloseAssessmentPopup}>
                  <X size={20} />
                </AssessmentCloseButton>
              </AssessmentPopupHeader>
              
              <AssessmentPopupBody>
                <div>
                  <AssessmentLinkLabel>Shareable Assessment Link</AssessmentLinkLabel>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', paddingLeft: '16px' }}>
                    <input 
                      type="text" 
                      value={assessmentClient ? `https://everly-agent-platform.com/assessment/${assessmentClient.id}` : ''}
                      readOnly
                      style={{
                        flex: 1,
                        padding: '12px 0 12px 0',
                        background: '#f8f9fa',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontFamily: 'monospace'
                      }}
                    />
                    <button 
                      onClick={handleCopyLink}
                      style={{
                        background: '#FF6E1E',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Copy size={14} />
                      Copy
                    </button>
                  </div>
                </div>

                <AssessmentDescription>
                  <strong>Email Assessment:</strong> Send this link to {assessmentClient?.name} so they can complete their life insurance needs assessment themselves. This allows them to fill out the form at their own pace and convenience.
                  <br /><br />
                  <strong>Complete Assessment:</strong> Fill out the assessment form yourself on behalf of {assessmentClient?.name} if you feel comfortable and confident with their information. This is helpful when clients prefer guidance or have complex situations.
                </AssessmentDescription>

                <AssessmentActions>
                  <AssessmentActionButton variant="secondary" onClick={handleEmailAssessment}>
                    <Mail size={18} />
                    Email Assessment
                  </AssessmentActionButton>
                  <AssessmentActionButton variant="primary" onClick={handleCompleteAssessment}>
                    <ExternalLink size={18} />
                    Complete Assessment
                  </AssessmentActionButton>
                </AssessmentActions>
              </AssessmentPopupBody>
            </AssessmentPopupContent>
          </AssessmentPopup>
        )}
      </ClientListContainer>
    </MainLayout>
  );
};

export default ClientList;
