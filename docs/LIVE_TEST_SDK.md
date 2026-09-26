# Custom Live Test SDK

A/C dapat menerapkan profil symbol/RNG ke test mode server game milik sendiri melalui adapter SDK custom. Repository ini tidak menyimpan endpoint, token, secret, atau kredensial.

## Kontrak adapter

Load adapter privat setelah core/live-test-adapter-sdk.js, lalu daftarkan dua fungsi:

OctopusLiveTestSDK.register({
  name: 'Nama adapter internal',
  async applyProfile(profile) {
    // Hubungkan ke SDK atau test hook resmi server Anda di sini.
    // profile.mode === 'live-test'
    // profile.symbols berisi { name, weights: [opsi1..opsi5] }
    // profile.seed dan profile.samples tersedia untuk sesi test.
    return { ok: true, applied: true };
  },
  async revokeProfile() {
    // Matikan override dan kembalikan sesi test ke konfigurasi normal.
    return { ok: true, revoked: true };
  }
});

Adapter harus membatasi akses ke akun tester, memvalidasi masa berlaku profil, mencatat perubahan, dan menyediakan kill switch. Jangan menaruh secret di frontend atau repository publik.
