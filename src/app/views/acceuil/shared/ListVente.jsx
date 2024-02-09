import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";

import * as Util from 'app/functions/Util';

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const ListVente = (props) => {
  const { site } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Rang</TableCell>
            <TableCell align="left">Vendeur</TableCell>
            <TableCell align="center">Acheteur</TableCell>
            <TableCell align="center">Taux commission</TableCell>
            <TableCell align="center">Prix vente</TableCell>
            <TableCell align="center">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {site.venteOfMonth?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((vente, index) => (
              <TableRow key={index}>
                <TableCell align="left">#{index+1}</TableCell>
                <TableCell align="left">{vente.vendeur}</TableCell>
                <TableCell align="center">{vente.acheteur}</TableCell>
                <TableCell align="center">{vente.taux_comission}%</TableCell>
                <TableCell align="center">{Util.formatNumber(vente.prix_achat)}</TableCell>
                <TableCell align="center">{vente.date_achat}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={Util.getCount(site.venteOfMonth)}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
  );
};

export default ListVente;
