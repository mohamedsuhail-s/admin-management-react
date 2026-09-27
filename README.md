# ⚡ Admin Management Console (React + Vite)

A modern, responsive, full-featured **Admin Management Console** built with **React** and **Vite**. Features a single-menu focused layout for **User Management** with **Create, Edit, and Delete** operations, interactive filters, grid/table view toggle, bulk actions, and dark/light mode.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)

---

## ✨ Features

- 👥 **User Management (Primary Focused Menu)**: Single menu navigation item dedicated to user administration.
- ➕ **Create User**: Full modal dialog with real-time validation for Name, Email, Role, Department, Status, Phone, Password, and Avatar selector.
- ✏️ **Edit User**: Instant pre-populated modal for modifying existing user records, roles, departments, or access status.
- 🗑️ **Delete User (Single & Bulk)**: Soft warning modal confirmation to delete single users or batch-delete selected users.
- 👁️ **User Details Drawer**: Slide-over inspector panel detailing permissions, contact info, and activity log.
- 🔍 **Search & Filters**: Real-time filtering by user name, email, department, or system role.
- 📊 **Table & Grid Layout Switcher**: Switch between a data table view and a visual card grid.
- ⚡ **Bulk Actions**: Batch set active/inactive, bulk delete, and export selected records to CSV.
- 🌓 **Dark & Light Mode**: Customizable design system with local theme persistence.
- 💾 **LocalStorage Persistence**: Maintains state across browser reloads.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, JavaScript (ES6+)
- **Build Tool**: Vite
- **Icons**: Lucide React (`lucide-react`)
- **Styling**: Modern CSS Design System (Variables, Glassmorphism, Responsive Grid)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mohamedsuhail-s/admin-management-react.git
   cd admin-management-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
