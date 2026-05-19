-- ═══════════════════════════════════════════════════════════
--  KUIZ HURUF ARAB — SETUP PANGKALAN DATA SUPABASE
--  Jalankan SQL ini di: Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════

-- 1. JADUAL PROFIL PENGGUNA
CREATE TABLE IF NOT EXISTS profil (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  nama TEXT NOT NULL,
  peranan TEXT NOT NULL CHECK (peranan IN ('murid', 'guru')),
  kelas TEXT,
  dicipta_pada TIMESTAMPTZ DEFAULT NOW()
);

-- 2. JADUAL REKOD KUIZ
CREATE TABLE IF NOT EXISTS rekod_kuiz (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nama TEXT,
  kelas TEXT,
  mod TEXT NOT NULL CHECK (mod IN ('bunyi', 'huruf', 'keluarga')),
  betul INTEGER NOT NULL DEFAULT 0,
  jumlah INTEGER NOT NULL DEFAULT 0,
  peratus INTEGER NOT NULL DEFAULT 0,
  masa TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ROW LEVEL SECURITY (RLS)
ALTER TABLE profil ENABLE ROW LEVEL SECURITY;
ALTER TABLE rekod_kuiz ENABLE ROW LEVEL SECURITY;

-- Profil: pengguna boleh baca/tulis profil sendiri sahaja
CREATE POLICY "Profil sendiri" ON profil
  FOR ALL USING (auth.uid() = id);

-- Rekod: pengguna boleh baca rekod sendiri
CREATE POLICY "Baca rekod sendiri" ON rekod_kuiz
  FOR SELECT USING (auth.uid() = user_id);

-- Rekod: pengguna boleh insert rekod sendiri
CREATE POLICY "Tulis rekod sendiri" ON rekod_kuiz
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Guru boleh baca SEMUA rekod (semak peranan dari jadual profil)
CREATE POLICY "Guru baca semua rekod" ON rekod_kuiz
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profil
      WHERE profil.id = auth.uid()
      AND profil.peranan = 'guru'
    )
  );

-- Guru boleh baca semua profil
CREATE POLICY "Guru baca semua profil" ON profil
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profil p2
      WHERE p2.id = auth.uid()
      AND p2.peranan = 'guru'
    )
  );

-- 4. INDEX untuk prestasi pertanyaan
CREATE INDEX IF NOT EXISTS idx_rekod_user ON rekod_kuiz(user_id);
CREATE INDEX IF NOT EXISTS idx_rekod_masa ON rekod_kuiz(masa DESC);
CREATE INDEX IF NOT EXISTS idx_rekod_peratus ON rekod_kuiz(peratus DESC);

-- ═══════════════════════════════════════════════════════════
--  SELESAI! Tekan RUN dan pangkalan data sudah bersedia.
-- ═══════════════════════════════════════════════════════════
