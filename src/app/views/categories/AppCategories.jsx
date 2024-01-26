import { useState } from 'react';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import FormCategorie from './FormCategorie';
import TableCategorie from './TableCategorie';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [refreshTable, setRefreshTable] = useState(false);
  const token = localStorage.getItem('token');
  if (token === null) {
    window.location.href = '/session/signin';
  }
  const handleEditCategory = (categoryName, categoryId) => {
    setSelectedCategory(categoryName);
    setSelectedCategoryId(categoryId);
  };

  const handleRefreshTable = () => {
    setRefreshTable(!refreshTable);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Voiture', path: '/categories' }, { name: 'Categories' }]}
        />
      </Box>
      <SimpleCard
        title={
          selectedCategory
            ? `Modifier la catégorie : ${selectedCategory}`
            : 'Ajout de nouvelle catégorie de voiture'
        }
      >
        <FormCategorie
          selectedCategory={selectedCategory}
          selectedCategoryId={selectedCategoryId}
          onFormSubmitSuccess={handleRefreshTable}
        />
      </SimpleCard>
      <Box py="12px" />
      <SimpleCard title="Liste catégories">
        <TableCategorie
          onEditCategory={handleEditCategory}
          selectedCategory={selectedCategory}
          selectedCategoryId={selectedCategoryId}
          onFormSubmitSuccess={handleRefreshTable}
          refreshTable={refreshTable}
        />
      </SimpleCard>
    </Container>
  );
};

export default AppCategories;
