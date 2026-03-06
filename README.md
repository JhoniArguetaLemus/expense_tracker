<div align="center">

# 💸 Expense Tracker

A clean and minimal personal expense tracking app built with React Native & Expo.

[![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-lightgrey?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

</div>

---


## 📱 Screenshots

<div align="center">


<img width="300" height="1266" alt="IMG_1449" src="https://github.com/user-attachments/assets/fd609f55-bdc1-4b8e-931a-5b75255622d0" />
<img width="300" height="1266" alt="IMG_1450" src="https://github.com/user-attachments/assets/9af1301d-17b6-4ed8-84e0-0de158a15110" />
<img width="300" height="1266" alt="IMG_1451" src="https://github.com/user-attachments/assets/ac385343-15f1-48c3-80a3-40a3395aaf29" />
 
</div>

---

---

## ✨ Features

- ➕ Add expenses with title, amount and category
- 🗑️ Delete expenses with a single tap
- 📊 Visual spending summary by category
- 💾 Persistent storage — data saved locally with AsyncStorage
- 🌙 Dark theme UI
- ⚡ Built with TypeScript for type safety

---

## 🗂️ Categories

| Emoji | Category      |
|-------|---------------|
| 🍔    | Food          |
| 🚗    | Transport     |
| 🎮    | Entertainment |
| 💊    | Health        |
| 🛍️    | Shopping      |
| 📦    | Other         |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React Native | Cross-platform mobile framework |
| Expo | Development toolchain |
| TypeScript | Type safety |
| AsyncStorage | Local data persistence |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (for testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/JhoniArguetaLemus/expense-tracker.git

# Navigate to the project
cd expense-tracker

# Install dependencies
npm install

# Start the development server
npm start
```

Scan the QR code with **Expo Go** on your phone to run the app.

---

## 📁 Project Structure

```
expense-tracker/
├── App.tsx                    # Root component & navigation
├── src/
│   ├── types/
│   │   └── index.ts           # TypeScript types & category config
│   ├── hooks/
│   │   └── useExpenses.ts     # State management + AsyncStorage
│   ├── components/
│   │   ├── ExpenseCard.tsx    # Individual expense item
│   │   └── CategorySummary.tsx# Bar chart by category
│   └── screens/
│       ├── HomeScreen.tsx     # Main list view
│       └── AddExpenseScreen.tsx # Add new expense form
└── package.json
```

---

## 🔮 Roadmap

- [ ] Monthly budget limits
- [ ] Export to CSV
- [ ] Charts with Recharts/Victory Native
- [ ] Multi-currency support
- [ ] Dark/Light mode toggle

---

## 👨‍💻 Author

**José Jhonis Argueta Lemus**

[![Portfolio](https://img.shields.io/badge/Portfolio-arguetadev.com-blue?style=flat-square)](https://www.arguetadev.com)
[![GitHub](https://img.shields.io/badge/GitHub-JhoniArguetaLemus-181717?style=flat-square&logo=github)](https://github.com/JhoniArguetaLemus)

---

<div align="center">
  <sub>Built with ❤️ by Jhoni Argueta</sub>
</div>
