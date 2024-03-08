import React from 'react';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/contacts/operations';
import { Container, Typography } from '@mui/material';

const ContactsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <Container
      sx={{
        py: '120px',
      }}
    >
      <ContactForm />

      <Typography
        variant="h2"
        fontSize="30px"
        marginLeft={2}
        fontWeight={700}
        color="#000"
        textAlign="center"
        margin="60px 0 20px"
      >
        My contacts
      </Typography>
      <Filter />

      <ContactList />
    </Container>
  );
};

export default ContactsPage;
