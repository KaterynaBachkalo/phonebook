import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';
import ContactItem from 'components/ContactItem';
import {
  selectIsLoading,
  selectVisibleContacts,
} from 'redux/contacts/selectors';
import { Loader } from 'components/Loader';
import { List, Typography } from '@mui/material';

const ContactList = () => {
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = useSelector(selectVisibleContacts);

  return (
    <List sx={{ width: '100%', maxWidth: 650, margin: 'auto' }}>
      {isLoading && <Loader />}

      {!isLoading && filteredContacts.length === 0 && (
        <Typography
          variant="h3"
          fontSize="20px"
          marginLeft={2}
          fontWeight={600}
          color="#000"
          textAlign="center"
          margin="60px 0 20px"
        >
          There are no contacts in your phonebook :(
        </Typography>
      )}
      {!isLoading && filteredContacts.length > 0 && (
        <Typography
          variant="h3"
          fontSize="20px"
          marginLeft={2}
          fontWeight={700}
          color="#000"
          textAlign="center"
          margin="20px 0 20px"
        >
          You have {filteredContacts.length} contacts
        </Typography>
      )}
      {!isLoading &&
        filteredContacts?.map(({ name, id, phone }) => (
          <ContactItem
            name={name}
            id={id}
            key={id}
            phone={phone}
            deleteContact={onDeleteContact}
          />
        ))}
    </List>
  );
};

export default ContactList;
