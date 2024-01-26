import React, { useState } from 'react';
import { Button, Grid, Icon, styled } from '@mui/material';
import { Span } from 'app/components/Typography';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { logoutUser } from '../../../deconnection';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from 'app/components/LoadingIndicator';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const FormMarque = ({ selectedMarque, selectedMarqueId, onFormSubmitSuccess }) => {
  const [marque, setMarque] = useState(selectedMarque || '');
  const [loading, setLoading] = useState(false); // Nouvel état pour la charge
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value } = event.target;
    setMarque(value);
  };

  const handleSubmit = async (event) => {
    try {
      setLoading(true); // Définir la charge sur true au début de la soumission du formulaire

      const token = localStorage.getItem('token');

      if (selectedMarque) {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json');

        const response = await fetch(
          `https://vehiculeback.onrender.com/api/v1/marques/${selectedMarqueId}`,
          {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({ marque: marque })
          }
        );

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

        console.log(jsonData);
      } else {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json');

        const response = await fetch('https://vehiculeback.onrender.com/api/v1/marques', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ marque: marque })
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
        }
      }

      onFormSubmitSuccess();
      setMarque('');
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    } finally {
      setLoading(false); // Définir la charge sur false après la soumission du formulaire
    }
  };

  return (
    <div>
      <LoadingIndicator loading={loading} /> {/* Ajout de l'indicateur de chargement */}
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="Marque"
              label="Nouvelle marque"
              onChange={handleChange}
              value={marque || ''}
              validators={['required']}
              errorMessages={['This field is required']}
            />
          </Grid>
        </Grid>
        <Button color="primary" variant="contained" type="submit">
          <Icon>{selectedMarque ? 'edit' : 'send'}</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
            {selectedMarque ? 'Modifier' : 'Valider'}
          </Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default FormMarque;
