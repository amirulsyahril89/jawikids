# 🗄️ Panduan Setup Supabase — JawiKids

Ikut langkah ini sebelum deploy ke Vercel.
**Anggaran masa: 15–20 minit**

---

## LANGKAH 1 — Daftar & Buat Projek

1. Pergi ke **https://supabase.com** → klik **Start your project**
2. Log masuk dengan GitHub
3. Klik **New project**, isi:
   - **Name**: `jawikids`
   - **Database Password**: Buat password kuat, simpan baik-baik
   - **Region**: Southeast Asia (Singapore)
4. Klik **Create new project** — tunggu 1–2 minit

---

## LANGKAH 2 — Ambil Credentials

1. Klik **Settings** (gear icon) → **API**
2. Salin dua nilai ini:
   - **Project URL** → contoh: `https://abcxyz.supabase.co`
   - **anon public key** → bermula dengan `eyJ...`

---

## LANGKAH 3 — Buat Jadual Database

Pergi ke **SQL Editor** → **New query**, tampal SQL ini, klik **Run**:

```sql
-- JADUAL KELAS
CREATE TABLE classes (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_kelas  TEXT NOT NULL,
  kod_kelas   TEXT UNIQUE NOT NULL,
  guru_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- JADUAL MURID (dengan xp untuk leaderboard)
CREATE TABLE students (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama        TEXT NOT NULL,
  class_id    UUID REFERENCES classes(id) ON DELETE CASCADE,
  xp          INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE(nama, class_id)
);

-- JADUAL SESI LATIHAN
CREATE TABLE sessions (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id    UUID REFERENCES students(id) ON DELETE CASCADE,
  kumpulan_id   TEXT NOT NULL,
  kumpulan_nama TEXT NOT NULL,
  fasa          TEXT NOT NULL,
  score         INTEGER DEFAULT 0,
  total_soalan  INTEGER DEFAULT 0,
  started_at    TIMESTAMPTZ DEFAULT now(),
  ended_at      TIMESTAMPTZ
);

-- JADUAL REKOD JAWAPAN (per huruf)
CREATE TABLE answers (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id    UUID REFERENCES sessions(id) ON DELETE CASCADE,
  student_id    UUID REFERENCES students(id) ON DELETE CASCADE,
  huruf_char    TEXT NOT NULL,
  huruf_name    TEXT NOT NULL,
  mod_soalan    TEXT NOT NULL,
  betul         BOOLEAN NOT NULL,
  masa_jawab_ms INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ROW LEVEL SECURITY
ALTER TABLE classes  ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers  ENABLE ROW LEVEL SECURITY;

-- POLISI KELAS
CREATE POLICY "guru_manage_classes" ON classes
  FOR ALL USING (auth.uid() = guru_id);
CREATE POLICY "public_read_classes" ON classes
  FOR SELECT USING (true);

-- POLISI MURID
CREATE POLICY "public_read_students"   ON students FOR SELECT USING (true);
CREATE POLICY "public_insert_students" ON students FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_students" ON students FOR UPDATE USING (true);

-- POLISI SESI & JAWAPAN
CREATE POLICY "public_manage_sessions" ON sessions FOR ALL USING (true);
CREATE POLICY "public_manage_answers"  ON answers  FOR ALL USING (true);
```

---

## LANGKAH 4 — Masukkan Credentials ke Dalam App

Buka **ketiga-tiga** fail ini dan gantikan nilai di bahagian atas:

### `index.html`
```javascript
const SUPABASE_URL  = 'https://xxxxxx.supabase.co';
const SUPABASE_ANON = 'eyJ...xxxxxxxx';
```

### `auth.html`
```javascript
const SUPABASE_URL     = 'https://xxxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...xxxxxxxx';
```

### `dashboard.html`
```javascript
const SUPABASE_URL     = 'https://xxxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...xxxxxxxx';
```

---

## LANGKAH 5 — Deploy ke Vercel

1. Pergi ke **https://vercel.com** → log masuk dengan GitHub
2. Klik **Add New Project**
3. Import repositori GitHub projek ini
4. Biarkan tetapan default (Vercel akan detect sebagai Static Site)
5. Klik **Deploy**
6. Selesai! URL app Ustaz Wan akan terpapar (cth: `jawikids.vercel.app`)

> **Penting:** `vercel.json` sudah disediakan dalam projek untuk routing yang betul.

---

## Struktur Fail Lengkap

```
jawikids/
├── index.html          ← App utama (flash card)
├── auth.html           ← Log masuk guru & murid
├── dashboard.html      ← Dashboard guru
├── vercel.json         ← Konfigurasi Vercel
├── PANDUAN_SUPABASE.md ← Panduan ini
└── audio/              ← Folder audio (Ustaz Wan tambah sendiri)
    ├── ba.m4a
    ├── ta.m4a
    └── ...
```

---

## Audio

Rekod 34 huruf dalam format `.m4a` dan simpan dalam folder `audio/`:

`alif, ba, ta, tha, jim, ha, kha, dal, zal, ra, zai, sin, syin, sad, dad, ta-tebal, zha, ain, ghain, fa, qaf, kaf, lam, mim, nun, wau, ya, ta-marbutah, ca, nga, pa, ga, nya, va`

---

*Selamat! Hubungi Ustaz Wan jika ada masalah semasa setup.*
