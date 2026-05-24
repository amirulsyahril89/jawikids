# 🗄️ Panduan Setup Supabase — JawiKids

Ikut langkah ini **sebelum** deploy app ke Vercel.
Anggaran masa: **15–20 minit**

---

## LANGKAH 1 — Daftar Supabase

1. Pergi ke **https://supabase.com**
2. Klik **Start your project**
3. Log masuk dengan akaun GitHub (paling mudah)
4. Klik **New project**
5. Isi:
   - **Name**: `jawikids`
   - **Database Password**: Buat password kuat, simpan di tempat selamat
   - **Region**: Southeast Asia (Singapore)
6. Klik **Create new project** — tunggu 1-2 minit

---

## LANGKAH 2 — Ambil URL & Anon Key

1. Dalam dashboard Supabase, klik **Settings** (ikon gear kiri bawah)
2. Klik **API**
3. Salin dua nilai ini:
   - **Project URL** — contoh: `https://abcxyz.supabase.co`
   - **anon public key** — rentetan panjang bermula `eyJ...`

Simpan kedua-dua nilai ini — akan digunakan dalam kod app.

---

## LANGKAH 3 — Buat Jadual Database

Pergi ke **SQL Editor** dalam Supabase, klik **New query**, tampal SQL di bawah dan klik **Run**:

```sql
-- ══════════════════════════════════════════
-- JAWIKIDS DATABASE SCHEMA
-- ══════════════════════════════════════════

-- 1. Jadual kelas (dicipta oleh guru)
CREATE TABLE classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_kelas TEXT NOT NULL,
  kod_kelas TEXT UNIQUE NOT NULL,
  guru_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Jadual murid
CREATE TABLE students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama TEXT NOT NULL,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(nama, class_id)
);

-- 3. Jadual sesi latihan
CREATE TABLE sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  kumpulan_id TEXT NOT NULL,
  kumpulan_nama TEXT NOT NULL,
  fasa TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  total_soalan INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT now(),
  ended_at TIMESTAMPTZ
);

-- 4. Jadual rekod jawapan (per huruf)
CREATE TABLE answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  huruf_char TEXT NOT NULL,
  huruf_name TEXT NOT NULL,
  mod_soalan TEXT NOT NULL,
  betul BOOLEAN NOT NULL,
  masa_jawab_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ══════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ══════════════════════════════════════════

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

-- Guru boleh buat dan lihat kelas sendiri sahaja
CREATE POLICY "guru_manage_classes" ON classes
  FOR ALL USING (auth.uid() = guru_id);

-- Sesiapa boleh baca kelas (untuk murid verify kod kelas)
CREATE POLICY "public_read_classes" ON classes
  FOR SELECT USING (true);

-- Sesiapa boleh baca dan tambah murid (murid log masuk)
CREATE POLICY "public_read_students" ON students
  FOR SELECT USING (true);

CREATE POLICY "public_insert_students" ON students
  FOR INSERT WITH CHECK (true);

-- Sesiapa boleh tambah dan baca sesi
CREATE POLICY "public_manage_sessions" ON sessions
  FOR ALL USING (true);

-- Sesiapa boleh tambah dan baca jawapan
CREATE POLICY "public_manage_answers" ON answers
  FOR ALL USING (true);
```

---

## LANGKAH 4 — Tetapkan Auth (Untuk Guru)

1. Pergi ke **Authentication → Providers**
2. Pastikan **Email** provider **ON**
3. Pergi ke **Authentication → Email Templates**
4. Tukar bahasa template kepada Bahasa Malaysia jika mahu (pilihan)

---

## LANGKAH 5 — Masukkan Credentials ke Dalam App

Buka fail `auth.html` (yang akan dibuat), cari bahagian ini dan ganti:

```javascript
const SUPABASE_URL = 'MASUKKAN_URL_ANDA_DI_SINI';
const SUPABASE_ANON_KEY = 'MASUKKAN_ANON_KEY_ANDA_DI_SINI';
```

---

## Struktur Fail Lengkap

```
jawi-flashcard/
├── index.html          ← Flash card (dah ada)
├── auth.html           ← Login guru & murid (baru)
├── dashboard.html      ← Dashboard guru (baru)
├── games/
│   └── index.html      ← 4 games (dah ada)
└── PANDUAN_SUPABASE.md ← Panduan ini
```

---

## Selepas Setup

Beritahu apabila langkah 1–5 selesai.
Saya akan bantu debug jika ada masalah semasa setup.
