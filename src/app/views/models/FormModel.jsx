import Box from '@mui/material/Box';
import { Button, Grid, Icon, styled } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Span } from 'app/components/Typography';
import { useState, useEffect } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { logoutUser } from '../../../deconnection';
import { useNavigate } from 'react-router-dom';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const FormModel = () => {
  const [model, setModel] = useState('');
  const [tabMaques, setTabMarques] = useState([]);
  const [tabCategories, setTabCategories] = useState([]);
  const [marque_id, setMarque_id] = useState('');
  const [categorie_id, setCategorie_id] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        //tabMaques
        const responseMaques = await fetch('https://vehiculeback.onrender.com/api/v1/marques', {
          method: 'GET',
          headers: new Headers({
            Authorization: `Bearer ${localStorage.getItem('token')}`
          })
        });
        const jsonDataMaques = await responseMaques.json();
        if (jsonDataMaques.status_code === '200') {
          setTabMarques(jsonDataMaques.data);
        } else if (jsonDataMaques.status_code === '401') {
          const logoutResult = await logoutUser();
          if (logoutResult.success) {
            navigate('/session/signin');
          } else {
            console.error('Échec de la déconnexion:', logoutResult.message);
            alert(logoutResult.message);
          }
        } else {
          alert(jsonDataMaques.message);
        }

        // tabCategories
        const responseCategories = await fetch(
          'https://vehiculeback.onrender.com/api/v1/categories',
          {
            method: 'GET',
            headers: new Headers({
              Authorization: `Bearer ${localStorage.getItem('token')}`
            })
          }
        );
        const jsonDataCategories = await responseCategories.json();
        if (jsonDataCategories.status_code === '200') {
          setTabCategories(jsonDataCategories.data);
        } else if (jsonDataCategories.status_code === '401') {
          const logoutResult = await logoutUser();
          if (logoutResult.success) {
            navigate('/session/signin');
          } else {
            console.error('Échec de la déconnexion:', logoutResult.message);
            alert(logoutResult.message);
          }
        } else {
          alert(jsonDataCategories.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleChange2 = (event) => {
    setModel(event.target.value);
  };
  const handleMarqueChange = (event) => {
    setMarque_id(event.target.value);
  };
  const handleCategorieChange = (event) => {
    setCategorie_id(event.target.value);
  };
  const handleSubmit = async (event) => {
    console.log(marque_id + ' c ' + categorie_id + '  m ' + model);
    const value = JSON.stringify({
      marque_id: marque_id,
      categorie_id: categorie_id,
      model: model
    });
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    headers.append('Content-Type', 'application/json');

    const response = await fetch(`https://vehiculeback.onrender.com/api/v1/models`, {
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
    setMarque_id('');
    setCategorie_id('');
    setModel('');
  };
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={1}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Marque</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={marque_id}
                  label="Marque"
                  onChange={handleMarqueChange}
                >
                  {tabMaques.map((item) => (
                    <MenuItem value={item.id_marque}>{item.marque}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box py="12px" />
            <TextField
              type="text"
              name="model"
              label="Model"
              onChange={handleChange2}
              value={model || ''}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categorie_id}
                  label="Categorie"
                  onChange={handleCategorieChange}
                >
                  {tabCategories.map((item) => (
                    <MenuItem value={item.idCategorie}>{item.categorie}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Box py="7px" />
        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Valider</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default FormModel;
