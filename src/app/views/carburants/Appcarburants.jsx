import { useState } from 'react';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import FormCarburant from './FormCarburant';
import Tab from './Tab';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const Appcarburants = () => {
  const token = localStorage.getItem('token');
  if (token === null) {
    window.location.href = '/session/signin';
  }
  const [selectedCarburant, setSelectedCarburant] = useState('');
  const [selectedCarburantId, setSelectedCarburantId] = useState('');
  const handleEditCarburant = (carburant, carburantId) => {
    setSelectedCarburant(carburant);
    setSelectedCarburantId(carburantId);
  };
  const [refreshTable, setRefreshTable] = useState(false);
  const handleRefreshTable = () => {
    setRefreshTable(!refreshTable);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Voiture', path: '/Carburants' }, { name: 'Carburant' }]}
        />
      </Box>

      <SimpleCard
        title={
          selectedCarburant
            ? `Modifie la Carburant : ${selectedCarburant}`
            : 'Ajout de nouvelle Carburant de voiture'
        }
      >
        <FormCarburant
          selectedCarburant={selectedCarburant}
          selectedCarburantId={selectedCarburantId}
          onFormSubmitSuccess={handleRefreshTable}
        />
      </SimpleCard>
      <Box py="12px" />
      <SimpleCard title="Liste Carburants">
        <Tab
          onEditCarburant={handleEditCarburant}
          onFormSubmitSuccess={handleRefreshTable}
          refreshTable={refreshTable}
        />
      </SimpleCard>
    </Container>
  );
};

export default Appcarburants;
