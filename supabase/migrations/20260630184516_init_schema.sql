CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,
  icon TEXT NOT NULL
);

CREATE TABLE stores (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  "darkColor" TEXT NOT NULL,
  logo TEXT NOT NULL,
  website TEXT NOT NULL,
  type TEXT NOT NULL
);

CREATE TABLE store_prices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "storeId" TEXT NOT NULL REFERENCES stores(id),
  "productId" TEXT NOT NULL REFERENCES products(id),
  price REAL NOT NULL,
  size TEXT NOT NULL,
  "pricePerUnit" REAL NOT NULL,
  "baseUnit" TEXT NOT NULL,
  "inStock" BOOLEAN NOT NULL DEFAULT true,
  "onOffer" BOOLEAN NOT NULL DEFAULT false,
  "offerNote" TEXT,
  url TEXT,
  UNIQUE("storeId", "productId")
);

-- RLS Policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON products FOR SELECT USING (true);

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON stores FOR SELECT USING (true);

ALTER TABLE store_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON store_prices FOR SELECT USING (true);
