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

const FormCarburant = ({ selectedCarburant, selectedCarburantId, onFormSubmitSuccess }) => {
  const [carburant, setCarburant] = useState('');
  const [loading, setLoading] = useState(false); // Ajoutez l'état de chargement
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value } = event.target;
    setCarburant(value);
  };

  const handleSubmit = async (event) => {
    setLoading(true); // Déclenchez le chargement au début de la soumission du formulaire
    try {
      const token = localStorage.getItem('token');
      if (selectedCarburant) {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json');
        const response = await fetch(
          `https://vehiculeback.onrender.com/api/v1/models/v1/carburants/${selectedCarburantId}`,
          {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({ carburant: carburant })
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
        const response = await fetch(
          'https://vehiculeback.onrender.com/api/v1/models/v1/carburants',
          {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ carburant: carburant })
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
        }
      }
      onFormSubmitSuccess();
      setCarburant('');
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    } finally {
      setLoading(false); // À la fin de la soumission du formulaire, arrêtez le chargement
    }
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="Categorie"
              label={selectedCarburant ? 'Modifier la carburant' : 'Nouvelle carburant de voiture'}
              onChange={handleChange}
              value={carburant || ''}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </Grid>
        </Grid>

        {/* Utilisez LoadingIndicator autour du bouton */}
        <LoadingIndicator loading={loading}>
          <Button color="primary" variant="contained" type="submit">
            <Icon>{selectedCarburant ? 'edit' : 'send'}</Icon>
            <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
              {selectedCarburant ? 'Modifier' : 'Valider'}
            </Span>
          </Button>
        </LoadingIndicator>
      </ValidatorForm>
    </div>
  );
};

export default FormCarburant;
