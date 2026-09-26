# Octopus Safety Boundaries

Octopus adalah tool inspeksi, QA, observability, dan simulasi untuk game/API/aset yang dimiliki pengguna atau yang pengguna punya izin tertulis untuk uji.

## Inspection gate

A/C Studio dikunci per sesi dengan kode yang diberikan kepada operator. Pembukaan sesi juga membutuhkan persetujuan eksplisit bahwa target memiliki izin inspeksi. Status unlock hanya disimpan di `sessionStorage` dan hilang saat tab/sesi ditutup atau dikunci ulang.

> Lock frontend adalah guardrail UX, bukan pengganti autentikasi server. Jangan menaruh secret produksi di repository atau frontend.

## Read-only policy

Secara default hanya action berikut yang boleh dikirim adapter:

- `snapshot`
- `inspect`
- `read_state`
- `capture_screenshot`
- `open_control_center`

Action seperti spin, bet, purchase, payout, balance mutation, admin command, atau perubahan konfigurasi produksi diblokir oleh SDK. Scenario runner dan replay mengikuti aturan yang sama.

## Target policy

Endpoint analyzer, observability, dan audit menerima:

- HTTPS
- `localhost`
- `127.0.0.1`

HTTP publik, IP privat, file URL, dan target yang tidak valid ditolak. Tool tidak melakukan port scan, brute force, credential guessing, exploit, fuzzing agresif, rate-limit flooding, atau bypass CORS/authentication.

## Data policy

- Header sensitif seperti Authorization, Cookie, API key, token, secret, dan password direduksi pada log.
- Simulasi dan telemetry default disimpan lokal.
- Jangan mengunggah token, cookie, session ID, atau data pribadi ke issue, commit, atau chat.
- Gunakan server/backend milik sendiri untuk audit yang membutuhkan authorization dan retensi data.

## Scope of use

Dilarang menggunakan Octopus untuk cheat, botting, memanipulasi RNG/hasil game pihak lain, mencuri akun/token, bypass pembayaran, mengubah saldo, mengambil data pemain, atau mengganggu availability layanan.

## Native adapter boundary

Adapter Unity, Unreal, Godot, dan Custom adalah contract sandbox sampai dipasang ke build game milik sendiri. Tidak ada klaim bahwa adapter tersebut dapat menginspeksi game pihak ketiga secara otomatis.

## Responsible workflow

1. Tetapkan scope, domain, build, dan akun uji.
2. Simpan bukti izin.
3. Gunakan sandbox/staging terlebih dahulu.
4. Pakai read-only adapter dan data sintetis.
5. Redact log sebelum dibagikan.
6. Hentikan pengujian bila ada dampak tak terduga.
7. Dokumentasikan temuan secara bertanggung jawab.
