import React from 'react';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import FormListModels from './FormListModels';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppListeModels = () => {
  const token = localStorage.getItem('token');
  if (token === null) {
    window.location.href = '/session/signin';
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Voiture', path: '/listesmodels' }, { name: 'Models' }]}
        />
      </Box>
      <SimpleCard title="Recherche des models par marque ">
        <FormListModels />
      </SimpleCard>
    </Container>
  );
};

export default AppListeModels;
