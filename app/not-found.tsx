import type { Metadata } from 'next';
import Link from 'next/link';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SearchIcon from '@mui/icons-material/Search';

// P2 hygiene fix -- audit item 2.3 "Missing Custom 404 Page". Previously
// any broken/old link (e.g. from the old brand's indexed pages, a typo, or
// a stale backlink) hit Next.js's generic default 404 with no way back into
// the site. This page links back to the homepage, product categories,
// search/catalog, and a direct contact channel, per the audit's checklist.
export const metadata: Metadata = {
  title: 'Page Not Found | Seven SS Stars Solar',
  robots: { index: false, follow: true },
};

const categoryLinks = [
  { href: '/catalog', label: 'Water Heating Solar Panels' },
  { href: '/catalog', label: 'Solar Batteries' },
  { href: '/catalog', label: 'LEDs & Street Lights' },
];

export default function NotFound() {
  return (
    <Box sx={{ py: 14, textAlign: 'center', minHeight: '60vh' }}>
      <Container maxWidth="sm">
        <Typography variant="h1" sx={{ fontSize: 96, fontWeight: 900, color: 'primary.main', lineHeight: 1 }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, mt: 2 }}>
          We couldn't find that page
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 5 }}>
          The page you're looking for may have moved or no longer exists. Here are some places to go instead:
        </Typography>

        <Grid container spacing={2} justifyContent="center" sx={{ mb: 5 }}>
          <Grid item>
            <Button component={Link} href="/" variant="contained" startIcon={<HomeIcon />}>
              Back to Homepage
            </Button>
          </Grid>
          <Grid item>
            <Button component={Link} href="/catalog" variant="outlined" startIcon={<SearchIcon />}>
              Browse Catalog
            </Button>
          </Grid>
          <Grid item>
            <Button
              href="https://wa.me/254720055705"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<WhatsAppIcon />}
              sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' } }}
            >
              Chat on WhatsApp
            </Button>
          </Grid>
        </Grid>

        <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 700, mb: 1.5 }}>
          Popular product categories
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 4 }}>
          {categoryLinks.map((c) => (
            <Link key={c.label} href={c.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="body2" sx={{ px: 2, py: 1, borderRadius: 2, bgcolor: 'rgba(89,182,61,0.08)', '&:hover': { bgcolor: 'rgba(89,182,61,0.16)' } }}>
                {c.label}
              </Typography>
            </Link>
          ))}
        </Box>

        <Typography variant="body2" color="text.secondary">
          Or call us on <a href="tel:0720055705">0720 055 705</a> / <a href="tel:0728167435">0728 167 435</a>
        </Typography>
      </Container>
    </Box>
  );
}
