// MaxHeightMenu.jsx
import { Box, Icon, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Api from 'app/functions/Api';

const ITEM_HEIGHT = 48;

function MaxHeightMenu({ annonce_id }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleRedirect(path) {
    navigate(`${path}?annonce_id=${annonce_id}`);
    handleClose();
  }

  async function validate() {
    try {
      await Api.fetch(
        `https://vehiculeback.onrender.com/api/v1/annonces/autoriser/${annonce_id}`,
        'PUT',
        {
          'Content-Type': 'application/json'
        }
      );
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la validation:', error.message);
    }
  }

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
        {/* Utilisez annonce_id ici */}
        <MenuItem key={0} onClick={() => handleRedirect('/annonces/detail')}>
          <Icon>info_outline</Icon>&nbsp;&nbsp;Detail
        </MenuItem>
        <MenuItem key={1} onClick={() => validate()}>
          <Icon>check</Icon>&nbsp;&nbsp;Valider
        </MenuItem>
        <MenuItem key={2}>
          <Icon>delete</Icon>&nbsp;&nbsp;Supprimer
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default MaxHeightMenu;
