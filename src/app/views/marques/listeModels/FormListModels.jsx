import Box from '@mui/material/Box';
import { Button, Grid, Icon } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Span } from 'app/components/Typography';
import { useState, useEffect } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Tableliste from './Tableliste';
import { logoutUser } from '../../../../deconnection';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const FormListModels = () => {
  const [marque_id, setMarque_id] = useState('');
  const [tabMarques, setTabMarques] = useState([]);
  const [tabCategories, setTabCategories] = useState([]);
  const [categorie_id, setCategorie_id] = useState('');
  const [resultat, setResultat] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const marqueId2 = searchParams.get('marque_id');
  console.log('misy ' + marqueId2);
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
          console.log(jsonDataMaques.data);
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
        /**** test s'il y a un marque_Id */
        if (marqueId2 !== null) {
          setMarque_id(marqueId2);
          console.log('mety retsy e ' + marqueId2);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate, marque_id, marqueId2]);

  const handleMarqueChange = (event) => {
    setMarque_id(event.target.value);
  };
  const handleCategorieChange = (event) => {
    setCategorie_id(event.target.value);
  };
  const addtableresulat = async () => {
    const responseMaques = await fetch(
      `https://vehiculeback.onrender.com/api/v1/models/v1/details?marque_id=${marque_id}&categorie_id=${categorie_id}`,
      {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json' // Optional, adjust based on your API requirements
        })
      }
    );
    const jsonDataMaques = await responseMaques.json();
    console.log(jsonDataMaques);
    if (jsonDataMaques.status_code === '200') {
      setResultat(jsonDataMaques.data);
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
  };
  const handleSubmit = async (event) => {
    console.log('categorie ' + categorie_id + '   marque ' + marque_id);
    addtableresulat();
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
                  {tabMarques.map((item) => (
                    <MenuItem value={item.id_marque}>{item.marque}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
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
        <Button color="info" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Voir</Span>
        </Button>
      </ValidatorForm>
      <Box py="7px" />
      <Tableliste tab={resultat} />
    </div>
  );
};

export default FormListModels;
