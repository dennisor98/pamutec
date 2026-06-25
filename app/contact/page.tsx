'use client';

import { Box, Container, Typography, Grid, Card, CardContent, Button, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import MessageIcon from '@mui/icons-material/Message';

export default function ContactPage() {
  const openWhatsApp = (phone: string) => {
    const kenyaPhone = `254${phone.substring(1)}`;
    window.open(`https://wa.me/${kenyaPhone}`, '_blank');
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
              Contact Us
            </Typography>
            <Typography variant="h6">
              Get in Touch with Seven SS Stars Solar
            </Typography>
          </Container>
        </Box>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Container maxWidth="lg" sx={{ py: 12 }}>
          <Grid container spacing={4}>
            {/* Phone Numbers */}
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

            {/* WhatsApp */}
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

            {/* Email */}
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

            

            {/* Instagram */}
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

            {/* Facebook */}
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
                      Seven SS Stars Solar Kenya
                    </Typography>
                    <Button
                      variant="contained"
                      href="https://www.facebook.com/pamutecSolarKenya/"
                      target="_blank"
                      sx={{ width: '100%', bgcolor: '#1877F2', '&:hover': { bgcolor: '#0d5bbd' } }}
                    >
                      Like Page
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Messenger */}
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
                      href="https://m.me/pamutecSolarKenya"
                      target="_blank"
                      sx={{ width: '100%', bgcolor: '#00B2FF', '&:hover': { bgcolor: '#0084cc' } }}
                    >
                      Message Us
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          {/* Location */}
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
                      Kyangombe, Atlantis Business Park
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      href="https://maps.app.goo.gl/AQgVMePU56cZ8mzj8
"
                      sx={{ width: '100%' }}
                    >
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

        </Container>
      </motion.div>
    </Box>
  );
}
