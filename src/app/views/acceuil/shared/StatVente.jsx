import {
  Box,
  Card,
  MenuItem,
  Select,
  styled,
  useTheme,
} from '@mui/material';

import ReactEcharts from 'echarts-for-react';

import * as Util from 'app/functions/Util';

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));


const StatVente = ({ height, color = [], site }) => {
  const theme = useTheme();

  const option = {
    grid: { top: '10%', bottom: '10%', left: '5%', right: '5%' },
    legend: {
      itemGap: 20,
      icon: 'circle',
      textStyle: {
        fontSize: 13,
        color: theme.palette.text.secondary,
        fontFamily: theme.typography.fontFamily
      }
    },
    label: {
      fontSize: 13,
      color: theme.palette.text.secondary,
      fontFamily: theme.typography.fontFamily
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        fontFamily: 'roboto',
        color: theme.palette.text.secondary
      }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 }
      },
      axisLabel: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: 'roboto' }
    },
    series: [
      Util.getStatVenteDataOfYear(site?.statVente, 2023),
      Util.getStatVenteDataOfYear(site?.statVente, 2024),
    ]
  };

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Commission mensuel</Title>
        <SubTitle>(en Ariary)</SubTitle>
        <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">2024</MenuItem>
          <MenuItem value="last_month">2023</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto" sx={{ pl: '20px' }}>
        <ReactEcharts style={{ height: height, width: '100%' }} option={{ ...option, color: [...color] }} />
      </Box>
    </Card>
  );
};

export default StatVente;
