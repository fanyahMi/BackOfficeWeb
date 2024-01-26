import { Box, Icon, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import AppListeannees from '../../models/listesannees/AppListeannees';
import Appajoutannee from '../../models/ajoutannee/Appajoutannee';
const options = ['Ajoute année', 'Liste annee'];
const ITEM_HEIGHT = 20;

const MenuListModel = ({ id_model, model }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [affmodel, setAffmodel] = useState(model);
  const [affmodelId, setAffModelId] = useState(id_model);
  const [appListeanneesOpen, setAppListeanneesOpen] = useState(false);
  const [appAjouteAnneeOpen, setAppAjouteAnneeOpen] = useState(false);

  const open = Boolean(anchorEl);

  console.log(`id_model reçu  : ${id_model}`);

  function handleClick(event) {
    setAffmodel(model);
    setAffModelId(id_model);
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  const handleMenuItemClick = (option) => {
    if (option === 'Liste annee') {
      setAppListeanneesOpen(true);
    } else if (option === 'Ajoute année') {
      setAppAjouteAnneeOpen(true);
    }
    handleClose();
  };
  const handleAppListeanneesClose = () => {
    setAppListeanneesOpen(false);
  };

  const handleAppAjoutClose = () => {
    setAppAjouteAnneeOpen(false);
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
      {appListeanneesOpen && (
        <AppListeannees
          model={affmodel}
          modelId={affmodelId}
          statusOpen={true}
          onClose={handleAppListeanneesClose}
        />
      )}

      {appAjouteAnneeOpen && (
        <Appajoutannee
          model={affmodel}
          modelId={affmodelId}
          statusOpen={true}
          onClose={handleAppAjoutClose}
        />
      )}
    </Box>
  );
};

export default MenuListModel;
