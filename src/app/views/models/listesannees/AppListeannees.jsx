// AppListeannees.js
import { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';

import TableListeannee from './TableListeannee';

// Utilisez des accolades pour déstructurer les propriétés
const AppListeannees = ({ model, modelId, onClose }) => {
  const [affmodel, setAffmodel] = useState(model);
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setAffmodel(model);
    setOpen(false);
    onClose();
  };
  console.log(modelId + ' eto tb ');

  return (
    <Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Liste des annee de model : {affmodel}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <TableListeannee modelId={modelId} />
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppListeannees;
