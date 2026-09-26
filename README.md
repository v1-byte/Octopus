# Octopus — Game Research & Control Studio

Octopus adalah prototype **PWA mobile-first** untuk riset dan pengujian game yang Anda miliki atau berwenang mengujinya.

## Fitur yang tersedia

- A/C Studio dengan mode **Manual** dan **Auto Deteksi** berbasis endpoint ber-CORS.
- Konfigurasi game dinamis melalui `config/games.json`.
- Upload aset gambar, label symbol, jumlah, dan dynamic symbol grid.
- Rule builder: trigger, kondisi spin, jumlah, posisi, reels, preset.
- Simulator reel 3×3, 5×3, dan 6×5 dengan batch 1/10/100/1000 spin.
- Statistik sandbox, logger, export CSV, import/export workspace JSON.
- Audit konektivitas pasif untuk endpoint milik sendiri; tidak melakukan brute force atau manipulasi produksi.
- Penyimpanan IndexedDB dengan fallback LocalStorage.
- `manifest.json` dan `service-worker.js` untuk instalasi PWA/offline shell.
- Search Engine hybrid: indeks lokal + fallback Brave, tab Web/Gambar/Video/Berita, filter waktu/bahasa/Safe Search, autocomplete, favorit, dan pagination.
- Proxy search Cloudflare Worker di `search/worker.js` agar API key provider tidak masuk ke frontend.
- Browser dasar: tab, address bar, back/forward, reload, dan riwayat tab lokal.
- API Analyzer lanjutan: request builder, headers, body, timeout, retry, response schema, dan network log.
- Game math simulator: paytable, paylines, wild, scatter, bonus, free spin, seeded RNG, RTP, hit rate, dan replay log.
- RNG audit sandbox: distribusi lokal reproducible, chi-square screening, bucket deviation, dan replay seed tanpa menulis ke endpoint game.
- Symbol options analyzer: SCATTER, WILD, KUCING, dan item lain dengan lima bobot opsi untuk analisa distribusi lokal.
- Symbol Engine lengkap: transform visual, animation, sound, layer, opacity, lock, dan preset lokal.
- Rule Engine kompleks: AND/OR/IF-THEN, count modes, custom position, visual/audio timing, preset, dan validasi.
- Security Audit pasif: HTTPS, CORS, auth-status, schema, security headers, timing, dan batasan audit.

## Catatan spesifikasi lengkap

Dokumen spesifikasi dan roadmap asli disimpan utuh di [`CATATAN_LENGKAP_FULL.md`](CATATAN_LENGKAP_FULL.md). File tersebut ditambahkan sebagai catatan Markdown terbaru dan tidak menggantikan atau mengurangi fitur A/C Studio yang sudah diimplementasikan.

## Menjalankan lokal

```bash
python3 -m http.server 4173
# buka http://localhost:4173
```

Jangan membuka `index.html` langsung jika ingin memakai `fetch()` untuk konfigurasi game dan service worker.

## Mode Auto

Server game Anda perlu mengizinkan origin aplikasi dan mengatur autentikasi sesuai kebutuhan. GitHub Pages hanya menyediakan hosting statis; ia tidak dapat menghilangkan CORS. Gunakan proxy yang Anda kelola sendiri jika memang diperlukan.

## Batasan dan disclaimer

Tool ini ditujukan untuk **pentest, debugging, dan riset game milik sendiri**. Jangan gunakan untuk mengambil token, membypass autentikasi, memprediksi atau memanipulasi RNG, mengubah hasil game pihak lain, atau mengakses sistem tanpa izin.


## Batasan inspeksi dan lock A/C

A/C Studio sekarang memiliki **inspection gate** dengan kode lock per sesi, consent eksplisit, target HTTPS/localhost saja, mode adapter read-only, blokir action mutasi, serta redaksi header sensitif di log. Detail batasan ada di [`SAFETY_BOUNDARIES.md`](SAFETY_BOUNDARIES.md). Lock frontend adalah guardrail, bukan pengganti autentikasi server.


## Private-owner enforcement

Operation policy juga dipasang di SDK untuk memblokir action mutasi walaupun UI dimodifikasi. Untuk APK, tetap wajib menambahkan owner login, device binding, signed challenge, entitlement server-side, revocation, dan remote kill switch seperti dijelaskan di `RELEASE_SECURITY.md`.

- Custom Live Test SDK: Apply dapat menerapkan profil ke test mode server sendiri melalui adapter terdaftar; tanpa adapter, tidak ada perubahan live.

- Live Test Bridge: auto-connect server-side untuk authorized live testing melalui environment privat, sesi operator, dan test hook resmi.
