// ═══════════════════════════════════════════════
//  DATA HURUF ARAB + FATHAH
// ═══════════════════════════════════════════════
const semuaHuruf = [
  { ar: 'اَ', bunyi: 'A',   mnemonic: 'Ayam',                  keluarga: 'asas',     titik: 'tiada titik' },
  { ar: 'بَ', bunyi: 'BA',  mnemonic: 'Basikal',               keluarga: 'ba-ta-sa', titik: '1 titik bawah' },
  { ar: 'تَ', bunyi: 'TA',  mnemonic: 'Tapi',                  keluarga: 'ba-ta-sa', titik: '2 titik atas' },
  { ar: 'ثَ', bunyi: 'SA',  mnemonic: 'Sapu (3 titik)',        keluarga: 'ba-ta-sa', titik: '3 titik atas' },
  { ar: 'جَ', bunyi: 'JA',  mnemonic: 'Jambu',                 keluarga: 'ja-ha-kha', titik: '1 titik dalam' },
  { ar: 'حَ', bunyi: 'HA',  mnemonic: 'Hawa (tiada titik)',    keluarga: 'ja-ha-kha', titik: 'tiada titik' },
  { ar: 'خَ', bunyi: 'KHA', mnemonic: 'Khas (1 titik atas)',   keluarga: 'ja-ha-kha', titik: '1 titik atas' },
  { ar: 'دَ', bunyi: 'DA',  mnemonic: 'Daun',                  keluarga: 'da-za',    titik: 'tiada titik' },
  { ar: 'ذَ', bunyi: 'ZA',  mnemonic: 'Zaitun (1 titik)',      keluarga: 'da-za',    titik: '1 titik atas' },
  { ar: 'رَ', bunyi: 'RA',  mnemonic: 'Rambut',                keluarga: 'ra-za',    titik: 'tiada titik' },
  { ar: 'زَ', bunyi: 'ZA',  mnemonic: 'Zakat (1 titik)',       keluarga: 'ra-za',    titik: '1 titik atas' },
  { ar: 'سَ', bunyi: 'SA',  mnemonic: 'Sayur',                 keluarga: 'sa-sya',   titik: 'tiada titik' },
  { ar: 'شَ', bunyi: 'SYA', mnemonic: 'Syampu (3 titik)',      keluarga: 'sa-sya',   titik: '3 titik atas' },
  { ar: 'صَ', bunyi: 'SO',  mnemonic: 'Solat',                 keluarga: 'so-do',    titik: 'tiada titik' },
  { ar: 'ضَ', bunyi: 'DO',  mnemonic: 'Dodol (1 titik)',       keluarga: 'so-do',    titik: '1 titik atas' },
  { ar: 'طَ', bunyi: 'TO',  mnemonic: 'Topi',                  keluarga: 'to-zo',    titik: 'tiada titik' },
  { ar: 'ظَ', bunyi: 'ZO',  mnemonic: 'Zohor (1 titik)',       keluarga: 'to-zo',    titik: '1 titik atas' },
  { ar: 'عَ', bunyi: "'A",  mnemonic: 'Tekak',                 keluarga: 'ain-ghain', titik: 'tiada titik' },
  { ar: 'غَ', bunyi: 'GHA', mnemonic: 'Ghaib (1 titik)',       keluarga: 'ain-ghain', titik: '1 titik atas' },
  { ar: 'فَ', bunyi: 'FA',  mnemonic: 'Fahmi (1 titik)',       keluarga: 'fa-qa',    titik: '1 titik atas' },
  { ar: 'قَ', bunyi: 'QA',  mnemonic: 'Qalam (2 titik)',       keluarga: 'fa-qa',    titik: '2 titik atas' },
  { ar: 'كَ', bunyi: 'KA',  mnemonic: 'Kain',                  keluarga: 'asas',     titik: 'tiada titik' },
  { ar: 'لَ', bunyi: 'LA',  mnemonic: 'Layang-layang',         keluarga: 'asas',     titik: 'tiada titik' },
  { ar: 'مَ', bunyi: 'MA',  mnemonic: 'Mata',                  keluarga: 'asas',     titik: 'tiada titik' },
  { ar: 'نَ', bunyi: 'NA',  mnemonic: 'Nasi (1 titik)',        keluarga: 'asas',     titik: '1 titik atas' },
  { ar: 'وَ', bunyi: 'WA',  mnemonic: 'Wajah',                 keluarga: 'asas',     titik: 'tiada titik' },
  { ar: 'هَ', bunyi: 'HA',  mnemonic: 'Halus',                 keluarga: 'asas',     titik: 'tiada titik' },
  { ar: 'يَ', bunyi: 'YA',  mnemonic: 'Yakin (2 titik bawah)', keluarga: 'asas',     titik: '2 titik bawah' },
];

