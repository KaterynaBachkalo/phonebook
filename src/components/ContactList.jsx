import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';
import ContactItem from 'components/ContactItem';
import {
  selectIsLoading,
  selectVisibleContacts,
} from 'redux/contacts/selectors';
import { Loader } from 'components/Loader';
import { List } from '@mui/material';

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
        <p className="empty">There are no contacts in your phonebook.</p>
      )}
      {!isLoading && filteredContacts.length > 0 && (
        <p className="contacts">You have {filteredContacts.length} contacts.</p>
      )}
      {!isLoading &&
        filteredContacts?.map(({ name, id, number }) => (
          <ContactItem
            name={name}
            id={id}
            key={id}
            number={number}
            deleteContact={onDeleteContact}
          />
        ))}
    </List>
  );
};

export default ContactList;
