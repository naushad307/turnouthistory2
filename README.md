# Replacement History — MongoDB Backend

## Environment variables

Create `.env`:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/replacement_history?retryWrites=true&w=majority
JWT_SECRET=put-a-long-random-secret-here
BACKEND_URL=https://your-backend.example.com
PORT=3000
```

`BACKEND_URL` is the API/backend URL used by the browser. If frontend and backend are deployed together, leave it blank.

## Local

```bash
npm install
npm run build
npm start
```

Open `http://localhost:3000`.

## Separate frontend/backend deployment

1. Deploy this Node/Express app as the backend.
2. Set `MONGODB_URI`, `JWT_SECRET`, and `BACKEND_URL` in the backend environment.
3. Run `npm run build` before serving/deploying the frontend. This generates `public/config.js` from `BACKEND_URL`.
4. If the frontend is hosted separately, copy the generated `public/config.js` with the frontend, or set its equivalent value during the frontend build.

The frontend calls `${BACKEND_URL}/api/...` when `BACKEND_URL` is set; otherwise it uses same-origin `/api/...`.

## MongoDB data

The application state, records, columns, section opening dates and yearly GMT data are stored in MongoDB. Security credentials are stored as hashes; the plaintext security code is not stored in MongoDB.
