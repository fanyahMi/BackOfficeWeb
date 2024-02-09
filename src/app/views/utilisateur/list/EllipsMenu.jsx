import { Box, Icon, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom';

const options = [
  { label: 'Detail', path: '/' , icon: 'info_outline'},
  { label: 'Bannir', path: '/' , icon: 'error_outline'},
  { label: 'Supprimer', path: '/' , icon: 'delete'},
  // Ajoutez d'autres options avec des chemins
];

const ITEM_HEIGHT = 48;

function MaxHeightMenu() {
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
    navigate(path);
    handleClose();
  }

  return (
    <Box>
      <IconButton
        aria-label="More"
        aria-owns={open ? "long-menu" : undefined}
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
          <MenuItem key={option.label} selected={option === "Pyxis"} onClick={() => handleRedirect(option.path)}>
            <Icon>{option.icon}</Icon>&nbsp;&nbsp;{option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default MaxHeightMenu;
