import { useState } from 'react';

import Form from './Form';
import Section from './Section';
import Filtration from './Filtration';
import Contacts from './Contacts';

import { MAIN_WRAPPER } from './App.styled';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = data => {
    const findName = contacts.find(contact => contact.name === data.name);
    if (findName) {
      alert(`${data.name} is already in your contacts list`);
      return;
    }
    setContacts(prevState => [...prevState, data]);
  };

  const handleFilterInput = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleDeleteContact = deleteId => {
    const newContacts = contacts.filter(({ id }) => deleteId !== id);
    setContacts(newContacts);
  };

  const identicFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(identicFilter)
  );

  return (
    <MAIN_WRAPPER>
      <Section title={'PhoneBook'}>
        <Form onSubmit={formSubmitHandler} />
      </Section>

      <Section title={'Contacts'}>
        <Filtration filter={filter} onFilterHandle={handleFilterInput} />
        <Contacts
          contacts={filter ? filteredContacts : contacts}
          onDeleteContact={handleDeleteContact}
        />
      </Section>
    </MAIN_WRAPPER>
  );
}
