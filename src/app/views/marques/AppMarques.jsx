import { useState } from 'react';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import FormMarque from './FormMarque';
import TableMarque from './TableMarque';
import { useLocation } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppMarques = () => {
  const token = localStorage.getItem('token');
  if (token === null) {
    window.location.href = '/session/signin';
  }
  const [selectedMarque, setSelectedMarque] = useState('');
  const [selectedMarqueId, setSelectedMarqueId] = useState('');
  const handleEditMarque = (marque, marqueId) => {
    setSelectedMarque(marque);
    setSelectedMarqueId(marqueId);
  };

  const [refreshTable, setRefreshTable] = useState(false);
  const handleRefreshTable = () => {
    setRefreshTable(!refreshTable);
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categorieId = searchParams.get('categorie_id');
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Voiture', path: '/marques' }, { name: 'Marque' }]} />
      </Box>

      <SimpleCard
        title={
          selectedMarque
            ? `Modifie la marque : ${selectedMarque}`
            : 'Ajout de nouvelle marque de voiture'
        }
      >
        <FormMarque
          selectedMarque={selectedMarque}
          selectedMarqueId={selectedMarqueId}
          onFormSubmitSuccess={handleRefreshTable}
        />
      </SimpleCard>
      <Box py="12px" />
      <SimpleCard title="Liste marques">
        <TableMarque
          onEditMarque={handleEditMarque}
          selectedMarque={selectedMarque}
          selectedMarqueId={selectedMarqueId}
          onFormSubmitSuccess={handleRefreshTable}
          refreshTable={refreshTable}
          categorieId={categorieId}
        />
      </SimpleCard>
    </Container>
  );
};

export default AppMarques;
