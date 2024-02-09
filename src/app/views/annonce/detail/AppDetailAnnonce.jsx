import { Box, Stack, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import DetailSupp from './DetailSupp';
import BasicDetailCards from './BasicDetailCards';
import DetailTable from './DetailTable';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Api from 'app/functions/Api';
import LoadingIndicator from 'app/components/LoadingIndicator';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppDetailAnnonce = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const annonce_id = searchParams.get(`annonce_id`);
  const [loading, setLoading] = useState(true);
  const [annonce, setAnnonce] = useState({});

  useEffect(() => {
    const fetchAnnonce = async () => {
      const response = await Api.fetch(
        `https://wscloudfinal-production.up.railway.app/api/v1/annonces/${annonce_id}`,
        'GET',
        {
          'Content-Type': 'application/json'
        }
      );

      setAnnonce(response.data);
      setLoading(false);
    };

    fetchAnnonce();
  }, [annonce_id]);

  return (
    <>
      {loading ? (
        <LoadingIndicator loading={loading} />
      ) : (
        <Container>
          <Box className="breadcrumb">
            <Breadcrumb
              routeSegments={[
                { name: 'Detail annonce', path: '/annonces' },
                { name: 'Detail Annonce' }
              ]}
            />
          </Box>

          <Stack spacing={3}>
            <BasicDetailCards annonce={annonce} />
          </Stack>

          <Stack spacing={3}>
            <SimpleCard title="basic">
              <DetailTable annonce={annonce} />
            </SimpleCard>
          </Stack>
          <br />

          <Stack spacing={3} className="">
            <DetailSupp annonce={annonce} />
          </Stack>
        </Container>
      )}
    </>
  );
};

export default AppDetailAnnonce;
