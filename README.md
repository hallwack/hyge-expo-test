# Courtly

Courtly is an Expo/React Native mobile application for discovering sports facilities, viewing court details, checking availability, making bookings, and managing user bookings.

This document describes the implementation currently available in the repository and maps it to the Hyge take-home test requirements.

## Implementation summary

| Requirement | Implementation |
| --- | --- |
| Expo + TypeScript + React Native | Expo SDK `57.0.20`, React Native `0.86.3`, TypeScript |
| Registration | Registration screen and `POST /v1/auth/register` |
| Login | Login screen and `POST /v1/auth/login` |
| JWT storage | `expo-secure-store` for the access token and user data |
| Facility list | Infinite pagination, pull-to-refresh, search, sport filter, and city filter |
| Facility detail | Description, address, rating, amenities, sports, and courts |
| Availability | Date picker, court slots, available/booked states, and slot pricing |
| Create booking | Booking review followed by `POST /v1/bookings` |
| My bookings | Upcoming/past/cancelled filters, pagination, refresh, and cancellation |
| Booking detail | Receipt/status screen with reference, schedule, price, and status |
| Navigation | Expo Router with auth stack, app stack, and bottom tabs |

## Tech stack

- React Native with Expo SDK 57
- TypeScript
- Expo Router
- TanStack Query for fetching, caching, pagination, invalidation, loading, and error states
- Zustand for authentication state and the booking draft
- React Hook Form + Zod for login and registration validation
- `@react-native-community/datetimepicker` for date selection
- `lucide-react-native` for icons

