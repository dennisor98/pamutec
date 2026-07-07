'use client';

import Image from 'next/image';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function PricesPageClient() {
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
              Pricing
            </Typography>
            <Typography variant="h6">
              Competitive Prices for Quality Solar Solutions
            </Typography>
          </Container>
        </Box>
      </motion.div>

      {/* Pricing Image */}
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
              <Image
                src="/images/prices.png"
                alt="Seven SS Stars Solar pricing information for water heaters and panels"
                width={1124}
                height={742}
                sizes="(max-width: 1124px) 100vw, 1124px"
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
  );
}
