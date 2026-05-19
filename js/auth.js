// ═══════════════════════════════════════════════
//  TETAPAN SUPABASE
// ═══════════════════════════════════════════════
const SUPABASE_URL = 'https://zrhqiymjayqbxogtatip.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyaHFpeW1qYXlxYnhvZ3RhdGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTU3MDQsImV4cCI6MjA5NDc3MTcwNH0.HsF4lTzEPCwTH9ciug8gM72uN-9kJo0Ja3lwH6w8lns';
const APP_URL = 'https://jawikids.vercel.app';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function semakSesi() {
  const { data: { session } } = await sb.auth.getSession();
  return session;
}

async function logMasuk(email, katalaluan) {
  const { data, error } = await sb.auth.signInWithPassword({ email, password: katalaluan });
  if (error) throw error;
  return data;
}

async function daftarPengguna(email, katalaluan, nama, peranan, kelas) {
  const { data, error } = await sb.auth.signUp({
    email,
    password: katalaluan,
    options: {
      emailRedirectTo: APP_URL + '/',
      data: { nama, peranan, kelas }
    }
  });
  if (error) throw error;

  const userId = data.user?.id;
  if (userId) {
    await sb.from('profil').upsert({
      id: userId,
      email, nama, peranan,
      kelas: kelas || null,
      dicipta_pada: new Date().toISOString()
    });
  }
  return data;
}

async function logKeluar() {
  await sb.auth.signOut();
  window.location.href = APP_URL + '/';
}

async function ambilProfil(userId) {
  const { data, error } = await sb.from('profil').select('*').eq('id', userId).single();
  if (!error && data) return data;

  // Fallback: bina dari user metadata
  const { data: { user } } = await sb.auth.getUser();
  if (user?.user_metadata?.nama) {
    const profil = {
      id: user.id,
      email: user.email,
      nama: user.user_metadata.nama,
      peranan: user.user_metadata.peranan || 'murid',
      kelas: user.user_metadata.kelas || null,
    };
    await sb.from('profil').upsert(profil);
    return profil;
  }
  return null;
}

async function simpanRekod({ userId, nama, kelas, mod, betul, jumlah, peratus }) {
  const { error } = await sb.from('rekod_kuiz').insert({
    user_id: userId,
    nama, kelas, mod,
    betul, jumlah, peratus,
    masa: new Date().toISOString()
  });
  if (error) console.error('Ralat simpan rekod:', error);
}

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

async function ambilSemuaRekod() {
  const { data, error } = await sb
    .from('rekod_kuiz')
    .select('*')
    .order('masa', { ascending: false });
  if (error) return [];
  return data;
}

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
