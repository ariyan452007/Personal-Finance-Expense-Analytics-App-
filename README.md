🏦 FinTrack | Personal Finance & Analytics
Honestly, keeping track of where money goes is a nightmare between UPI, subscriptions, and random cash spends. I built FinTrack because I wanted a clean, single source of truth for my finances that didn't feel like looking at a boring Excel sheet.

This is a production-ready React app designed to give you instant clarity on your spending habits using visual analytics and smart filtering.

✨ What’s inside?
The Big Picture: A dashboard that actually makes sense. See your total balance, monthly income vs. expenses, and your biggest "money-sink" categories at a glance.

Smooth Transactions: Adding an expense takes seconds. I've added a "recurring" toggle for things like Netflix or Rent so they stand out in your history.

Smart Search: I implemented a debounced search bar. You can search for "Starbucks" or that random "Pizza" note you left three weeks ago, and it filters instantly without lagging the UI.

Budgeting That Works: Set a monthly goal and watch the progress bar. It changes color as you get closer to your limit (a gentle nudge to stop spending!).

Data That Sticks: Everything is saved to your browser's local storage. You can refresh the page or close your browser, and your data stays right where you left it.

🛠 My Tech Choices
I picked these tools specifically to keep the app scalable and snappy:

Vite + React: Because life is too short for slow build times.

Context API: I used this for global state (handling transactions and budgets) to avoid the "prop-drilling" mess.

Framer Motion: I’m a fan of "micro-interactions." You’ll notice smooth transitions when you switch pages or add items.

Recharts: Used for the analytics. It's great for showing trends over time rather than just static numbers.

React Hook Form + Yup: This combination handles all the validation logic so you can't accidentally add an expense without a title or a price.

📁 How I structured the code
I followed a modular structure to keep things clean:

src/context: The "brain" of the app. Handles all data logic.

src/hooks: Custom logic like useTransactions and useBudget.

src/components: Reusable UI bits like the Sidebar and Cards.

src/pages: The main views (Dashboard, Analytics, etc.).

🚀 Just want to run it?
Clone it:

Bash
git clone https://github.com/your-username/personal-finance-analytics.git
Install the goods:

Bash
npm install
Fire it up:

Bash
npm run dev
🚧 What’s Next? (The "To-Do" List)
[ ] Real-time Currency: Integrate a live API to switch between INR/USD.

[ ] Dark Mode: Because every dev loves a dark UI.

[ ] Export to CSV: For those times you actually need to show your data to an accountant.

Made with ❤️ and a lot of coffee by Ariyan Sonawane.
