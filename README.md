# Planify - Saas Plan Platform with Stripe Integration

Welcome to Planify, a web application for handling user roles (Super Admin, Admin, and User) with payment integration using Stripe! 🚀

---

## 🌟 Features
- **Role-Based Access Control**:
  - Super Admin: Manage organizations and plans.
  - Admin: Manage orders and checkout.
  - User: View personal dashboard.
- **Stripe Payment Integration** for secure checkout.
- **Cart and Plans**: Add and manage plans effortlessly.
- **Secure Authentication**: Powered by JWT.
- **Modern UI/UX**: Built with React and Tailwind CSS.

---

## 💻 Tech Stack
- **Frontend**: React.js, Tailwind CSS, React Router, Redux
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payments**: Stripe API
- **State Management**: Redux Toolkit

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- A Stripe account for API keys.

---

### 🔧 Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/eshaanpandey/Planify.git
   cd Planify
   ```

2. **Install dependencies**:
   - For the backend:
     ```bash
     cd server
     npm install
     ```
   - For the frontend:
     ```bash
     cd client
     npm install
     ```

3. **Set up environment variables**:
   - Create a `.env` file in the `server` folder with the following keys:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     STRIPE_SECRET_KEY=your_stripe_secret_key
     ```
   - Create a `.env` file in the `client` folder with the following key:
     ```env
     REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
     ```

4. **Start the development servers**:
   - Backend:
     ```bash
     cd server
     npm run dev
     ```
   - Frontend:
     ```bash
     cd client
     npm start
     ```

5. **Open in your browser**:
   Navigate to `http://localhost:3000` to access the application.

---

## 📂 Project Structure

### **Frontend (`/client`)**
- **`src/pages`**: Contains main dashboard and landing pages.
- **`src/components`**: Reusable UI components like Login, Register, Cart, etc.
- **`src/routes`**: Role-based route management.

### **Backend (`/server`)**
- **`/routes`**: API routes for authentication, plans, payments, and more.
- **`/models`**: MongoDB models for users, organizations, and plans.
- **`/middlewares`**: Authentication and role-based middleware.

---

## 🎥 Demo Video
Watch the demo video [here](https://drive.google.com/file/d/1wHgqVcOTj2WiL20tDqD2yigo0tnpylnF/view?usp=sharing).

---

## 🖼️ Screenshots

### **Login Page**
<img width="1440" alt="Login page" src="https://github.com/user-attachments/assets/8a27975b-f18b-4abd-b638-b68eda9b7efb" />

### **Registration Page**
<img width="1440" alt="Registration Page" src="https://github.com/user-attachments/assets/7d53c1a8-405c-4307-9e60-0ef8108fcdde" />

### **Plans Page**
<img width="1440" alt="Superadmin Plans page" src="https://github.com/user-attachments/assets/af91b41a-76e7-4844-862c-2bbbdfac2b45" />
<img width="1440" alt="Admin plans page" src="https://github.com/user-attachments/assets/ea05708f-be85-4486-bb87-4a9509f0844c" />

### **Cart and Checkout**
<img width="1440" alt="Cart" src="https://github.com/user-attachments/assets/48b17c53-25e4-4d6d-8aa3-020ca3350b1f" />


