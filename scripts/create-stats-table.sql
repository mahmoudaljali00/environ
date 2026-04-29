-- Create stats table for managing hero section statistics
CREATE TABLE IF NOT EXISTS stats (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  key         TEXT NOT NULL UNIQUE,           -- internal key: "projects" | "clients" | "years" | "countries"
  value       TEXT NOT NULL,                  -- display value e.g. "200+"
  label_en    TEXT NOT NULL,                  -- English label
  label_ar    TEXT NOT NULL,                  -- Arabic label
  sort_order  INTEGER NOT NULL DEFAULT 0,
  published   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed the four default stats
INSERT INTO stats (key, value, label_en, label_ar, sort_order) VALUES
  ('projects',  '200+', 'Projects Delivered', 'مشاريع منجزة',       1),
  ('clients',   '150+', 'Clients Served',     'عميل خدمناهم',        2),
  ('years',     '15+',  'Years Experience',   'سنوات من الخبرة',     3),
  ('countries', '5+',   'Countries Reached',  'دول وصلنا إليها',     4)
ON CONFLICT (key) DO NOTHING;
