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

import MenuMarque from './MenuMarque';
import LoadingIndicator from 'app/components/LoadingIndicator';

import { logoutUser } from '../../../deconnection';
import { useNavigate } from 'react-router-dom';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const TableMarque = ({
  onEditMarque,
  selectedMarque,
  selectedMarqueId,
  refreshTable,
  onFormSubmitSuccess,
  categorieId
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // État de chargement
  const navigate = useNavigate();
  const [nameCategorie, setNameCategorie] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Commencer le chargement

        var url = 'https://wscloudfinal-production.up.railway.app/api/v1/marques';
        if (categorieId !== null) {
          url = `https://wscloudfinal-production.up.railway.app/api/v1/categories/v1/marques/${categorieId}`;
        }
        const token = sessionStorage.getItem('token');
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json');
        const response = await fetch(url, {
          method: 'GET',
          headers: headers
        });
        const jsonData = await response.json();
        if (jsonData.status_code === '200') {
          setData(jsonData.data);
          setNameCategorie(jsonData.data.length > 0 ? jsonData.data[0].categorie : '');
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

        setLoading(false); // Fin du chargement
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false); // Gestion des erreurs
      }
    };

    fetchData();
  }, [refreshTable, navigate, categorieId]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClick = (marqueName, marqueId) => {
    onEditMarque(marqueName, marqueId);
  };

  return (
    <Box width="100%" overflow="auto">
      <LoadingIndicator loading={loading} /> {/* Affichage de l'indicateur de chargement */}
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">
              {nameCategorie ? `Marque (Catégorie: ${nameCategorie})` : 'Libellé'}
            </TableCell>
            <TableCell align="center">Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cat, index) => (
            <TableRow key={index}>
              <TableCell align="left">{cat.marque}</TableCell>
              <TableCell align="center">
                <MenuMarque
                  id_marque={cat.id_marque}
                  onFormSubmitSuccess={onFormSubmitSuccess}
                  onEditClick={() => handleEditClick(cat.marque, cat.id_marque)}
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

export default TableMarque;
