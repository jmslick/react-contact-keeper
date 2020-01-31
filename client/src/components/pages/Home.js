import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  /**
   * load user upon component load:
   * call the backend, load the user,
   * put the value into state.
   */
  const authContext = useContext(AuthContext);

  /**
   * Want this to run only when component loads so put a pair of empty brackets.
   * Now it's going to complain about dependencies but we don't want to put load user as a dependency.
   * es-lint-disable-next-line
   * */
  useEffect(() => {
    authContext.loadUser();
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
