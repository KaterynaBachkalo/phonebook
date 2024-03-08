import { useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import { addContact } from 'redux/contacts/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/selectors';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const contacts = useSelector(selectContacts);

  const dispatch = useDispatch();

  const onSubmit = newContacts => {
    const isExistContactName = contacts?.some(
      contact => newContacts.name === contact.name
    );

    if (isExistContactName) {
      toast.warn(`${newContacts.name} is already in contacts`, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }

    dispatch(addContact(newContacts));
    reset();
  };

  return (
    <Box
      component="form"
      sx={{
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        padding: '0',
        gap: '10px',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        required
        id="standard-name-input"
        label="Name"
        type="name"
        autoComplete="current-name"
        sx={{
          bgcolor: 'transparent',
        }}
        variant="standard"
        {...register('name', {
          minLength: {
            value: 3,
            message: 'Minimum length should be 3',
          },
        })}
      />
      {errors.name && <p>{errors.name.message}</p>}

      <TextField
        required
        id="standard-number-input"
        label="Number"
        type="text"
        autoComplete="current-number"
        sx={{
          bgcolor: 'transparent',
        }}
        variant="standard"
        {...register('number', {
          minLength: {
            value: 6,
            message: 'Minimum length should be 6',
          },
          // maxLength: {
          //   value: 10,
          //   message: 'Maximum length should be 10',
          // },
        })}
      />
      {errors.number && <p>{errors.number.message}</p>}

      <Button
        variant="outlined"
        endIcon={<PersonAddIcon />}
        type="submit"
        sx={{
          fontSize: '20px',
          fontWeight: '700',
        }}
      >
        Add contact
      </Button>
    </Box>
  );
};

export default ContactForm;
