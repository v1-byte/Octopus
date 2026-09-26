# Private Owner APK Release Policy

A/C harus tetap private-owner. Kode `752566` hanya cocok sebagai local inspection gate; siapa pun yang menerima APK dapat membongkar JavaScript. Karena itu APK release **tidak boleh mengandalkan lock frontend saja**.

## Wajib sebelum APK release

1. Login owner melalui backend.
2. MFA/WebAuthn untuk akun owner.
3. Device binding dengan keypair Android Keystore.
4. Signed challenge dari backend pada setiap sesi A/C.
5. License/entitlement server-side untuk A/C.
6. Short-lived access token dengan rotation.
7. Revocation list untuk device dan session.
8. Certificate pinning hanya bila dikelola dengan rotation yang aman.
9. Backend menolak semua operation selain inspection read-only.
10. Audit log server-side untuk setiap unlock, adapter action, dan target.

## Server-side deny policy

Server wajib menolak operation name berikut tanpa pengecualian:

- spin, bet, purchase, pay, payout
- balance mutation, deposit, withdraw
- admin, grant, revoke
- delete, write, update, patch, post, put
- change_rng, change_result

Server hanya boleh menerima operation yang explicitly allowlisted:

- snapshot
- inspect
- read_state
- capture_screenshot
- open_control_center

## Release checklist

- Jangan menaruh API key, cookie, token, private key, atau database credential di APK.
- Jangan menganggap obfuscation sebagai access control.
- Jangan publish A/C APK sebagai public GitHub Pages artifact.
- Gunakan private release, signed artifact, backend entitlement, dan remote kill switch.
- Uji bahwa akun/device yang dicabut tidak bisa membuka A/C.
- Uji bahwa request mutasi ditolak walau APK dimodifikasi.
- Simpan bukti izin inspeksi dan scope target.

## Implementasi yang sudah aktif di PWA

- `core/safety-guard.js`: inspection consent, session lock, hash verification, dan rate-limit 5 percobaan/60 detik.
- `core/operation-policy.js`: allowlist action read-only dan denylist operation mutasi.
- `core/game-adapter-sdk.js`: enforcement policy di level SDK, bukan hanya tombol UI.

Lapisan ini memperkecil salah penggunaan lokal. Untuk APK yang hanya boleh dipakai owner, enforcement final tetap harus server-side karena kode JavaScript/APK dapat dianalisis atau dimodifikasi oleh pemilik perangkat.
