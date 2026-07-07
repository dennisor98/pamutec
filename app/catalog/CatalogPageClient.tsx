'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Box, Container, Typography, Grid, Card, CardMedia, TextField, Button, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';
import catalog from '@/lib/data/catalog.json';
import ProductDialog from '@/components/ProductDialog';

export default function CatalogPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredProducts = selectedCategory === 'all'
    ? catalog.categories.flatMap(cat => cat.products)
    : catalog.categories.find(cat => cat.id === selectedCategory)?.products || [];

  const searchedProducts = filteredProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  return (
    <Box>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 12, textAlign: 'center' }}>
          <Container maxWidth="lg">
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Product Catalog
            </Typography>
            <Typography variant="h6">
              Browse Our Complete Product Range
            </Typography>
          </Container>
        </Box>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                label="All Categories"
                onClick={() => setSelectedCategory('all')}
                color={selectedCategory === 'all' ? 'primary' : 'default'}
                clickable
              />
              {catalog.categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.name}
                  onClick={() => setSelectedCategory(category.id)}
                  color={selectedCategory === category.id ? 'primary' : 'default'}
                  clickable
                />
              ))}
            </Box>
          </Box>

          {/* Products Grid */}
          {catalog.categories.map((category, catIndex) => (
            (selectedCategory === 'all' || selectedCategory === category.id) && (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              >
                <Box sx={{ mb: 8 }}>
                  <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 4 }}>
                    {category.name}
                  </Typography>
                  <Grid container spacing={3}>
                    {category.products
                      .filter(product => 
                        product.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((product, prodIndex) => (
                      <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: prodIndex * 0.05 }}
                        >
                          <Card
                            sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', cursor: 'pointer' } }}
                            onClick={() => handleProductClick(product)}
                          >
                            <Box sx={{ height: 250, overflow: 'hidden', position: 'relative' }}>
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                                style={{ objectFit: 'cover' }}
                                loading="lazy"
                              />
                            </Box>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </motion.div>
            )
          ))}

          {searchedProducts.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No products found matching your search.
              </Typography>
            </Box>
          )}
        </Container>
      </motion.div>

      <ProductDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        product={selectedProduct}
      />
    </Box>
  );
}