const keluargaData = {
  'ba-ta-sa':  { label: 'ب ت ث', cerita: 'Bot pergi jauh, Tapi balik, Sapa kawan' },
  'ja-ha-kha': { label: 'ج ح خ', cerita: 'Jambu untuk Hawa, Khas untuknya' },
  'da-za':     { label: 'د ذ',   cerita: 'Daun pokok Zaitun' },
  'ra-za':     { label: 'ر ز',   cerita: 'Rambut Zahra' },
  'sa-sya':    { label: 'س ش',   cerita: 'Sayur dalam Syampu? (lucu = mudah ingat!)' },
  'so-do':     { label: 'ص ض',   cerita: 'Solat makan Dodol' },
  'to-zo':     { label: 'ط ظ',   cerita: 'Topi Zohor' },
  'ain-ghain': { label: 'ع غ',   cerita: 'Tekak... Ghaib! (titik = ghaib ke atas)' },
  'fa-qa':     { label: 'ف ق',   cerita: 'Fahmi ada Qalam' },
};

// ═══════════════════════════════════════════════
//  STATUS KUIZ
// ═══════════════════════════════════════════════
let modSemasa = null;
let hurufSemasa = null;
let pilihanSemasa = [];
let sudahJawab = false;
let betulCount = 0;
let salahCount = 0;
let soalanCount = 0;
let kolam = [];
let kolamIdx = 0;
let kelSemasa = 'ba-ta-sa';
let profil = null;

// ═══════════════════════════════════════════════
//  UTILITI
// ═══════════════════════════════════════════════
function kacau(arr) { return arr.slice().sort(() => Math.random() - 0.5); }

function kemaskiniStat() {
  const el = (id) => document.getElementById(id);
  if (el('stat-betul')) el('stat-betul').textContent = betulCount;
  if (el('stat-salah')) el('stat-salah').textContent = salahCount;
  if (el('stat-soalan')) el('stat-soalan').textContent = soalanCount;
  const pct = soalanCount === 0 ? 0 : Math.round((betulCount / soalanCount) * 100);
  if (el('progress-isi')) el('progress-isi').style.width = pct + '%';
}

// ═══════════════════════════════════════════════
//  BUNYI SEBUTAN (Web Speech API)
// ═══════════════════════════════════════════════
function sebutHuruf(teks) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const ucapan = new SpeechSynthesisUtterance(teks);
  ucapan.lang = 'ar-SA';
  ucapan.rate = 0.8;
  ucapan.pitch = 1;
  window.speechSynthesis.speak(ucapan);
}

// ═══════════════════════════════════════════════
//  PILIH MOD
// ═══════════════════════════════════════════════
function pilihMod(mod) {
  modSemasa = mod;
  betulCount = 0; salahCount = 0; soalanCount = 0;
  kolam = kacau(semuaHuruf);
  kolamIdx = 0;
  document.getElementById('skrin-pilih').style.display = 'none';
  document.getElementById('skrin-kuiz').style.display = 'block';
  kemaskiniStat();
  if (mod === 'keluarga') {
    renderKeluarga();
  } else {
    soalanBaru();
  }
}

function balikMod() {
  modSemasa = null;
  document.getElementById('skrin-pilih').style.display = 'block';
  document.getElementById('skrin-kuiz').style.display = 'none';
}

// ═══════════════════════════════════════════════
//  JANA SOALAN BARU
// ═══════════════════════════════════════════════
function soalanBaru() {
  if (kolamIdx >= kolam.length) { kolam = kacau(semuaHuruf); kolamIdx = 0; }
  hurufSemasa = kolam[kolamIdx++];
  sudahJawab = false;

  const semuaBunyi = [...new Set(semuaHuruf.map(h => h.bunyi))];
  const semuaAr = semuaHuruf.map(h => h.ar);

  let jawapan, pilihanSalah, paparan, soalan, jenisPilihan;

  if (modSemasa === 'bunyi') {
    paparan = hurufSemasa.ar;
    jawapan = hurufSemasa.bunyi;
    pilihanSalah = kacau(semuaBunyi.filter(b => b !== jawapan)).slice(0, 3);
    soalan = 'Apakah bunyi huruf ini?';
    jenisPilihan = 'teks';
  } else {
    paparan = hurufSemasa.bunyi;
    jawapan = hurufSemasa.ar;
    pilihanSalah = kacau(semuaAr.filter(a => a !== jawapan)).slice(0, 3);
    soalan = 'Pilih huruf yang berbunyi ' + hurufSemasa.bunyi;
    jenisPilihan = 'arab';
  }

  pilihanSemasa = kacau([jawapan, ...pilihanSalah]);

  const container = document.getElementById('soalan-container');
  container.innerHTML = `
    <div style="text-align:center;">
      <div class="${modSemasa === 'bunyi' ? 'huruf-besar' : 'bunyi-besar'}">${paparan}</div>
      <button class="btn-bunyi" onclick="sebutHuruf('${hurufSemasa.ar.replace(/'/g,"\\'")}')">
        🔊 Dengar sebutan
      </button>
      <div class="petua-box">💡 Petua: <strong>${hurufSemasa.mnemonic}</strong> · ${hurufSemasa.titik}</div>
      <p style="font-size:14px;color:var(--teks-muted);margin-bottom:1rem;">${soalan}</p>
      <div class="grid-pilihan">
        ${pilihanSemasa.map(p => `
          <button class="btn-pilihan ${jenisPilihan === 'teks' ? 'teks' : ''}"
            onclick="pilihJawapan(this, '${p.replace(/'/g,"\\'")}', '${jawapan.replace(/'/g,"\\'")}')">
            ${p}
          </button>
        `).join('')}
      </div>
      <div class="maklum-balas" id="maklum-balas"></div>
      <button class="btn-seterus" id="btn-seterus" onclick="soalanBaru()">Soalan seterusnya →</button>
    </div>
  `;
}

