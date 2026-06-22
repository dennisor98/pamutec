-- Seven SS Stars Solar CMS Database Schema

-- About section content
CREATE TABLE IF NOT EXISTS about_content (
  id SERIAL PRIMARY KEY,
  heading TEXT NOT NULL DEFAULT 'About Seven SS Stars Solar',
  description TEXT NOT NULL DEFAULT '',
  mission TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table (featured products on homepage)
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(12, 2),
  currency TEXT NOT NULL DEFAULT 'KES',
  image_url TEXT,
  is_featured BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Catalog categories
CREATE TABLE IF NOT EXISTS catalog_categories (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Catalog items
CREATE TABLE IF NOT EXISTS catalog_items (
  id SERIAL PRIMARY KEY,
  category_id INT NOT NULL REFERENCES catalog_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(12, 2),
  currency TEXT NOT NULL DEFAULT 'KES',
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial about content if empty
INSERT INTO about_content (heading, description, mission)
SELECT
  'About Seven SS Stars Solar',
  'Seven SS Stars Solar is a leading manufacturer of thermal solar energy technologies. We have been designing and producing high-quality solar water heaters for over 13 years.',
  'We are committed to providing clean, reliable, and affordable solar energy solutions for homes and businesses around the world.'
WHERE NOT EXISTS (SELECT 1 FROM about_content);

-- Seed catalog categories if empty
INSERT INTO catalog_categories (slug, name, sort_order)
SELECT * FROM (VALUES
  ('water-heating', 'Water Heating Solar Panels', 1),
  ('solar-batteries', 'Solar Batteries', 2),
  ('leds-street-lights', 'LEDs & Street Lights', 3)
) AS v(slug, name, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM catalog_categories);

-- Seed featured products if empty
INSERT INTO products (name, description, price, currency, image_url, is_featured, sort_order)
SELECT * FROM (VALUES
  ('Solar Water Heaters', 'High-quality solar water heaters for residential and commercial use', 35000.00, 'KES', '/images/swh.jpg', true, 1),
  ('Solar Panels', 'Efficient solar panels for energy generation', 25000.00, 'KES', '/images/s_pannel.jpg', true, 2),
  ('Gel Batteries', 'Reliable gel batteries for energy storage', 18000.00, 'KES', '/images/ssb1.jpeg', true, 3),
  ('Lithium Batteries', 'Advanced lithium batteries for optimal performance', 45000.00, 'KES', '/images/ssb2.png', true, 4),
  ('Solar Lights', 'Energy-efficient solar lighting solutions', 5500.00, 'KES', '/images/s_glight.jpg', true, 5),
  ('Garden Lights', 'Beautiful garden lights powered by solar energy', 3500.00, 'KES', '/images/grdlight.jpg', true, 6)
) AS v(name, description, price, currency, image_url, is_featured, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM products);
