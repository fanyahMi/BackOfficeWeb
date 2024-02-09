import React from 'react';
import { useTheme } from '@mui/material';
import ReactEcharts from 'echarts-for-react';

import * as Util from 'app/functions/Util';

const DoughnutChart = ({ height, color = [], site }) => {
  const theme = useTheme();

  if (!site) {
    console.log('null le ');
    return null;
  }

  const option = {
    legend: {
      show: true,
      itemGap: 20,
      icon: 'circle',
      bottom: 0,
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 13,
        fontFamily: 'roboto'
      }
    },
    tooltip: {
      show: false,
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    xAxis: [
      {
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],

    series: [
      {
        name: 'Traffic Rate',
        type: 'pie',
        radius: ['45%', '72.55%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: 'center', // shows the description data to center, turn off to show in right side
            textStyle: {
              color: theme.palette.text.secondary,
              fontSize: 13,
              fontFamily: 'roboto'
            },
            formatter: '{a}'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '14',
              fontWeight: 'normal'
              // color: "rgba(15, 21, 77, 1)"
            },
            formatter: '{b} \n{c} ({d}%)'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: Util.getStatAnnonceDataOfMonth(site?.statAnnonce, 2),
            name: 'Valide'
          },
          {
            value: Util.getStatAnnonceDataOfMonth(site?.statAnnonce, 3),
            name: 'Vendu'
          },
          { value: Util.getStatAnnonceDataOfMonth(site?.statAnnonce, 1), name: 'Autre' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <div>
      {/* #{site?.statAnnonce?.[0]?.statut} */}
      <ReactEcharts
        style={{ height: height }}
        option={{
          ...option,
          color: [...color]
        }}
      />
    </div>
  );
};

export default DoughnutChart;
