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
import MenuCarburant from './MenuCarburant';
import { useState, useEffect } from 'react';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const TableCarburant = ({
  onEditCarburant,
  selectedCarburant,
  selectedCarburantId,
  onFormSubmitSuccess,
  refreshTable
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        const response = await fetch(
          'https://vehiculeback.onrender.com/api/v1/models/v1/carburants',
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

        //
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
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
  const handleEditClick = (carburantName, carburantId) => {
    onEditCarburant(carburantName, carburantId);
  };
  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cat, index) => (
            <TableRow key={index}>
              <TableCell align="left">{cat.categorie}</TableCell>
              <TableCell align="center">
                <MenuCarburant
                  id_categorie={cat.idCategorie}
                  onFormSubmitSuccess={onFormSubmitSuccess}
                  onEditClick={() => handleEditClick(cat.categorie, cat.idCategorie)}
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

export default TableCarburant;
