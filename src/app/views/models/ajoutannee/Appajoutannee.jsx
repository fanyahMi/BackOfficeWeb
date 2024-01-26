import { useState } from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { logoutUser } from '../../../../deconnection';
import { useNavigate } from 'react-router-dom';
const Appajoutannee = ({ model, modelId, onClose }) => {
  const [affmodel, setAffmodel] = useState(model);
  const [open, setOpen] = useState(true);
  const [annee, setAnnee] = useState('');
  const navigate = useNavigate();

  const handleClose = () => {
    setAffmodel(model);
    setOpen(false);
    onClose();
  };
  console.log(modelId + ' eto tb ');

  const handleChange = (event) => {
    const { value } = event.target;
    setAnnee(value);
  };
  const handleSubmit = async (event) => {
    const value = JSON.stringify({ modelId: modelId, annee: annee });
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');
    const response = await fetch(`https://vehiculeback.onrender.com/api/v1/models/v1/annees`, {
      method: 'POST',
      headers: headers,
      body: value
    });
    const jsonData = await response.json();
    if (jsonData.status_code === '401') {
      alert(jsonData.message);
      const logoutResult = await logoutUser();
      if (logoutResult.success) {
        navigate('/session/signin');
      } else {
        console.error('Échec de la déconnexion:', logoutResult.message);
        alert(logoutResult.message);
      }
    } else if (jsonData.status_code === '404') {
      alert(jsonData.message);
    }
    handleClose();
    setOpen(false);
    onClose();
  };
  return (
    <Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Ajout de nouvelle année de fabrication du model : {affmodel}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Ajout de nouvelle année de fabrication du model : {affmodel}
          </DialogContentText>

          <TextField
            fullWidth
            autoFocus
            id="année"
            type="text"
            margin="dense"
            onChange={handleChange}
            label="Année"
          />
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button onClick={handleSubmit} color="primary">
            Ajouté
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Appajoutannee;
