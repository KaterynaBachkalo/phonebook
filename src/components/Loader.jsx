import { Box } from '@mui/material';
import { Vortex } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{ left: '50vw', top: '50vh' }}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
    </Box>
  );
};
