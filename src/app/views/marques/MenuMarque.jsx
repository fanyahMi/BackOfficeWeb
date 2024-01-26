import { Box, Icon, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../deconnection';

const options = ['Modifier', 'Supprimer', 'Liste Model'];
const ITEM_HEIGHT = 40;

const MenuMarque = ({ id_marque, onEditClick, onFormSubmitSuccess }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  console.log(`id_marque reçu dans MenuMarque : ${id_marque}`);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  const handleMenuItemClick = async (option) => {
    if (option === 'Modifier') {
      console.log('modifier');
      onEditClick();
    } else if (option === 'Liste Model') {
      const id_marqueParam = id_marque ? `?marque_id=${id_marque}` : '';
      navigate(`/listesmodels${id_marqueParam}`);
    } else {
      const token = localStorage.getItem('token');
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${token}`);
      const response = await fetch(
        `https://vehiculeback.onrender.com/api/v1/marques/${id_marque}`,
        {
          method: 'DELETE',
          headers: headers
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
    }
    onFormSubmitSuccess();
    handleClose();
  };
  return (
    <Box>
      <IconButton
        aria-label="More"
        aria-owns={open ? 'long-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Icon>more_vert</Icon>
      </IconButton>

      <Menu
        open={open}
        id="long-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5, width: 200 } }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === 'Pyxis'}
            onClick={() => handleMenuItemClick(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default MenuMarque;
