import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Icon } from '../img/search.svg';
import { setFilter } from 'redux/contacts/filterSlice';
import { selectFilter } from 'redux/contacts/selectors';
import { Box, InputAdornment, TextField } from '@mui/material';

const Filter = () => {
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  const filterChange = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <TextField
          id="input-filter"
          type="text"
          name="filter"
          value={filter}
          onChange={filterChange}
          label="Find contact by name"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: '400px',
          }}
        />
      </Box>
    </>
  );
};

export default Filter;
