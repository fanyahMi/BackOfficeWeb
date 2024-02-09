import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import SimpleTable from './SimpleTable';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppTable = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Annonce', path: '/public/annonces' }, { name: 'Liste annonce' }]}
        />
      </Box>

      <SimpleCard title="Les annonces">
        <SimpleTable />
      </SimpleCard>
    </Container>
  );
};

export default AppTable;
