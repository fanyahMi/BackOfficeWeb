import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled, Card, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import { Icon, Table, TableBody, TableCell, TableRow } from '@mui/material';

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const AccordionRoot = styled('div')(({ theme }) => ({
  width: '100%',
  '& .heading': {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  position: 'relative'
  // background: `rgb(${convertHexToRGB(theme.palette.primary.main)}, 0.15) !important`,
  // [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const DetailSupp = (props) => {
  const { annonce } = props;

  return (
    <AccordionRoot>
      <Accordion>
        <AccordionSummary
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography className="heading">
            <sub style={{ paddingRight: '5px' }}>
              <Icon>{'drive_eta'}</Icon>
            </sub>{' '}
            Voiture
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <StyledTable>
            <TableBody>
              <TableRow key={0}>
                <TableCell align="left" className="text-bold secondary">
                  Marque
                </TableCell>
                <TableCell align="right">{annonce.detailvoiture?.marque}</TableCell>
              </TableRow>
              <TableRow key={1}>
                <TableCell align="left" className="text-bold secondary">
                  Matricule
                </TableCell>
                <TableCell align="right">{annonce.detailvoiture?.matricule}</TableCell>
              </TableRow>
              <TableRow key={2}>
                <TableCell align="left" className="text-bold secondary">
                  Kilometrage
                </TableCell>
                <TableCell align="right">{annonce.detailvoiture?.kilometrage}</TableCell>
              </TableRow>
              <TableRow key={3}>
                <TableCell align="left" className="text-bold secondary">
                  Categorie
                </TableCell>
                <TableCell align="right">{annonce.detailvoiture?.categorie}</TableCell>
              </TableRow>
              <TableRow key={4}>
                <TableCell align="left" className="text-bold secondary">
                  Serie
                </TableCell>
                <TableCell align="right">{annonce.detailvoiture?.annee}</TableCell>
              </TableRow>
              <TableRow key={5}>
                <TableCell align="left" className="text-bold secondary">
                  Carburant
                </TableCell>
                <TableCell align="right">{annonce.detailvoiture?.carburant}</TableCell>
              </TableRow>
            </TableBody>
          </StyledTable>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography className="heading">
            <sub style={{ paddingRight: '1%' }}>
              <Icon>{'info_outline'}</Icon>
            </sub>{' '}
            Propriete
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <StyledTable>
            <TableBody>
              {annonce.proprietes?.map((propriete, index) => (
                <TableRow key={index}>
                  <TableCell align="left" className="text-bold secondary">
                    {propriete.titre}
                  </TableCell>
                  <TableCell align="right">{propriete.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography className="heading">
            <sub style={{ paddingRight: '5px' }}>
              <Icon>{'collections'}</Icon>
            </sub>{' '}
            Images
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={3} style={{ paddingLeft: '2%', marginTop: '2px' }}>
            {annonce.photos?.map((photo, index) => (
              <StyledCard
                key={index}
                col={3}
                md={3}
                style={{ marginLeft: '2%', width: '150px', height: '100px' }}
              >
                <img
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src="/assets/images/sq-8.jpg"
                  alt="upgrade"
                />
                {/* <img
                    src={`data:${annonce.photos[0].contentType};base64,${annonce.photos[0].data}`} 
                    alt={`Annonce ${index + 1}`}
                  /> */}
              </StyledCard>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </AccordionRoot>
  );
};

export default DetailSupp;
