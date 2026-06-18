'use client';

import { Dialog, DialogContent, DialogTitle, IconButton, Box, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: {
    name: string;
    image: string;
    description?: string;
  } | null;
}

export default function ProductDialog({ open, onClose, product }: ProductDialogProps) {
  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {/* <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          {product.name}
        </Typography> */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Box sx={{ mb: 3 }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: 500,
                objectFit: 'contain',
                borderRadius: 8,
              }}
            />
          </Box>
          {/* {product.description && (
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
              {product.description}
            </Typography>
          )} */}
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.open(`https://wa.me/254720055705`, '_blank')}
              sx={{ flex: 1 }}
            >
              Contact on WhatsApp
            </Button>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{ flex: 1 }}
            >
              Close
            </Button>
          </Box>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
