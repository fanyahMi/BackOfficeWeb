import { CircularProgress, Card, Grid, styled, useTheme, Box } from '@mui/material';
import { Fragment } from 'react';
import DoughnutChart from './shared/Doughnut';
import StatCards from './shared/StatCards';
import StatVente from './shared/StatVente';
import UpgradeCard from './shared/UpgradeCard';
import ListVente from './shared/ListVente';
import { SimpleCard } from 'app/components';

import { useState, useEffect } from 'react';
import Api from 'app/functions/Api';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' }
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize'
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary
}));

const Analytics = () => {
  const { palette } = useTheme();
  const [site, setSite] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStat = async () => {
      try {
        const response = await Api.fetch(
          'https://vehiculeback.onrender.com/api/v1/statistique',
          'GET',
          {
            'Content-Type': 'application/json'
          }
        );

        setSite(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false);
      }
    };

    fetchStat();
  }, []);

  return (
    <Fragment>
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
        <ContentBox className="analytics">
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <StatCards site={site} />
              <StatVente
                height="350px"
                color={[palette.primary.main, palette.primary.light]}
                site={site}
              />
            </Grid>

            <Grid container item lg={12} md={12} sm={12} xs={12}>
              <Grid item xs={12} md={8} key={1}>
                <UpgradeCard />
              </Grid>

              <Grid item xs={12} md={4} key={2}>
                <Card sx={{ p: 2, ml: 2 }}>
                  <Title>Les annonces</Title>
                  <SubTitle>(Ce mois-ci)</SubTitle>

                  <DoughnutChart
                    height="242px"
                    color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
                    site={site}
                  />
                </Card>
              </Grid>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <SimpleCard className="mb-0" title="#Top vente">
                <ListVente site={site} />
              </SimpleCard>
            </Grid>
          </Grid>
        </ContentBox>
      )}
    </Fragment>
  );
};

export default Analytics;
