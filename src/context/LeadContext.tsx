import React, { createContext, useContext, useState } from 'react';

interface LeadContextType {
  isModalOpen: boolean;
  openModal: (source?: string) => void;
  closeModal: () => void;
  modalSource: string;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('Audit Request');

  const openModal = (source: string = 'Audit Request') => {
    setModalSource(source);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <LeadContext.Provider value={{ isModalOpen, openModal, closeModal, modalSource }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLead() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLead must be used within a LeadProvider');
  }
  return context;
}
