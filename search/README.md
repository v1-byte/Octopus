# Search MVP

Frontend memakai endpoint proxy yang kompatibel dengan format:

```text
GET /api/search?q=octopus&type=web&page=1
```

## Deploy Cloudflare Worker

1. Buat akun dan Worker baru di Cloudflare.
2. Upload `worker.js` sebagai source.
3. Tambahkan secret bernama `BRAVE_API_KEY` pada pengaturan Worker.
4. Daftarkan API key dari [Brave Search API](https://brave.com/search/api/).
5. Set endpoint Worker pada halaman aplikasi:

```js
window.OCTOPUS_SEARCH_API = 'https://nama-worker.workers.dev/api/search';
```

Untuk produksi, sebaiknya ganti `Access-Control-Allow-Origin: *` dengan domain GitHub Pages Anda.
