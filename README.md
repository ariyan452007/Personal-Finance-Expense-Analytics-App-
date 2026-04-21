🏦 FinTrack: Personal Finance & Analytics
FinTrack is a startup-grade, production-ready personal finance management application built with React 19 and Vite. It features a modern dark-mode glassmorphism UI, real-time analytics, and robust transaction management to help users gain full control over their financial health.

🚀 Features
Financial Dashboard: Real-time summaries of total balance, income, expenses, and top spending categories.

Transaction Management: Full CRUD capabilities for income and expenses with support for recurring entries.

Advanced Filtering & Search: Debounced search and multi-parameter filtering (by type, category, and date).

Budget Tracking: Monthly limit setting with visual progress indicators and threshold warnings.

Interactive Analytics: Visualize trends with 6-month history line charts, category pie charts, and income-vs-expense bar charts using Recharts.

Persistence: Secure local data persistence using localStorage.

Responsive UI: Premium glassmorphism design that works seamlessly across mobile and desktop devices.

🛠️ Tech Stack
Frontend: React 19 (Functional Components + Hooks), Vite.

Routing: React Router DOM 7.

State Management: Context API.

Forms & Validation: React Hook Form + Yup.

Charts: Recharts.

Animations: Framer Motion.

Notifications: React-Toastify.

Date Handling: Date-fns.

📂 Project Structure
Plaintext
src/
├── components/
│   └── layout/         # Sidebar and Navigation components
├── context/            # Global state (FinanceContext)
├── hooks/              # Custom logic (useTransactions, useBudget, useDebounce)
├── pages/              # Routed pages (Dashboard, Transactions, Budget, Analytics)
├── utils/              # Formatting helpers and constants
└── App.jsx             # Main routing and provider setup
🚥 Getting Started
Prerequisites
Node.js (v18 or higher)

npm or yarn

Installation
Clone the repository:

Bash
git clone https://github.com/your-username/personal-finance-analytics.git
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
🧪 Development Commands
npm run dev: Starts the Vite development server.

npm run build: Compiles the application for production.

npm run lint: Runs ESLint to check for code quality.

npm run preview: Locally previews the production build.

💡 Future Roadmap
Multi-Currency Support: Integration with live exchange rate APIs.

CSV/PDF Export: Export transaction history for tax and reporting purposes.

PWA Support: Offline capabilities and home-screen installation.

Cloud Sync: Firebase or Supabase integration for cross-device data syncing.
