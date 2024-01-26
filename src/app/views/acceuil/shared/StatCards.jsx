import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';

import * as Util from 'app/functions/Util';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = (props) => {
  const { site } = props;
  // const cardList = [
  //   { name: 'Total Membres', amount: 3050, icon: 'group' },
  //   { name: 'Total Commissions', amount: 'Ar 1,800,500', icon: 'payment' },
  //   { name: 'Total Annonces', amount: '112', icon: 'public' },
  //   { name: 'Total Ventes', amount: '30', icon: 'shopping_cart' },
  // ];

  const cardList = [
    { name: 'Total Membres', amount: Util.formatNumber2(site.statEffectif?.total_utilisateur), icon: 'group' },
    { name: 'Total Commissions', amount: Util.formatNumber(site.statEffectif?.total_commission), icon: 'payment' },
    { name: 'Total Annonces', amount: Util.formatNumber2(site.statEffectif?.total_annonce), icon: 'public' },
    { name: 'Total Ventes', amount: Util.formatNumber2(site.statEffectif?.total_vente), icon: 'shopping_cart' },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {/* #{site.statEffectif?.total_utilisateur} */}
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
