# Book Dashboard

A personal book tracking dashboard displaying books with ratings, reviews, and reading dates. The application runs locally with a SQL database and deploys statically to GitHub Pages using a JSON snapshot.

## 🌐 Live Demo

[View Live Dashboard](https://rchenryy.github.io/book-dashboard/)

## 🏗️ How It Works

This project uses **dual-environment architecture**:

**Local Development**: Express.js server queries SQL database in real-time
- Backend: Express.js + SQL
- URL: `http://localhost:3000/books`

**GitHub Pages**: Static site uses pre-generated JSON snapshot
- No backend required
- Data source: JSON file
- URL: `https://rchenryy.github.io/book-dashboard/`

### Environment Detection

The frontend automatically detects where it's running:

```javascript
function getDataSource() {
  const isLocal = window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1';
  
  if (isLocal) {
    return '/books/data';      // SQL via Express API
  } else {
    return 'data/books.json';  // Static JSON file
  }
}
```

## 📁 Project Structure

```
book-dashboard/
├── public/              # Static assets (CSS, JS)
├── docs/               # GitHub Pages deployment
│   ├── index.html     
│   └── data/books.json # Database snapshot
├── views/             # HTML templates
│   ├── welcome.html   
│   └── books.html     
├── routes/            # Express routes
├── db/                # Database connection
├── server.js          # Express server
└── generate-snapshot.js  # Creates JSON from database
```

## 🚀 Local Setup

1. Clone and install:
```bash
git clone https://github.com/rchenryy/book-dashboard.git
cd book-dashboard
npm install
```

2. Configure database in `.env`:
```
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
```

3. Start server:
```bash
npm start
```

Visit `http://localhost:3000/books`

## ✨ Features

- **Search** by title, author, or review
- **Filter** by rating and year read
- **Responsive** design with Bootstrap 5
- **Dual-mode** operation (SQL + JSON)

## 🛠️ Technologies

- Frontend: HTML, CSS (Bootstrap 5), JavaScript
- Backend: Node.js, Express.js
- Database: SQL
- Deployment: GitHub Pages

## 📄 License

MIT License