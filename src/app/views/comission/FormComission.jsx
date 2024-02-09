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

const FormComission = ({ onFormSubmitSuccess }) => {
  const [comission, setComission] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChangeCommission = (event) => {
    const { value } = event.target;
    setComission(value);
  };
  const handleChangeDate = (event) => {
    const { value } = event.target;
    setDate(value);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    const token = sessionStorage.getItem('token');
    try {
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${token}`);
      headers.append('Content-Type', 'application/json');

      const response = await fetch(
        'https://wscloudfinal-production.up.railway.app/api/admin/v1/comissions',
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ taux: comission, datecomission: date })
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
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
    setComission('');
    setDate('');
    onFormSubmitSuccess();
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="number"
              name="Comission"
              label="Nouvelle comission"
              onChange={handleChangeCommission}
              value={comission || ''}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="date"
              name="Date"
              onChange={handleChangeDate}
              value={date || ''}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </Grid>
        </Grid>
        <LoadingIndicator loading={loading}>
          <Button color="primary" variant="contained" type="submit">
            <Icon>send</Icon>
            <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Valider</Span>
          </Button>
        </LoadingIndicator>
      </ValidatorForm>
    </div>
  );
};

export default FormComission;
