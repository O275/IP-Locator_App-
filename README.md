# 🌍 IP Locator

A full-stack React + Node.js application that fetches the user's public IP, geolocates it using `ipapi`, displays the location on a Mapbox map, and allows authenticated users to fetch Gmail message data using Google OAuth.

---

## ✨ Features

- 🔐 **Google OAuth** Login via Gmail
- 📍 **IP Geolocation** using [ipapi.com](https://ipapi.com)
- 🗺️ Interactive map via **Mapbox GL JS**
- 📬 Gmail read-only access through **Google APIs**
- 🌙 Dark Mode toggle using **Material UI (MUI)**
- ⚡ Fast, responsive interface built with **React**

---

## 🧩 Tech Stack

| Layer     | Technology                      |
|-----------|----------------------------------|
| Frontend  | React, MUI, Axios, Mapbox GL     |
| Backend   | Node.js, Express, Google APIs    |
| Auth      | OAuth 2.0 (Google Login)         |
| Mapping   | Mapbox                           |
| IP Lookup | ipapi.com                        |

---

## 📁 Folder Structure

```
ip-locator/
├── public/
├── src/
│   ├── components/       # UI components like Map, Login, Search
│   ├── styles/           # CSS modules
│   ├── services/         # API calls (ipapi, Gmail)
│   ├── App.js
│   ├── index.js
│   └── setupTests.js
├── .env.example          # Sample env file (safe to commit)
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/YOUR_USERNAME/ip-locator.git
cd ip-locator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Add Environment Variables

Create a `.env` file in the root:
```bash
cp .env.example .env
```

Then update it with your actual API keys.

### 4. Run Locally
```bash
npm start
```

---

## 🔐 Environment Variables

See `.env.example` for a template. You’ll need:
- IPAPI Access Key
- Mapbox Public Token
- Google OAuth Client ID and Secret

---

## 🌐 API Services Used

- [ipapi](https://ipapi.com/)
- [Mapbox](https://mapbox.com/)
- [Google Gmail API](https://developers.google.com/gmail/api)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)

---

## ☁️ Deployment Tips

- Deploy frontend on [Vercel](https://vercel.com)
- Deploy backend on [Render](https://render.com) or [Railway](https://railway.app)
- Add environment variables via the platform’s dashboard securely

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change or improve.

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)


