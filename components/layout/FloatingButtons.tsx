'use client';

import { useState, useEffect } from 'react';
import { Fab, Box, Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = (phone: string) => {
    const kenyaPhone = `254${phone.substring(1)}`;
    window.open(`https://wa.me/${kenyaPhone}`, '_blank');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        zIndex: 1000,
      }}
    >
      {/* WhatsApp Button */}
      <Tooltip title="Contact us on WhatsApp">
        <Fab
          color="success"
          aria-label="WhatsApp"
          onClick={() => openWhatsApp('0720055705')}
          sx={{
            bgcolor: '#25D366',
            '&:hover': { bgcolor: '#128C7E' },
          }}
        >
          <WhatsAppIcon />
        </Fab>
      </Tooltip>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Tooltip title="Scroll to top">
          <Fab
            color="primary"
            aria-label="scroll to top"
            onClick={scrollToTop}
            size="small"
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Tooltip>
      )}
    </Box>
  );
}
