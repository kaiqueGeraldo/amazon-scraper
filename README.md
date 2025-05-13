# 🏍️ Amazon Scraper

Fullstack application that allows you to search for Amazon products based on a keyword. Results are displayed with image, title, rating (with stars), and reviews, and users can mark products as favorites with local persistence.

🔗 Live Site: [https://amazon-scraper-kaique.vercel.app](https://amazon-scraper-green.vercel.app/)

⚠️ The backend is hosted on Railway, and the scraping API is publicly accessible for educational purposes.

---

## 📁 Project Structure

This repository contains two independent projects:

```
amazon-scraper/
├── backend/      # Node.js API responsible for scraping
├── frontend/     # React + Tailwind interface to search and display products
```

---

## ⚙️ Technologies Used

### 🔧 Backend
- Node.js
- Express
- Axios
- jsdom
- CORS
- pm2

### 💻 Frontend
- React (Next.js App Router with "use client")
- Tailwind CSS
- TypeScript
- LocalStorage API

---

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/kaiqueGeraldo/amazon-scraper.git
cd amazon-scraper
```

### 2. Run the backend

```bash
cd amazon-scraper-backend
npm init -y
npm install express axios jsdom cors pm2
pm2 start src/server.js --name amazon-scraper-backend
```

The backend will start at: `http://localhost:3005`

Available endpoint:

```
GET /api/scrape?keyword=mouse
```

### 3. Run the frontend

```bash
cd ..
cd amazon-scraper-frontend
npm install
npm run dev
```

Access: `http://localhost:3000`

---

## 🔍 Features

- Search Amazon products in real time via scraping
- Display results with:
  - Image
  - Title
  - Rating (formatted as `x.x/5` with stars)
  - Number of reviews
- Mark and unmark products as favorites
- Favorites are persisted using `localStorage`
- Filters out invalid products like "Featured from Amazon brands" or "Sponsored"
- Responsive UI with clean navigation between search and favorites

---

## 📌 How It Works

1. User enters a keyword (e.g., "notebook")
2. The app calls the backend (`/api/scrape`)
3. The backend scrapes Amazon and returns relevant data
4. The frontend displays results and allows marking favorites

---

## 📂 File Structure

### Backend (`/amazon-scraper-backend`)

- `server.js` → initializes the Express server
- `routes/scrapeRoutes.js` → defines the `/scrape` route
- `services/scrapeService.js` → performs Amazon scraping using `axios` and `jsdom`

### Frontend (`/amazon-scraper-frontend`)

- `page.tsx` → main page with search and favorites logic
- `components/Navbar.tsx` → navigation bar between pages
- `components/SearchBar.tsx` → search input with button
- `components/ProductGrid.tsx` → responsive product grid
- `components/Rating.tsx` → dynamic rating display using stars
- `types/product.ts` → product type definition

---

## 🖼️ Screenshots

### 🔎 Product Search Page
![Main Page](https://github.com/user-attachments/assets/61bd2438-c33c-4b1f-9297-d78876853095)

### ⭐ Favorites Section
![Favorites](https://github.com/user-attachments/assets/f426e3af-95a4-4973-b815-a56550905706)

---

## ⚠️ Important Notes

- Amazon scraping is done without authentication or proxies. Amazon may block your IP if too many requests are made in a short time.
- This project is for **educational purposes only**. Scraping in production without respecting site terms of use is not recommended.

---

## ✅ Prerequisites

- Node.js 18 or higher
- npm

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. Feel free to use and modify it as needed. 😊

---

Made with ❤️ by **Kaique Geraldo** - [LinkedIn](https://www.linkedin.com/in/kaique-geraldo) | [GitHub](https://github.com/kaiqueGeraldo) | [Email](mailto:kaiique2404@gmail.com)

