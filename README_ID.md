# Courtly

Courtly adalah aplikasi mobile Expo/React Native untuk mencari fasilitas olahraga, melihat detail lapangan, memeriksa ketersediaan slot, membuat booking, dan mengelola booking pengguna.

Dokumentasi ini menjelaskan implementasi yang saat ini ada di repository dan pemetaan terhadap requirement take-home test Hyge.

## Ringkasan implementasi

| Requirement | Implementasi |
| --- | --- |
| Expo + TypeScript + React Native | Expo SDK `57.0.20`, React Native `0.86.3`, TypeScript |
| Registrasi | Screen register dan `POST /v1/auth/register` |
| Login | Screen login dan `POST /v1/auth/login` |
| Penyimpanan JWT | `expo-secure-store` untuk access token dan data user |
| Facility list | Pagination infinite scroll, pull-to-refresh, search, filter sport dan city |
| Facility detail | Deskripsi, alamat, rating, amenities, sports, dan courts |
| Availability | Date picker, slot per court, status available/booked, harga slot |
| Create booking | Review booking lalu `POST /v1/bookings` |
| My bookings | Filter upcoming/past/cancelled, pagination, refresh, dan cancel booking |
| Booking detail | Receipt/status screen dengan reference, waktu, harga, dan status |
| Navigation | Expo Router dengan auth stack, app stack, dan bottom tabs |

## Tech stack

- React Native dengan Expo SDK 57
- TypeScript
- Expo Router
- TanStack Query untuk fetching, caching, pagination, invalidation, loading, dan error state
- Zustand untuk auth state dan booking draft
- React Hook Form + Zod untuk validasi login/register
- `@react-native-community/datetimepicker` untuk pemilihan tanggal
- `lucide-react-native` untuk icon

