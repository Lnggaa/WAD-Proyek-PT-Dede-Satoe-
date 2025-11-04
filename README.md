

Sambel Dede Satoe - Review System
Proyek sederhana untuk fitur testimoni & review pada website sambel.

Setup Backend
1. `npm install express cors`
2. `node server.js` (run di port 3000)

Setup Frontend
1. `npm install -g typescript`
2. `tsc app.ts` (compile ke app.js)
3. Buka `public/index.html` di browser.

API Endpoints
- GET /api/reviews: Dapatkan list review
- POST /api/reviews: Submit review baru (body: {name: string, rating: number, comment: string})

Deploy
- Backend: Vercel/Netlify (serverless) atau Heroku.
- Frontend: GitHub Pages.

Kontribusi: Pull request welcome!
