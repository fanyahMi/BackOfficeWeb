import { Box, styled, Table, TableBody, TableCell, TableRow } from '@mui/material';

import * as Util from 'app/functions/Util';

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const DetailTable = (props) => {
  const { annonce } = props;

  const subscribarList = [
    {
      title: 'Id',
      value: annonce.annonce_id
    },
    {
      title: 'Description',
      value: annonce.description
    },
    {
      title: 'Statut',
      value: Util.getStatus(annonce.statut)
    }
  ];

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableBody>
          {subscribarList.map((subscriber, index) => (
            <TableRow key={index}>
              <TableCell align="left" className="text-bold secondary">
                {subscriber.title}
              </TableCell>
              <TableCell align="right">{subscriber.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default DetailTable;
