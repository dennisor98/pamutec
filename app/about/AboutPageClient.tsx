'use client';

import Image from 'next/image';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import company from '@/lib/data/company.json';

export default function AboutPageClient() {
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
              About Us
            </Typography>
            <Typography variant="h6">
              {company.name}
            </Typography>
          </Container>
        </Box>
      </motion.div>

      {/* Main Content */}
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
                  <Image
                    src="/images/abt.png"
                    alt="About Seven SS Stars Solar - our team and solar water heater installations"
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
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

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
       
      </motion.div>

      {/* Mission Section */}
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
  );
}