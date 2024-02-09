import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import FormComission from './FormComission';
import TableComission from './TableComission';
import { useState } from 'react';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppCommission = () => {
  const [refreshTable, setRefreshTable] = useState(false);
  const token = sessionStorage.getItem('token');
  if (token === null) {
    window.location.href = '/session/signin';
  }
  const handleRefreshTable = () => {
    setRefreshTable(!refreshTable);
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Commission', path: '/comission' }, { name: 'Commission' }]}
        />
      </Box>
      <SimpleCard title="Ajoutée de nouvelle commission">
        <FormComission onFormSubmitSuccess={handleRefreshTable} />
      </SimpleCard>
      <Box py="12px" />
      <SimpleCard title="Historique commission">
        <TableComission refreshTable={refreshTable} />
      </SimpleCard>
    </Container>
  );
};

export default AppCommission;
