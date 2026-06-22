'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, TextField, Chip } from '@mui/material';
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
import ProductDialog from '@/components/ProductDialog';

interface Product { id: number; name: string; description: string; price?: string; currency?: string; image_url?: string; }
interface CatalogItem { id: number; name: string; description: string; price?: string; currency?: string; image_url?: string; }
interface CatalogCategory { id: number; name: string; slug: string; items: CatalogItem[]; }
interface AboutContent { heading: string; description: string; mission: string; image_url?: string; }

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [about, setAbout] = useState<AboutContent>({ heading: 'About Seven SS Stars Solar', description: company.description, mission: '', image_url: '/images/abt.png' });
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const carouselImages = ['/images/ss1.jpeg','/images/ss2.jpeg','/images/ss3.jpeg','/images/ss4.jpeg','/images/ss5.jpeg','/images/ss6.jpeg','/images/ss7.jpeg','/images/ss8.jpeg','/images/ss9.jpeg','/images/ss10.jpeg'];

  useEffect(() => {
    const interval = setInterval(() => setCurrentImageIndex(p => (p + 1) % carouselImages.length), 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Promise.all([
      fetch('/api/about').then(r => r.json()),
      fetch('/api/products').then(r => r.json()),
      fetch('/api/catalog/categories').then(r => r.json()),
    ]).then(([a, p, c]) => {
      if (a && a.heading) setAbout(a);
      if (Array.isArray(p)) setProducts(p);
      if (Array.isArray(c)) setCategories(c);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleProductClick = (product: any) => { setSelectedProduct(product); setDialogOpen(true); };
  const openWhatsApp = (phone: string) => window.open(`https://wa.me/254${phone.substring(1)}`, '_blank');

  const allItems = categories.flatMap(cat => cat.items.map(i => ({ ...i, categoryId: cat.id })));
  const filteredItems = selectedCategory === 'all' ? allItems : allItems.filter(i => i.categoryId === Number(selectedCategory));
  const searchedItems = filteredItems.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url(/images/ss1.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', zIndex: -2 }} />
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.87)', zIndex: -1 }} />

      {/* HOME */}
      <Box id="home">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 12, textAlign: 'center' }}>
            <Container maxWidth="lg">
              <Box sx={{ mb: 4 }}><img src="/images/logo.png" alt="Logo" style={{ height: 120, width: 'auto' }} /></Box>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>{company.name}</Typography>
              <Typography variant="h6" sx={{ mb: 4 }}>{company.slogan}</Typography>
              <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>{company.tagline}</Typography>
            </Container>
          </Box>
        </motion.div>

        {/* Carousel */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Box sx={{ position: 'relative', height: 500, overflow: 'hidden' }}>
            <motion.img key={currentImageIndex} src={carouselImages[currentImageIndex]} alt="Carousel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
            <Box sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1.5, zIndex: 1 }}>
              {carouselImages.map((_, i) => (
                <Box key={i} onClick={() => setCurrentImageIndex(i)} sx={{ width: i === currentImageIndex ? 32 : 10, height: 10, borderRadius: 5, bgcolor: i === currentImageIndex ? 'white' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.3s' }} />
              ))}
            </Box>
          </Box>
        </motion.div>
      </Box>

      {/* ABOUT SECTION */}
      <Box id="about" sx={{ py: 12 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 10, textAlign: 'center' }}>
            <Container maxWidth="lg">
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>About Us</Typography>
              <Typography variant="h6">{company.name}</Typography>
            </Container>
          </Box>
        </motion.div>
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 420, borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
                <img src={about.image_url || '/images/abt.png'} alt="About" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 3 }}>{about.heading || `About ${company.name}`}</Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.9, color: 'text.secondary', mb: 3 }}>{about.description || company.description}</Typography>
              {about.mission && (
                <Box sx={{ p: 3, bgcolor: 'rgba(89,182,61,0.06)', borderLeft: '4px solid', borderColor: 'primary.main', borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 700, mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>Our Mission</Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>{about.mission}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

    

        {/* Featured Products */}
        <Box id="products">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Box sx={{ py: 10, bgcolor: 'rgba(249,250,251,0.9)' }}>
              <Container maxWidth="lg">
                <Typography variant="h4" sx={{ color: 'primary.main', mb: 6, fontWeight: 'bold', textAlign: 'center' }}>Our Products</Typography>
                {loading ? <Typography textAlign="center" color="text.secondary">Loading…</Typography> : (
                  <Grid container spacing={4}>
                    {products.map((product, i) => (
                      <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 32px rgba(0,0,0,0.15)', cursor: 'pointer' } }} onClick={() => handleProductClick({ ...product, image: product.image_url })}>
                            <Box sx={{ height: 260, overflow: 'hidden', bgcolor: '#f1f5f9' }}>
                              {product.image_url
                                ? <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                : <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>📦</Box>
                              }
                            </Box>
                            <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1 }}>{product.name}</Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{product.description}</Typography>
                              {product.price && <Typography variant="h6" sx={{ color: '#059669', fontWeight: 800 }}>{product.currency} {Number(product.price).toLocaleString()}</Typography>}
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Container>
            </Box>
          </motion.div>
        </Box>

    

   
      {/* CATALOG SECTION */}
      <Box id="catalog" sx={{ py: 12 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 10, textAlign: 'center' }}>
            <Container maxWidth="lg">
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>Product Catalog</Typography>
              <Typography variant="h6">Browse Our Complete Product Range</Typography>
            </Container>
          </Box>
        </motion.div>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ mb: 5 }}>
            <TextField fullWidth placeholder="Search products…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }} sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Chip label="All Categories" onClick={() => setSelectedCategory('all')} color={selectedCategory === 'all' ? 'primary' : 'default'} clickable />
              {categories.map(cat => (
                <Chip key={cat.id} label={cat.name} onClick={() => setSelectedCategory(String(cat.id))} color={selectedCategory === String(cat.id) ? 'primary' : 'default'} clickable />
              ))}
            </Box>
          </Box>

          {categories.map((cat, ci) => {
            const items = cat.items.filter(i => (selectedCategory === 'all' || selectedCategory === String(cat.id)) && i.name.toLowerCase().includes(searchQuery.toLowerCase()));
            if (items.length === 0 && selectedCategory !== 'all') return null;
            if (items.length === 0 && selectedCategory === 'all' && searchQuery) return null;
            return (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.1 }}>
                <Box sx={{ mb: 8 }}>
                  <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 4, pb: 2, borderBottom: '2px solid', borderColor: 'primary.main' }}>{cat.name}</Typography>
                  <Grid container spacing={3}>
                    {items.map((item, ii) => (
                      <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: ii * 0.05 }}>
                          <Card sx={{ height: '100%', borderRadius: 3, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(0,0,0,0.13)', cursor: 'pointer' } }} onClick={() => handleProductClick({ ...item, image: item.image_url })}>
                            <Box sx={{ height: 220, overflow: 'hidden', bgcolor: '#f1f5f9' }}>
                              {item.image_url ? <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>🖼️</Box>}
                            </Box>
                            <CardContent sx={{ p: 2.5 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>{item.name}</Typography>
                              {item.description && <Typography variant="body2" color="text.secondary" sx={{ mb: 1, lineHeight: 1.6 }}>{item.description}</Typography>}
                              {item.price && <Typography variant="subtitle1" sx={{ color: '#059669', fontWeight: 800 }}>{item.currency} {Number(item.price).toLocaleString()}</Typography>}
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </motion.div>
            );
          })}

          {searchedItems.length === 0 && searchQuery && (
            <Box sx={{ textAlign: 'center', py: 10 }}>
              <Typography variant="h6" color="text.secondary">No products found for "{searchQuery}"</Typography>
            </Box>
          )}
        </Container>
      </Box>

     

      {/* CONTACT SECTION */}
      <Box id="contact" sx={{ py: 12 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 10, textAlign: 'center' }}>
            <Container maxWidth="lg">
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>Contact Us</Typography>
              <Typography variant="h6">Get in Touch with Seven SS Stars Solar</Typography>
            </Container>
          </Box>
        </motion.div>
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Grid container spacing={4}>
            {[
              { icon: <PhoneIcon sx={{ fontSize: 48, color: 'primary.main' }} />, title: 'Call Us', content: <><Typography>0720055705</Typography><Typography>0728167435</Typography></>, btn: <Button variant="contained" color="primary" href="tel:0720055705" fullWidth>Call Now</Button> },
              { icon: <WhatsAppIcon sx={{ fontSize: 48, color: '#25D366' }} />, title: 'WhatsApp', content: <><Typography>0720055705</Typography><Typography>0728167435</Typography></>, btn: <Button variant="contained" onClick={() => openWhatsApp('0720055705')} fullWidth sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' } }}>Chat on WhatsApp</Button> },
              { icon: <EmailIcon sx={{ fontSize: 48, color: 'primary.main' }} />, title: 'Email', content: <Typography>pamutecsolar@gmail.com</Typography>, btn: <Button variant="contained" color="primary" href="mailto:pamutecsolar@gmail.com" fullWidth>Send Email</Button> },
              { icon: <InstagramIcon sx={{ fontSize: 48, color: '#E1306C' }} />, title: 'Instagram', content: <Typography>@pamutecsolarkenya</Typography>, btn: <Button variant="contained" href="https://www.instagram.com/pamutecsolarkenya" target="_blank" fullWidth sx={{ bgcolor: '#E1306C', '&:hover': { bgcolor: '#C13584' } }}>Follow Us</Button> },
              { icon: <FacebookIcon sx={{ fontSize: 48, color: '#1877F2' }} />, title: 'Facebook', content: <Typography>Seven SS Stars Solar</Typography>, btn: <Button variant="contained" href="https://www.facebook.com/pamutecSolarKenya/" target="_blank" fullWidth sx={{ bgcolor: '#1877F2', '&:hover': { bgcolor: '#0d5bbd' } }}>Like Page</Button> },
              { icon: <MessageIcon sx={{ fontSize: 48, color: '#00B2FF' }} />, title: 'Messenger', content: <Typography>Chat with us</Typography>, btn: <Button variant="contained" href="https://m.me/pamutecSolarKenya" target="_blank" fullWidth sx={{ bgcolor: '#00B2FF', '&:hover': { bgcolor: '#0084cc' } }}>Message Us</Button> },
              { icon: <LocationOnIcon sx={{ fontSize: 48, color: 'primary.main' }} />, title: 'Location', content: <Typography>Nairobi, Kenya</Typography>, btn: <Button variant="outlined" color="primary" href="https://www.google.com/maps/place/Atlantis+Business+Park" target="_blank" fullWidth>Get Directions</Button> },
            ].map((c, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <Card sx={{ height: '100%', textAlign: 'center', p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.07)', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(0,0,0,0.13)' } }}>
                    <CardContent>
                      {c.icon}
                      <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', my: 2 }}>{c.title}</Typography>
                      <Box sx={{ mb: 3 }}>{c.content}</Box>
                      {c.btn}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <ProductDialog open={dialogOpen} onClose={() => setDialogOpen(false)} product={selectedProduct} />
    </Box>
  );
}
