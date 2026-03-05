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
  <img width="280" alt="Home" src="https://github.com/user-attachments/assets/82927c6a-23e1-4537-8462-1357ed71eebd" />
  &nbsp;&nbsp;&nbsp;
  <img width="280" alt="Add Expense" src="https://github.com/user-attachments/assets/74316e25-59af-4d5c-8981-7e0a3957421d" />
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
