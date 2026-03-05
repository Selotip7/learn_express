# NexApp

Aplikasi manajemen pengguna modern dibangun dengan React + Vite.

## Struktur Proyek

```
nexapp/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Root + routing berbasis state
    ├── styles/
    │   └── globals.css       # CSS variables, reset, animasi global
    ├── utils/
    │   └── index.js          # Helper functions & localStorage
    ├── hooks/
    │   ├── useToast.js       # Toast notification hook
    │   ├── useClock.js       # Live clock hook
    │   └── useUsers.js       # CRUD users + localStorage sync
    ├── components/
    │   ├── ui/               # Komponen UI reusable
    │   │   ├── index.js      # Barrel export
    │   │   ├── Toast.jsx
    │   │   ├── Badge.jsx
    │   │   ├── Button.jsx
    │   │   ├── Input.jsx     # Input + Select + Label
    │   │   ├── Modal.jsx
    │   │   └── Logo.jsx
    │   └── layout/
    │       ├── index.js      # Barrel export
    │       └── Sidebar.jsx
    └── pages/
        ├── index.js          # Barrel export
        ├── LoginPage.jsx
        ├── RegisterPage.jsx
        ├── DashboardPage.jsx
        ├── UsersPage.jsx
        └── LogoutPage.jsx
```

## Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build
```

## Fitur

- 🔐 Login & Register dengan validasi
- 📊 Dashboard dengan statistik real-time
- 👥 CRUD Pengguna (tambah, edit, hapus, lihat detail)
- 🔍 Search & filter pengguna
- 📄 Pagination
- 🚪 Logout dengan animasi countdown
- 💾 Data tersimpan di localStorage

## API

Aplikasi terhubung ke backend di `http://localhost:3001/api`:
- `POST /user/login`
- `POST /user/registration`
- `GET  /user/logout`
- `GET  /user/me`
