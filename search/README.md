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

## Mode hybrid

Frontend mencari pada `local-index.json` lebih dulu. Jika proxy tersedia, hasil indeks lokal digabung dengan hasil Brave dan URL duplikat dihapus. Tambahkan dokumen ke file indeks untuk memperluas search tanpa provider; untuk web luas, pasang crawler/indexer sendiri dan tulis hasil normalisasi dengan format `{title,url,description,content,source}`.
