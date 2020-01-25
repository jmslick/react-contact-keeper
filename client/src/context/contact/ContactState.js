import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Willy Makeit',
        email: 'willymakeit@gmail.com',
        phone: '111-111-1111',
        type: 'professional'
      },
      {
        id: 2,
        name: 'Betty Wont',
        email: 'bettywont@gmail.com',
        phone: '111-111-2222',
        type: 'professional'
      },
      {
        id: 3,
        name: 'Victor Analysis',
        email: 'victor@gmail.com',
        phone: '111-111-3333',
        type: 'professional'
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact

  // Delete Contact

  // set Current contact

  // Clear Current Contact

  // Update Contacdt

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        /**
         * 52.  anything that we want to be able to access from other components
         * including state and actions need to go in here.
         */
        contacts: state.contacts
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
