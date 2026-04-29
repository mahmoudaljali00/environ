-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  "nameAr" TEXT NOT NULL,
  role TEXT NOT NULL,
  "roleAr" TEXT NOT NULL,
  image TEXT NOT NULL,
  bio TEXT,
  "bioAr" TEXT,
  "order" INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  "nameAr" TEXT NOT NULL,
  logo TEXT,
  "order" INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  "nameAr" TEXT NOT NULL,
  role TEXT NOT NULL,
  "roleAr" TEXT NOT NULL,
  text TEXT NOT NULL,
  "textAr" TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  "order" INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample team members
INSERT INTO team_members (id, name, "nameAr", role, "roleAr", image, "order") VALUES
('team-1', 'Ahmed Hassan', 'أحمد حسن', 'CEO & Founder', 'الرئيس التنفيذي والمؤسس', 'https://api.dicebear.com/9.x/lorelei/svg?seed=Ahmed&backgroundColor=009d8e', 1),
('team-2', 'Sara Mohamed', 'سارة محمد', 'Head of Engineering', 'رئيسة الهندسة', 'https://api.dicebear.com/9.x/lorelei/svg?seed=Sara&backgroundColor=009d8e', 2),
('team-3', 'Khalid Ibrahim', 'خالد إبراهيم', 'Energy Director', 'مدير الطاقة', 'https://api.dicebear.com/9.x/lorelei/svg?seed=Khalid&backgroundColor=009d8e', 3),
('team-4', 'Fatima Ali', 'فاطمة علي', 'Project Manager', 'مديرة المشاريع', 'https://api.dicebear.com/9.x/lorelei/svg?seed=Fatima&backgroundColor=009d8e', 4);

-- Insert sample clients
INSERT INTO clients (id, name, "nameAr", "order") VALUES
('client-1', 'Ministry of Energy', 'وزارة الطاقة', 1),
('client-2', 'Khartoum State', 'ولاية الخرطوم', 2),
('client-3', 'UN Agencies', 'وكالات الأمم المتحدة', 3),
('client-4', 'DAL Group', 'مجموعة دال', 4),
('client-5', 'Kenana Sugar', 'كنانة للسكر', 5),
('client-6', 'Sudanese National Bank', 'بنك السودان الوطني', 6),
('client-7', 'Al-Salam Hospital', 'مستشفى السلام', 7),
('client-8', 'IOM Sudan', 'منظمة الهجرة الدولية السودان', 8);

-- Insert sample testimonials
INSERT INTO testimonials (id, name, "nameAr", role, "roleAr", text, "textAr", rating, "order") VALUES
('test-1', 'Bashir Al-Nour', 'بشير النور', 'Infrastructure Director, National Authority', 'مدير البنية التحتية، الهيئة الوطنية', 'ENVIRON delivered our MEP project on time and above expectations. Their engineering precision is unmatched in the region.', 'قدمت إنفايرون مشروع الأعمال الكهروميكانيكية في الوقت المحدد وفوق التوقعات. دقتهم الهندسية لا مثيل لها في المنطقة.', 5, 1),
('test-2', 'Mona Osman', 'منى عثمان', 'CEO, Green Energy Sudan', 'الرئيس التنفيذي، الطاقة الخضراء السودان', 'The solar installation they designed for us exceeded our energy targets by 30%. Professional team with exceptional technical expertise.', 'تجاوز تركيب الطاقة الشمسية الذي صمموه لنا أهدافنا الطاقية بنسبة 30٪. فريق محترف بخبرة فنية استثنائية.', 5, 2),
('test-3', 'James Kariuki', 'جيمس كاريوكي', 'Project Director, UN Agency', 'مدير المشروع، وكالة الأمم المتحدة', 'ENVIRON handled our refugee camp supply chain with great efficiency and care. Reliable partner for complex logistics in challenging environments.', 'تعاملت إنفايرون مع سلسلة توريد مخيم اللاجئين بكفاءة واهتمام كبيرين. شريك موثوق للوجستيات المعقدة في البيئات الصعبة.', 5, 3);
