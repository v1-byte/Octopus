# Octopus Control Center

Control Center menyatukan adapter game, scenario runner, deterministic replay, observability, asset inspector, rule/economy sandbox, security audit defensif, telemetry, dan CI/CD.

## Adapter SDK

`core/game-adapter-sdk.js` menyediakan contract `connect`, `disconnect`, `reset`, `snapshot`, `action`, dan `screenshot`. Adapter Web bawaan berjalan lokal. Adapter Unity, Unreal, Godot, dan Custom tersedia sebagai contract sandbox; agar terhubung ke game nyata, game harus mengirim event melalui SDK resmi yang Anda integrasikan ke build game milik sendiri.

## Scenario runner

Gunakan `config/scenario-example.json` sebagai format awal. Runner hanya menjalankan action yang disediakan adapter, merekam hasil, dan tidak melakukan perubahan pada game produksi.

## Replay

Replay menyimpan seed dan action timeline di LocalStorage. Ini berguna untuk reproduksi bug dan regression test. Replay tidak dimaksudkan untuk mengubah hasil game pihak ketiga.

## Observability dan audit

Probe jaringan, telemetry, asset inspector, dan security audit di browser bersifat pasif. Pemeriksaan yang membutuhkan akses native/server harus dijalankan pada environment game milik sendiri dengan otorisasi.

## CI/CD

`.github/workflows/qa.yml` melakukan syntax check seluruh JavaScript dan static smoke test. Workflow deployment Pages tetap berada di `pages.yml`.
