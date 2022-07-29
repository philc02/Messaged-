import React, { createContext, ReactNode, useContext } from 'react'
import useLocalStore from '../hooks/useLocalStore';

const initValues = {
  contacts: [] as any,
  createContact: (id: string, name: string) => {}
}
const ContactsContext = createContext(initValues);

export const useContacts = () => useContext(ContactsContext);

export const ContactsProvider = ({ children} : { children: ReactNode | ReactNode[] }) => {
  const [contacts, setContacts] = useLocalStore('contacts', []);

  const createContact = (id: string, name: string) => {
    setContacts([...contacts, { id, name }]);
  }
  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  )
}
