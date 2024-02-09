import React, { useState, useEffect } from 'react';
import { Box, styled, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import EllipsMenu from './EllipsMenu';
import LoadingIndicator from 'app/components/LoadingIndicator';
import * as Util from 'app/functions/Util';
import Api from 'app/functions/Api';

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const SimpleTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Api.fetch(
          'https://wscloudfinal-production.up.railway.app/api/auth',
          'GET',
          {
            'Content-Type': 'application/json'
          }
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box width="100%" overflow="auto">
      {loading ? (
        <LoadingIndicator loading={loading} />
      ) : (
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="center">Nom</TableCell>
              <TableCell align="center">Prenom</TableCell>
              <TableCell align="center">Genre</TableCell>
              <TableCell align="center">Date naissance</TableCell>
              <TableCell align="center">Nb annonce</TableCell>
              <TableCell align="center">Nb Achat</TableCell>
              <TableCell align="right">Autre</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users &&
              users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{user.id_utilisateur}</TableCell>
                  <TableCell align="center">{user.nom}</TableCell>
                  <TableCell align="center">{user.prenom}</TableCell>
                  <TableCell align="center">
                    {user.genre === 1 ? 'Homme' : user.genre === 2 ? 'Femme' : 'Autre'}
                  </TableCell>
                  <TableCell align="center">{Util.formatDate(user.date_naissance)}</TableCell>
                  <TableCell align="center">{user.nb_annonce}</TableCell>
                  <TableCell align="center">{user.nb_achat}</TableCell>
                  <TableCell align="right">
                    <EllipsMenu />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </StyledTable>
      )}
    </Box>
  );
};

export default SimpleTable;
