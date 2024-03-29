import React, { useState, useEffect } from 'react';
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  Select
} from '@mui/material';

import MaxHeightMenu from './MaxHeightMenu';
import * as Util from 'app/functions/Util';
import Api from 'app/functions/Api';

import LoadingIndicator from 'app/components/LoadingIndicator';

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
  const [annonces, setAnnonces] = useState([]);
  const [filtreStatut, setFiltreStatut] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnonce = async () => {
      const response = await Api.fetch(
        'https://wscloudfinal-production.up.railway.app/api/v1/annonces/invendu',
        'GET',
        {
          'Content-Type': 'application/json'
        }
      );
      setAnnonces(response.data);
      setLoading(false);
    };

    fetchAnnonce();
  }, []);

  const annoncesFiltrees = annonces.filter((annonce) => {
    if (filtreStatut === 'all') {
      return true;
    } else if (filtreStatut === 'valid') {
      return annonce.statut === 2;
    } else {
      return annonce.statut === 1;
    }
  });

  return (
    <div>
      <Select
        style={{ float: 'right', marginTop: '-4%', marginBottom: '2%' }}
        size="small"
        value={filtreStatut}
        onChange={(e) => setFiltreStatut(e.target.value)}
      >
        <MenuItem value="all">Tous</MenuItem>
        <MenuItem value="valid">Valide</MenuItem>
        <MenuItem value="invalid">Non valide</MenuItem>
      </Select>
      <Box width="100%" overflow="auto">
        {loading ? (
          <LoadingIndicator loading={loading} />
        ) : (
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left">Auteur</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Voiture</TableCell>
                <TableCell align="center">Prix</TableCell>
                <TableCell align="center">Statut</TableCell>
                <TableCell align="right">Autre</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {annoncesFiltrees.map((annonce, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{annonce.auteur}</TableCell>
                  <TableCell align="center">{Util.formatDate(annonce.date_annonce)}</TableCell>
                  <TableCell align="center">{annonce.detailvoiture.marque}</TableCell>
                  <TableCell align="center">Ar {Util.formatNumber(annonce.prix_vente)}</TableCell>
                  <TableCell align="center">{Util.getStatus(annonce.statut)}</TableCell>
                  <TableCell align="right">
                    <MaxHeightMenu annonce_id={annonce.annonce_id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        )}
      </Box>
    </div>
  );
};

export default SimpleTable;