Expo SDK 57 menargetkan React Native 0.86, React 19.2, dan membutuhkan Node.js minimum 22.13.x. Referensi yang digunakan: [Expo SDK 57 documentation](https://docs.expo.dev/versions/v57.0.0/).

## Expo modules yang digunakan

Project menggunakan lebih dari tiga modul Expo SDK di luar core React Native:

1. `expo-secure-store` — menyimpan access token dan data user secara aman di device.
2. `expo-image` — menampilkan gambar fasilitas dengan fallback ketika URL gambar gagal dimuat.
3. `expo-linear-gradient` — membuat gradient overlay pada hero image facility detail.
4. `expo-router` — file-based navigation untuk auth, tabs, detail, dan booking flow.
5. `expo-splash-screen` — dikonfigurasi melalui `app.json` untuk splash screen aplikasi.

Selain itu, `@react-native-community/datetimepicker` dipakai untuk date picker pada halaman availability.

## Struktur kode

```text
src/
├── app/                         # Expo Router routes
│   ├── (auth)/                  # Login dan register
│   └── (app)/                   # Area setelah login
│       ├── (tabs)/              # Home, bookings, profile
│       ├── facilities/[id].tsx  # Detail facility
│       └── booking/             # Availability, confirmation, status
├── api/                         # HTTP client dan error handling
├── components/                  # UI reusable dan state components
├── features/
│   ├── facilities/              # API, hooks, dan components facility
│   ├── bookings/                # API, hooks, dan components booking
│   └── users/                   # Auth API dan hooks
├── libs/                        # Secure storage dan formatting
├── schemas/                     # Zod schemas
├── stores/                      # Zustand stores
├── theme/                       # Design tokens dan theme provider
└── types/                       # TypeScript API/domain types
```

## API integration

Base URL default yang digunakan sesuai requirement interview:

```text
https://courtly-api.hyge.web.id
```

HTTP client berada di `src/api/client.ts`. Semua request protected mengambil access token dari Secure Store dan mengirim header:

```http
Authorization: Bearer <access-token>
```

Endpoint yang diintegrasikan:

| Method | Endpoint | Kegunaan |
| --- | --- | --- |
| `POST` | `/v1/auth/register` | Membuat akun |
| `POST` | `/v1/auth/login` | Login |
| `POST` | `/v1/auth/refresh` | Refresh access token ketika menerima 401 |
| `GET` | `/v1/facilities` | Daftar facility dengan pagination/filter |
| `GET` | `/v1/facilities/:id` | Detail facility |
| `GET` | `/v1/facilities/:id/availability?date=YYYY-MM-DD` | Availability per tanggal |
| `GET` | `/v1/cities` | Data filter city |
| `GET` | `/v1/sports` | Data filter sport |
| `POST` | `/v1/bookings` | Membuat booking |
| `GET` | `/v1/bookings` | Daftar booking pengguna |
| `GET` | `/v1/bookings/:id` | Detail booking |
| `DELETE` | `/v1/bookings/:id` | Membatalkan booking |

Jika ingin mengganti URL API, buat file `.env` di root project:

```env
EXPO_PUBLIC_API_URL=https://courtly-api.hyge.web.id
```

Setelah mengubah environment variable, restart Expo development server agar konfigurasi terbaca ulang.

## Alur pengguna

### Auth

1. Pengguna membuka login atau register.
2. Form divalidasi menggunakan Zod.
3. Access token dan profil user disimpan melalui Secure Store.
4. Auth state dikelola oleh Zustand.
5. Route app mengarahkan user yang belum login kembali ke login.

### Browse facility

1. Home mengambil data facility secara paginated.
2. Search menggunakan debounce 400 ms.
3. Sport dan city diambil dari endpoint lookup.
4. Pull-to-refresh dan infinite scroll tersedia.
5. Tap facility membuka halaman detail.

### Booking

1. Dari detail facility, pengguna memilih `Check Availability`.
2. Pengguna memilih tanggal dan slot available pada court tertentu.
3. Draft booking disimpan sementara di Zustand.
4. Halaman confirmation menampilkan facility, court, tanggal, waktu, dan harga.
5. Tombol `Confirm Payment` mengirim `POST /v1/bookings`.
6. Setelah berhasil, halaman receipt menampilkan status dan booking reference.

### My bookings

Halaman Bookings menyediakan filter `Upcoming`, `Past`, dan `Cancelled`. Setiap item menampilkan facility, court, tanggal, jam, status, reference, dan aksi cancel bila tersedia. Detail booking dibuka melalui halaman status/receipt.

## Menjalankan project

### Prasyarat

- Node.js `22.13.x` atau lebih baru yang kompatibel dengan Expo SDK 57
- npm
- Android Studio dan Android SDK untuk menjalankan Android lokal
- JDK yang sesuai dengan konfigurasi Android project

### Instalasi

```bash
npm install
```

### Development server

```bash
npm run start
```

Perintah lain yang tersedia:

```bash
npm run android  # Expo run Android
npm run ios     # Expo run iOS
npm run web     # Expo web
npm run lint    # Expo lint
```

Untuk menjalankan di emulator Android, pastikan emulator sudah aktif dan environment Android SDK sudah dikonfigurasi.

## Build Android APK

Repository saat ini menyediakan APK pada:

```text
release/courtly-release.apk
```

Script build yang tersedia melalui konfigurasi `devenv.nix` menjalankan `expo prebuild`, `./gradlew assembleRelease`, lalu menyalin hasilnya ke path tersebut.

Secara manual:

```bash
npx expo prebuild --platform android
cd android
./gradlew assembleRelease
mkdir -p ../release
cp app/build/outputs/apk/release/app-release.apk ../release/courtly-release.apk
```

Catatan: requirement interview menyebut nama `releases/courtly-android.apk`, sedangkan file yang saat ini committed adalah `release/courtly-release.apk`. Jika nama/path wajib mengikuti instruksi submission secara persis, APK perlu disalin atau di-rename menjadi `releases/courtly-android.apk` sebelum push final.

## Error handling dan loading state

- API error dipetakan ke `ApiError` dengan status, code, dan message.
- Query melakukan retry terbatas untuk error non-401.
- Error state menyediakan tombol retry.
- Empty state ditampilkan ketika hasil query kosong.
- Loading state digunakan pada initial load dan pagination.
- Request yang menerima 401 mencoba refresh token sekali secara terdeduplikasi; jika gagal, session dihapus dan user diarahkan ke login.

## Catatan implementasi saat ini

- Base URL diambil dari `EXPO_PUBLIC_API_URL`; pastikan variable tersebut tersedia ketika menjalankan build production.
- Dark/light theme tersedia pada auth screen dan theme token digunakan di seluruh UI.
- Aplikasi menggunakan payment confirmation UI, tetapi tidak mengintegrasikan payment gateway eksternal karena API interview hanya menyediakan endpoint booking.
- Persistensi refresh token perlu dipastikan kembali sebelum production release jika refresh token memang diwajibkan oleh API. Implementasi refresh sudah tersedia di HTTP client.
- Untuk memenuhi requirement APK secara literal, lokasi file APK perlu diselaraskan dengan `releases/courtly-android.apk`.

## API reference

- Base API: <https://courtly-api.hyge.web.id>
- Swagger: <https://courtly-api.hyge.web.id/api/docs>
- Expo SDK 57: <https://docs.expo.dev/versions/v57.0.0/>

