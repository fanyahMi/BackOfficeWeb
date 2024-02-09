import React, { useState, useEffect } from 'react';
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
import { logoutUser } from '../../../deconnection';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from 'app/components/LoadingIndicator';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const TableComission = ({ refreshTable }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem('token');
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        const response = await fetch(
          'https://wscloudfinal-production.up.railway.app/api/admin/v1/comissions',
          {
            method: 'GET',
            headers: headers
          }
        );
        const jsonData = await response.json();
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

        setLoading(false); // Arrêtez le chargement après la récupération des données
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false); // Arrêtez le chargement en cas d'erreur
      }
    };
    fetchData();
  }, [refreshTable, navigate]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box width="100%" overflow="auto">
      <LoadingIndicator loading={loading}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left">Taux en % </TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cat, index) => (
              <TableRow key={index}>
                <TableCell align="left">{cat.taux}</TableCell>
                <TableCell align="center">{cat.datecomission}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </LoadingIndicator>

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

export default TableComission;
