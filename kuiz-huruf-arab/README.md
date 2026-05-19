# 📖 Panduan Pemasangan — Kuiz Huruf Arab

## Struktur Fail
```
kuiz-huruf-arab/
├── index.html          ← Halaman log masuk / daftar
├── murid.html          ← Halaman kuiz untuk murid
├── guru.html           ← Dashboard guru (rekod & leaderboard)
├── SETUP_DATABASE.sql  ← SQL untuk Supabase (jalankan sekali)
├── css/
│   └── style.css       ← Semua gaya visual
└── js/
    ├── auth.js         ← Log masuk, daftar, sambungan Supabase
    └── kuiz.js         ← Logik kuiz & data huruf Arab
```

---

## LANGKAH 1 — Setup Supabase (5 minit)

1. Log masuk di https://supabase.com
2. Buka projek anda
3. Klik **SQL Editor** di sebelah kiri
4. Copy semua kandungan fail `SETUP_DATABASE.sql`
5. Tampal dalam SQL Editor dan klik **RUN**
6. ✅ Pangkalan data sudah bersedia!

---

## LANGKAH 2 — Deploy ke Netlify (5 minit)

### Cara paling mudah: Drag & Drop
1. Daftar percuma di https://netlify.com
2. Klik **"Add new site"** → **"Deploy manually"**
3. **Drag & drop** keseluruhan folder `kuiz-huruf-arab` ke dalam kotak yang disediakan
4. Tunggu beberapa saat — Netlify akan bagi link seperti:
   `https://nama-rawak-anda.netlify.app`
5. ✅ Aplikasi sudah hidup!

---

## LANGKAH 3 — Daftar akaun guru pertama

1. Buka link Netlify anda
2. Klik **Daftar**
3. Pilih peranan: **Guru**
4. Isi nama dan e-mel
5. Log masuk → anda akan masuk ke dashboard guru

---

## Ciri-ciri Aplikasi

### Untuk Murid:
- 3 mod kuiz: Huruf→Bunyi, Bunyi→Huruf, Keluarga Huruf
- Petua mnemonik setiap soalan
- Bunyi sebutan Arab (perlu internet)
- Rekod kemajuan peribadi

### Untuk Guru:
- Lihat semua rekod murid
- Tapis ikut mod kuiz
- Papan mata (leaderboard)
- Cari rekod ikut nama atau kelas

---

## Soalan Lazim

**Murid tidak dapat log masuk?**
Pastikan mereka sudah sahkan e-mel (semak inbox/spam).

**Bunyi tidak kedengaran?**
Fungsi bunyi menggunakan Web Speech API — berfungsi di Chrome/Edge. Pastikan volume tidak di-mute.

**Nak tambah murid secara pukal?**
Buat akaun Supabase dan gunakan fungsi `auth.admin.createUser()` atau minta murid daftar sendiri.

---

## Sokongan

Jika ada masalah teknikal, bawa fail ini dan tanya semula kepada Claude.
