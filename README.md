Crypto Dashboard - Fullstack Application
A real-time cryptocurrency dashboard built with React.js (frontend) and Node.js (backend) that displays cryptocurrency data using the CoinGecko API. This application features interactive charts, top gainers/losers panels, and real-time market data.


📋 Features

✅ Mandatory Features (As per assignment requirements):
Panel 1: Cryptocurrency Detailed Analysis

Historical price data over selectable time frames (7, 14, 30 days)

Trading volume data over the same period

Interactive line charts using Recharts library

Tooltips displaying exact values on hover

Cryptocurrency selection from dropdown/search

Panel 2: Top Gainers and Losers

Side-by-side cards showing top gainer and loser

Displays cryptocurrency name, symbol, current price, and 24h percentage change

Color coding (green for gainers, red for losers)

Icons/arrows indicating price movement direction

Backend API

Node.js/Express wrapper for CoinGecko API

Proper RESTful endpoints

Caching implementation for performance

Rate limiting to stay within API limits

🎯 Additional Features:
Responsive Design: Mobile-friendly interface

Real-time Updates: Auto-refresh every 60 seconds

Interactive Charts: Multiple chart types (line, area)

Error Handling: Comprehensive error handling with user feedback

Performance: Optimized API calls with caching

Modern UI: Material-UI components with consistent theme

🛠️ Tech Stack
Frontend:
React.js - UI framework

Recharts - Data visualization library

Material-UI - Component library

Axios - HTTP client

date-fns - Date formatting

Backend:
Node.js - Runtime environment

Express.js - Web framework

Axios - HTTP client for CoinGecko API

node-cache - In-memory caching

express-rate-limit - Rate limiting middleware

CORS - Cross-origin resource sharing

📁 Project Structure


crypto-dashboard/
├── backend/                    # Node.js backend
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   └── server.js         # Entry point
│   ├── package.json
│   └── .env                  # Environment variables
├── frontend/                  # React.js frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API services
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
│   ├── package.json
│   └── public/
└── README.md                 # This file



🚀 Getting Started
Prerequisites
Node.js (v16 or higher)

npm or yarn

Installation
Clone the repository:

bash
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard
Backend Setup:

bash
cd backend
npm install
Frontend Setup:

bash
cd ../frontend
npm install

📝 Development
Scripts:
Backend:
bash
npm start      # Start production server

Frontend:
bash
npm run dev      # Start development server
npm build      # Build for production
npm test       # Run tests



<img width="1353" height="593" alt="image" src="https://github.com/user-attachments/assets/1e7cab43-5255-4716-b1f4-4bc460a82b4d" />
<img width="1353" height="410" alt="image" src="https://github.com/user-attachments/assets/c2836ec1-6292-44e3-a285-c8ac918e69cf" />
<img width="1355" height="610" alt="image" src="https://github.com/user-attachments/assets/f3a2bf56-15eb-4216-94b4-a22492681af0" />