// ═══════════════════════════════════════════════
//  PROSES JAWAPAN
// ═══════════════════════════════════════════════
function pilihJawapan(btn, pilihan, jawapan) {
  if (sudahJawab) return;
  sudahJawab = true;
  soalanCount++;

  document.querySelectorAll('.btn-pilihan').forEach(b => b.disabled = true);
  const mb = document.getElementById('maklum-balas');
  const bSeterus = document.getElementById('btn-seterus');

  if (pilihan === jawapan) {
    betulCount++;
    btn.classList.add('betul');
    mb.className = 'maklum-balas betul';
    mb.textContent = '✓ Betul! ' + hurufSemasa.mnemonic;
  } else {
    salahCount++;
    btn.classList.add('salah');
    document.querySelectorAll('.btn-pilihan').forEach(b => {
      if (b.textContent.trim() === jawapan) b.classList.add('betul');
    });
    mb.className = 'maklum-balas salah';
    mb.textContent = '✗ Salah. Jawapan: ' + jawapan + ' — ' + hurufSemasa.mnemonic;
  }

  bSeterus.classList.add('tunjuk');
  kemaskiniStat();

  // Auto simpan rekod jika sudah 10 soalan
  if (soalanCount % 10 === 0 && profil) {
    simpanRekod({
      userId: profil.id,
      nama: profil.nama,
      kelas: profil.kelas || '-',
      mod: modSemasa,
      betul: betulCount,
      jumlah: soalanCount,
      peratus: Math.round((betulCount / soalanCount) * 100)
    });
  }
}

// ═══════════════════════════════════════════════
//  MOD KELUARGA HURUF
// ═══════════════════════════════════════════════
function renderKeluarga() {
  const keys = Object.keys(keluargaData);
  const kg = keluargaData[kelSemasa];
  const ahli = semuaHuruf.filter(h => h.keluarga === kelSemasa);
  const semuaBunyi = [...new Set(semuaHuruf.map(h => h.bunyi))];

  const container = document.getElementById('soalan-container');
  container.innerHTML = `
    <div class="sub-tabs">
      ${keys.map(k => `
        <button class="sub-tab ${k === kelSemasa ? 'aktif' : ''}"
          onclick="tukarKeluarga('${k}')">${keluargaData[k].label}</button>
      `).join('')}
    </div>
    <div class="cerita-box">📖 Cerita ingatan: <strong>${kg.cerita}</strong></div>
    ${ahli.map((h, i) => {
      const salah = kacau(semuaBunyi.filter(b => b !== h.bunyi)).slice(0, 3);
      const pilihan = kacau([h.bunyi, ...salah]);
      return `
        <div class="kad" style="margin-bottom:12px;padding:1.25rem;" id="kkel-${i}">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem;">
            <div class="huruf-besar" style="font-size:56px;margin:0;">${h.ar}</div>
            <button class="btn-bunyi" style="margin:0;" onclick="sebutHuruf('${h.ar}')">🔊</button>
            <div style="flex:1;">
              <div style="font-size:13px;color:var(--teks-muted);">${h.titik}</div>
              <div style="font-size:13px;color:#7a5800;">💡 ${h.mnemonic}</div>
            </div>
          </div>
          <div class="grid-pilihan">
            ${pilihan.map(p => `
              <button class="btn-pilihan teks" onclick="pilihKeluarga(this,'${p}','${h.bunyi}',${i})">
                ${p}
              </button>
            `).join('')}
          </div>
          <div class="maklum-balas" id="mb-kel-${i}"></div>
        </div>
      `;
    }).join('')}
    <button class="btn-seterus tunjuk" onclick="renderKeluarga()" style="margin-top:0.5rem;">
      Cuba semula keluarga ini
    </button>
  `;
}

function pilihKeluarga(btn, pilihan, jawapan, idx) {
  const kad = document.getElementById('kkel-' + idx);
  kad.querySelectorAll('.btn-pilihan').forEach(b => b.disabled = true);
  const mb = document.getElementById('mb-kel-' + idx);
  soalanCount++;
  if (pilihan === jawapan) {
    betulCount++;
    btn.classList.add('betul');
    mb.className = 'maklum-balas betul';
    mb.textContent = '✓ Betul!';
  } else {
    salahCount++;
    btn.classList.add('salah');
    kad.querySelectorAll('.btn-pilihan').forEach(b => { if (b.textContent.trim() === jawapan) b.classList.add('betul'); });
    mb.className = 'maklum-balas salah';
    mb.textContent = '✗ Jawapan: ' + jawapan;
  }
  kemaskiniStat();
}

function tukarKeluarga(k) {
  kelSemasa = k;
  renderKeluarga();
}
