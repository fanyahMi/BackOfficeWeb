import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingIndicator = ({ loading, children }) => {
  return (
    <div>
      {loading ? (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999
          }}
        >
          <CircularProgress className="circleProgress" />
        </Box>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default LoadingIndicator;
