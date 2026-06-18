'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Button, TextField, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import MessageIcon from '@mui/icons-material/Message';
import company from '@/lib/data/company.json';
import products from '@/lib/data/products.json';
import catalog from '@/lib/data/catalog.json';
import ProductDialog from '@/components/ProductDialog';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const carouselImages = [
    '/images/ss1.jpeg',
    '/images/ss2.jpeg',
    '/images/ss3.jpeg',
    '/images/ss4.jpeg',
    '/images/ss5.jpeg',
    '/images/ss6.jpeg',
    '/images/ss7.jpeg',
    '/images/ss8.jpeg',
    '/images/ss9.jpeg',
    '/images/ss10.jpeg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const openWhatsApp = (phone: string) => {
    const kenyaPhone = `254${phone.substring(1)}`;
    window.open(`https://wa.me/${kenyaPhone}`, '_blank');
  };

  const filteredProducts = selectedCategory === 'all'
    ? catalog.categories.flatMap(cat => cat.products)
    : catalog.categories.find(cat => cat.id === selectedCategory)?.products || [];

  const searchedProducts = filteredProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {/* Background Image with Overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/images/ss1.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: -2,
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          zIndex: -1,
        }}
      />

      {/* Home Section */}
      <Box id="home">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 12, textAlign: 'center' }}>
            <Container maxWidth="lg">
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                {company.name}
              </Typography>
              <Typography variant="h6" sx={{ mb: 4 }}>
                {company.slogan}
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                {company.tagline}
              </Typography>
            </Container>
          </Box>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ py: 8, bgcolor: 'gray.50' }}>
            <Container maxWidth="lg">
              <Box
                sx={{
                  position: 'relative',
                  height: 400,
                  overflow: 'hidden',
                  borderRadius: 2,
                  bgcolor: 'gray.200',
                }}
              >
                <motion.img
                  key={currentImageIndex}
                  src={carouselImages[currentImageIndex]}
                  alt="Carousel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Container>
          </Box>
        </motion.div>

        {/* About Snippet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box sx={{ py: 12 }}>
            <Container maxWidth="lg">
              <Typography variant="h4" sx={{ color: 'primary.main', mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
                About Us
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 8 }}>
                {company.about}
              </Typography>
            </Container>
          </Box>
        </motion.div>

        {/* Featured Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Box sx={{ py: 12, bgcolor: 'gray.50' }}>
            <Container maxWidth="lg">
              <Typography variant="h4" sx={{ color: 'primary.main', mb: 6, fontWeight: 'bold', textAlign: 'center' }}>
                Our Products
              </Typography>
              <Grid container spacing={4}>
                {products.featured.map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', cursor: 'pointer' } }} onClick={() => handleProductClick(product)}>
                        <Box sx={{ height: 300, overflow: 'hidden' }}>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </Box>
                        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {product.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </motion.div>
      </Box>

      {/* About Section */}
      <Box id="about" sx={{ py: 12 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 12, textAlign: 'center' }}>
            <Container maxWidth="lg">
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                About Us
              </Typography>
              <Typography variant="h6">
                {company.name}
              </Typography>
            </Container>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Container maxWidth="lg" sx={{ py: 12 }}>
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Box sx={{ position: 'relative', height: 400, borderRadius: 2, overflow: 'hidden' }}>
                    <img
                      src="/images/abt.png"
                      alt="About Pamutec Solar"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 4 }}>
                    About {company.name}
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', mb: 4 }}>
                    {company.description}
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                    {company.about}
                  </Typography>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Box sx={{ py: 12 }}>
            <Container maxWidth="lg">
              <Typography variant="h4" sx={{ color: 'primary.main', mb: 6, fontWeight: 'bold', textAlign: 'center' }}>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', lineHeight: 1.8, color: 'text.secondary' }}>
                We are committed to providing clean, reliable, and affordable solar energy solutions for homes and businesses around the world. Our products are designed with quality and sustainability in mind, ensuring that our customers receive the best value for their investment.
              </Typography>
            </Container>
          </Box>
        </motion.div>
      </Box>

      {/* Products Section */}
      <Box id="products" sx={{ py: 12, bgcolor: 'gray.50' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 12, textAlign: 'center' }}>
            <Container maxWidth="lg">
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Our Products
              </Typography>
              <Typography variant="h6">
                Quality Solar Solutions for Every Need
              </Typography>
            </Container>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Container maxWidth="lg" sx={{ py: 12 }}>
            <Grid container spacing={4}>
              {products.featured.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', cursor: 'pointer' } }}
                      onClick={() => handleProductClick(product)}
                    >
                      <Box sx={{ height: 350, overflow: 'hidden' }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Box>
                      <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>
                          {product.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {product.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </motion.div>
      </Box>

      {/* Catalog Section */}
      <Box id="catalog" sx={{ py: 12 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
                              <Box sx={{ height: 250, overflow: 'hidden' }}>
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
      </Box>

      {/* Prices Section */}
      <Box id="prices" sx={{ py: 12, bgcolor: 'gray.50' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 12, textAlign: 'center' }}>
            <Container maxWidth="lg">
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Pricing
              </Typography>
              <Typography variant="h6">
                Competitive Prices for Quality Solar Solutions
              </Typography>
            </Container>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Container maxWidth="lg" sx={{ py: 12 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src="/images/prices.png"
                  alt="Pricing Information"
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }}
                />
              </Box>
            </motion.div>
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
              For detailed pricing information and quotes, please contact us directly. We offer competitive prices for all our solar energy solutions.
            </Typography>
          </Container>
        </motion.div>
      </Box>

      {/* Contact Section */}
      <Box id="contact" sx={{ py: 12 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 12, textAlign: 'center' }}>
            <Container maxWidth="lg">
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Contact Us
              </Typography>
              <Typography variant="h6">
                Get in Touch with Pamutec Solar
              </Typography>
            </Container>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Container maxWidth="lg" sx={{ py: 12 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <Card sx={{ height: '100%', textAlign: 'center', p: 4, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                    <CardContent>
                      <PhoneIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                      <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>
                        Call Us
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        0720055705
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3 }}>
                        0728167435
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        href="tel:0720055705"
                        sx={{ mb: 1, width: '100%' }}
                      >
                        Call Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <Card sx={{ height: '100%', textAlign: 'center', p: 4, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                    <CardContent>
                      <WhatsAppIcon sx={{ fontSize: 48, color: '#25D366', mb: 2 }} />
                      <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>
                        WhatsApp
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        0720055705
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3 }}>
                        0728167435
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => openWhatsApp('0720055705')}
                        sx={{ mb: 1, width: '100%', bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' } }}
                      >
                        Chat on WhatsApp
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Card sx={{ height: '100%', textAlign: 'center', p: 4, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                    <CardContent>
                      <EmailIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                      <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3 }}>
                        pamutecsolar@gmail.com
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        href="mailto:pamutecsolar@gmail.com"
                        sx={{ width: '100%' }}
                      >
                        Send Email
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <Card sx={{ height: '100%', textAlign: 'center', p: 4, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                    <CardContent>
                      <InstagramIcon sx={{ fontSize: 48, color: '#E1306C', mb: 2 }} />
                      <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>
                        Instagram
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3 }}>
                        @pamutecsolarkenya
                      </Typography>
                      <Button
                        variant="contained"
                        href="https://www.instagram.com/pamutecsolarkenya"
                        target="_blank"
                        sx={{ width: '100%', bgcolor: '#E1306C', '&:hover': { bgcolor: '#C13584' } }}
                      >
                        Follow Us
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <Card sx={{ height: '100%', textAlign: 'center', p: 4, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                    <CardContent>
                      <FacebookIcon sx={{ fontSize: 48, color: '#1877F2', mb: 2 }} />
                      <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>
                        Facebook
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3 }}>
                        Pamutec Solar Kenya
                      </Typography>
                      <Button
                        variant="contained"
                        href="https://www.facebook.com/PamutecSolarKenya/"
                        target="_blank"
                        sx={{ width: '100%', bgcolor: '#1877F2', '&:hover': { bgcolor: '#0d5bbd' } }}
                      >
                        Like Page
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <Card sx={{ height: '100%', textAlign: 'center', p: 4, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                    <CardContent>
                      <MessageIcon sx={{ fontSize: 48, color: '#00B2FF', mb: 2 }} />
                      <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>
                        Messenger
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3 }}>
                        Chat with us
                      </Typography>
                      <Button
                        variant="contained"
                        href="https://m.me/PamutecSolarKenya"
                        target="_blank"
                        sx={{ width: '100%', bgcolor: '#00B2FF', '&:hover': { bgcolor: '#0084cc' } }}
                      >
                        Message Us
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Card sx={{ height: '100%', textAlign: 'center', p: 4, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                    <CardContent>
                      <LocationOnIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                      <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>
                        Location
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3 }}>
                        Nairobi, Kenya
                      </Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        href="https://www.google.com/maps/place/Atlantis+Business+Park/@-1.3430387,36.8794513,17z/data=!4m14!1m7!3m6!1s0x182f0df6dd2d8809:0x8ae8ff2732fb1eab!2sAtlantis+Business+Park!8m2!3d-1.3430441!4d36.8820262!16s%2Fg%2F11ggsz8s3p!3m5!1s0x182f0df6dd2d8809:0x8ae8ff2732fb1eab!8m2!3d-1.3430441!4d36.8820262!16s%2Fg%2F11ggsz8s3p?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        sx={{ width: '100%' }}
                      >
                        Get Directions
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </motion.div>
      </Box>

      <ProductDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        product={selectedProduct}
      />
    </Box>
  );
}
