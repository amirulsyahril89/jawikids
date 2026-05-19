// ═══════════════════════════════════════════════
//  TETAPAN SUPABASE — ISI URL DAN KEY ANDA DI SINI
// ═══════════════════════════════════════════════
const SUPABASE_URL = 'MASUKKAN_URL_SUPABASE_ANDA';
const SUPABASE_KEY = 'MASUKKAN_ANON_KEY_SUPABASE_ANDA';

// Mulakan klien Supabase
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ───────────────────────────────────────────────
//  SEMAK SESI SEMASA MUAT
// ───────────────────────────────────────────────
async function semakSesi() {
  const { data: { session } } = await sb.auth.getSession();
  return session;
}

// ───────────────────────────────────────────────
//  LOG MASUK
// ───────────────────────────────────────────────
async function logMasuk(email, katalaluan) {
  const { data, error } = await sb.auth.signInWithPassword({ email, password: katalaluan });
  if (error) throw error;
  return data;
}

// ───────────────────────────────────────────────
//  DAFTAR PENGGUNA BARU
// ───────────────────────────────────────────────
async function daftarPengguna(email, katalaluan, nama, peranan, kelas) {
  const { data, error } = await sb.auth.signUp({
    email, password: katalaluan,
    options: { data: { nama, peranan, kelas } }
  });
  if (error) throw error;

  // Simpan profil ke jadual 'profil'
  if (data.user) {
    await sb.from('profil').upsert({
      id: data.user.id,
      email, nama, peranan, kelas,
      dicipta_pada: new Date().toISOString()
    });
  }
  return data;
}

// ───────────────────────────────────────────────
//  LOG KELUAR
// ───────────────────────────────────────────────
async function logKeluar() {
  await sb.auth.signOut();
  window.location.href = 'index.html';
}

// ───────────────────────────────────────────────
//  AMBIL PROFIL PENGGUNA
// ───────────────────────────────────────────────
async function ambilProfil(userId) {
  const { data, error } = await sb.from('profil').select('*').eq('id', userId).single();
  if (error) return null;
  return data;
}

// ───────────────────────────────────────────────
//  SIMPAN REKOD KUIZ
// ───────────────────────────────────────────────
async function simpanRekod({ userId, nama, kelas, mod, betul, jumlah, peratus }) {
  const { error } = await sb.from('rekod_kuiz').insert({
    user_id: userId,
    nama, kelas, mod,
    betul, jumlah, peratus,
    masa: new Date().toISOString()
  });
  if (error) console.error('Ralat simpan rekod:', error);
}

// ───────────────────────────────────────────────
//  AMBIL LEADERBOARD
// ───────────────────────────────────────────────
async function ambilLeaderboard(had = 10) {
  const { data, error } = await sb
    .from('rekod_kuiz')
    .select('nama, kelas, peratus, betul, jumlah, masa')
    .order('peratus', { ascending: false })
    .order('betul', { ascending: false })
    .limit(had);
  if (error) return [];
  return data;
}

// ───────────────────────────────────────────────
//  AMBIL SEMUA REKOD (UNTUK GURU)
// ───────────────────────────────────────────────
async function ambilSemuaRekod() {
  const { data, error } = await sb
    .from('rekod_kuiz')
    .select('*')
    .order('masa', { ascending: false });
  if (error) return [];
  return data;
}

// ───────────────────────────────────────────────
//  AMBIL REKOD MURID SENDIRI
// ───────────────────────────────────────────────
async function ambilRekodSendiri(userId) {
  const { data, error } = await sb
    .from('rekod_kuiz')
    .select('*')
    .eq('user_id', userId)
    .order('masa', { ascending: false })
    .limit(20);
  if (error) return [];
  return data;
}
