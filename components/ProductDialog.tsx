'use client';
import { Dialog, DialogContent, DialogTitle, IconButton, Box, Typography, Button, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { motion } from 'framer-motion';

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: {
    name: string;
    image?: string;
    image_url?: string;
    description?: string;
    price?: string | number;
    currency?: string;
  } | null;
}

export default function ProductDialog({ open, onClose, product }: ProductDialogProps) {
  if (!product) return null;
  const imageUrl = product.image_url || product.image;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ m: 0, p: 2, borderBottom: '1px solid #e2e8f0' }}>
        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold', pr: 4 }}>{product.name}</Typography>
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }}>
          {imageUrl && (
            <Box sx={{ bgcolor: '#f8fafc' }}>
              <img src={imageUrl} alt={product.name} style={{ width: '100%', maxHeight: 380, objectFit: 'contain', display: 'block' }} />
            </Box>
          )}
          <Box sx={{ p: 3 }}>
            {product.price && (
              <Chip label={`${product.currency || 'KES'} ${Number(product.price).toLocaleString()}`} sx={{ bgcolor: '#f0fdf4', color: '#16a34a', fontWeight: 800, fontSize: 16, height: 36, mb: 2 }} />
            )}
            {product.description && (
              <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', mb: 3 }}>{product.description}</Typography>
            )}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" startIcon={<WhatsAppIcon />} onClick={() => window.open('https://wa.me/254720055705', '_blank')} sx={{ flex: 1, bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' } }}>
                Inquire on WhatsApp
              </Button>
              <Button variant="outlined" onClick={onClose} sx={{ flex: 1 }}>Close</Button>
            </Box>
          </Box>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
