import Link from 'next/link';
import { Box, Typography, Container, Grid, IconButton } from '@mui/material';
import navigation from '@/lib/data/navigation.json';
import company from '@/lib/data/company.json';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import MessageIcon from '@mui/icons-material/Message';

export default function Footer() {
  const openWhatsApp = (phone: string) => {
    const kenyaPhone = `254${phone.substring(1)}`;
    window.open(`https://wa.me/${kenyaPhone}`, '_blank');
  };

  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              {company.name}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              {company.tagline}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {company.description}
            </Typography>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">0720055705</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">0728167435</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">pamutecsolar@gmail.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WhatsAppIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">Chat on WhatsApp</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Social Media & Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <IconButton
                href="https://www.instagram.com/pamutecsolarkenya"
                target="_blank"
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="https://www.facebook.com/PamutecSolarKenya/"
                target="_blank"
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://m.me/PamutecSolarKenya"
                target="_blank"
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
              >
                <MessageIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {navigation.footerNav.map((item) => (
                <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                    {item.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 6, pt: 4, borderTop: 1, borderColor: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} {company.footer}. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
