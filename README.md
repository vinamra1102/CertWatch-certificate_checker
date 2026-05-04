# 🔐 CertWatch

A modern SaaS-style dashboard for monitoring SSL certificates, tracking expiration timelines, and preventing unexpected outages.

Built with a focus on **clean UI, scalability, and real-world usability**.

---

## 🚀 Overview

CertWatch helps developers and teams stay ahead of SSL certificate expirations with a clean, intuitive interface and proactive alerting system.

> Stop finding out your certificate expired from your users.

---

## ✨ Features

### 📊 Dashboard

* Overview of all monitored domains
* Certificates expiring soon (24h / 7d / 30d)
* Expiry timeline visualization

### 🌐 Domains

* Add and manage domains
* Status tracking (Active / Expiring / Critical)
* Issuer identification (Let's Encrypt, Sectigo, DigiCert, etc.)

### 🚨 Alerts

* Centralized alert panel
* Severity-based filtering
* Tracks expiration and certificate issues

### ⚙️ Settings

* Email notification toggle
* Webhook support (Slack / Discord)
* Custom alert thresholds

### 🔑 Authentication

* Minimal and clean login system

---

## 🧱 Tech Stack

* **Frontend:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui
* **State Management:** TanStack Query
* **Charts:** Recharts

---

## 📂 Project Structure

```bash
/app
  /dashboard
  /domains
  /alerts
  /settings
  /login
/components
  Sidebar.tsx
  Navbar.tsx
  StatCard.tsx
  DomainTable.tsx
/lib
  api.ts
```

---

## 🧪 Project Status

🚧 Frontend MVP complete
🔄 Backend integration in progress

---

## ⚡ Getting Started

```bash
git clone https://github.com/your-username/certwatch.git
cd certwatch
npm install
npm run dev
```

---

## 🎯 Roadmap

* [ ] Backend integration (FastAPI)
* [ ] Real-time SSL certificate checks
* [ ] Email & webhook alerts
* [ ] Dockerized deployment
* [ ] Multi-user support

---

## 💡 Vision

CertWatch aims to be a **developer-first SSL monitoring tool** with a clean UI and powerful alerting system—something you’d actually want to use daily.

---

## 🧑‍💻 Author

Built with a focus on clarity, performance, and real-world impact.

