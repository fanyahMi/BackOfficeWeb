import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { useState, useEffect } from 'react';
import { logoutUser } from '../../../../deconnection';
import { useNavigate } from 'react-router-dom';
import MenuListeannee from './MenuListeannee';
const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const TableListeannee = ({ modelId }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const [refreshTable, setRefreshTable] = useState(false);
  const handleRefreshTable = () => {
    setRefreshTable(!refreshTable);
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseMaques = await fetch(
        `https://vehiculeback.onrender.com/api/v1/models/v1/details/${modelId}`,
        {
          method: 'GET',
          headers: new Headers({
            Authorization: `Bearer ${localStorage.getItem('token')}`
          })
        }
      );
      const jsonData = await responseMaques.json();
      if (jsonData.status_code === '200') {
        setData(jsonData.data);
      } else if (jsonData.status_code === '401') {
        const logoutResult = await logoutUser();
        if (logoutResult.success) {
          navigate('/session/signin');
        } else {
          console.error('Échec de la déconnexion:', logoutResult.message);
          alert(logoutResult.message);
        }
      } else {
        alert(jsonData.message);
      }
    };
    fetchData();
  }, [refreshTable, navigate, modelId]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center">Annee</TableCell>
            <TableCell align="left">Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cat, index) => (
            <TableRow key={index}>
              <TableCell align="center">{cat.annee}</TableCell>
              <TableCell align="left">
                <MenuListeannee
                  onFormSubmitSuccess={handleRefreshTable}
                  idanneesortie={JSON.stringify(cat.idAnneesortie)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={data.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
      />
    </Box>
  );
};

export default TableListeannee;