Expo SDK 57 targets React Native 0.86, React 19.2, and requires Node.js 22.13.x or later. Reference: [Expo SDK 57 documentation](https://docs.expo.dev/versions/v57.0.0/).

## Expo modules used

The project uses more than three Expo SDK modules beyond core React Native:

1. `expo-secure-store` — securely stores the access token and user data on the device.
2. `expo-image` — displays facility images with a fallback when an image URL fails.
3. `expo-linear-gradient` — provides the gradient overlay used in the facility detail hero image.
4. `expo-router` — provides file-based navigation for auth, tabs, details, and the booking flow.
5. `expo-splash-screen` — configured through `app.json` for the application splash screen.

In addition, `@react-native-community/datetimepicker` is used for date selection on the availability screen.

## Code structure

```text
src/
├── app/                         # Expo Router routes
│   ├── (auth)/                  # Login and registration
│   └── (app)/                   # Authenticated area
│       ├── (tabs)/              # Home, bookings, profile
│       ├── facilities/[id].tsx  # Facility details
│       └── booking/             # Availability, confirmation, status
├── api/                         # HTTP client and error handling
├── components/                  # Reusable UI and state components
├── features/
│   ├── facilities/              # Facility API, hooks, and components
│   ├── bookings/                # Booking API, hooks, and components
│   └── users/                   # Authentication API and hooks
├── libs/                        # Secure storage and formatting helpers
├── schemas/                     # Zod schemas
├── stores/                      # Zustand stores
├── theme/                       # Design tokens and theme provider
└── types/                       # TypeScript API/domain types
```

## API integration

The default API base URL follows the interview requirement:

```text
https://courtly-api.hyge.web.id
```

The HTTP client is located in `src/api/client.ts`. Protected requests read the access token from Secure Store and send it using:

```http
Authorization: Bearer <access-token>
```

Integrated endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/v1/auth/register` | Create an account |
| `POST` | `/v1/auth/login` | Log in |
| `POST` | `/v1/auth/refresh` | Refresh the access token after a 401 response |
| `GET` | `/v1/facilities` | Paginated and filtered facility list |
| `GET` | `/v1/facilities/:id` | Facility details |
| `GET` | `/v1/facilities/:id/availability?date=YYYY-MM-DD` | Availability for a date |
| `GET` | `/v1/cities` | City filter data |
| `GET` | `/v1/sports` | Sport filter data |
| `POST` | `/v1/bookings` | Create a booking |
| `GET` | `/v1/bookings` | List the user's bookings |
| `GET` | `/v1/bookings/:id` | Booking details |
| `DELETE` | `/v1/bookings/:id` | Cancel a booking |

To override the API URL, create a `.env` file in the project root:

```env
EXPO_PUBLIC_API_URL=https://courtly-api.hyge.web.id
```

Restart the Expo development server after changing environment variables.

## User flows

### Authentication

1. The user opens the login or registration screen.
2. The form is validated with Zod.
3. The access token and user profile are stored through Secure Store.
4. Authentication state is managed by Zustand.
5. Unauthenticated users are redirected to the login screen.

### Browse facilities

1. The Home screen loads facilities with pagination.
2. Search uses a 400 ms debounce.
3. Sports and cities are loaded from lookup endpoints.
4. Pull-to-refresh and infinite scroll are supported.
5. Tapping a facility opens its detail screen.

### Booking

1. From the facility detail screen, the user selects `Check Availability`.
2. The user selects a date and an available slot for a court.
3. The booking draft is temporarily stored in Zustand.
4. The confirmation screen displays the facility, court, date, time, and price.
5. `Confirm Payment` sends `POST /v1/bookings`.
6. On success, the receipt screen displays the booking status and reference.

### My bookings

The Bookings tab supports `Upcoming`, `Past`, and `Cancelled` filters. Each booking displays the facility, court, date, time, status, reference, and cancellation action when applicable. Booking details are opened through the status/receipt screen.

## Running the project

### Prerequisites

- Node.js `22.13.x` or a compatible later version for Expo SDK 57
- npm
- Android Studio and Android SDK for local Android development
- A JDK compatible with the Android project configuration

### Installation

```bash
npm install
```

### Start the development server

```bash
npm run start
```

Available commands:

```bash
npm run android  # Run on Android
npm run ios     # Run on iOS
npm run web     # Run on web
npm run lint    # Run Expo lint
```

Make sure an Android emulator is running and the Android SDK environment is configured before using the Android command.

## Building the Android APK

The repository currently includes the APK at:

```text
release/courtly-release.apk
```

The build script configured in `devenv.nix` runs `expo prebuild`, `./gradlew assembleRelease`, and copies the generated APK to that path.

Manual build steps:

```bash
npx expo prebuild --platform android
cd android
./gradlew assembleRelease
mkdir -p ../release
cp app/build/outputs/apk/release/app-release.apk ../release/courtly-release.apk
```

Note: the interview requirement specifies `releases/courtly-android.apk`, while the currently committed file is `release/courtly-release.apk`. If the submission must follow the required path exactly, copy or rename the APK to `releases/courtly-android.apk` before the final push.

## Error handling and loading states

- API errors are mapped to `ApiError` with status, code, and message.
- Queries use limited retries for non-401 errors.
- Error states provide a retry action.
- An empty state is shown when a query returns no results.
- Loading states are shown during initial loading and pagination.
- Requests receiving a 401 response attempt to refresh the token; if refreshing fails, the session is cleared and the user is redirected to login.

## Current implementation notes

- The API base URL is read from `EXPO_PUBLIC_API_URL`; make sure it is available for production builds.
- Dark/light theme support is available on the auth screens and theme tokens are used throughout the UI.
- The application includes a payment confirmation UI, but does not integrate an external payment gateway because the interview API only provides booking endpoints.
- Refresh-token persistence should be verified before a production release if the API requires refresh tokens. Refresh handling is already present in the HTTP client.
- To satisfy the APK requirement literally, the APK location should be aligned with `releases/courtly-android.apk`.

## API references

- Base API: <https://courtly-api.hyge.web.id>
- Swagger: <https://courtly-api.hyge.web.id/api/docs>
- Expo SDK 57: <https://docs.expo.dev/versions/v57.0.0/>

