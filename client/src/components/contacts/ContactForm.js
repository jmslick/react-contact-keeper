import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import { set } from 'mongoose';

const ContactForm = () => {
  // using context as a hook to get access to methods and state.
  const contactContext = useContext(ContactContext);

  const { addContact, clearCurrent, updateContact, current } = contactContext;

  // useEffect hook tells React that component needs to do something after render.
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      // clear it
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]); // only run the effect when these objects have changed
  /**
   * Without [contactContext, current] will get this warning:
   * React Hook useEffect contains a call to 'setContact'. Without a list of dependencies,
   * this can lead to an infinite chain of updates. To fix this, pass [current] as a second
   * argument to the useEffect Hook
   */

  // contact is the state of the form
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const { name, email, phone, type } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact); // in ContactState.js
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit ' : 'Add '}Contact</h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      {'     '}
      Personal{'    '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />
      {'    '}
      Professional{'    '}
      <div>
        <input
          className='btn btn-primary btn-block'
          type='submit'
          value={current ? 'Update ' : 'Add '}
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
