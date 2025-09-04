# BizAi Frontend

This is the **frontend of BizAi**, an AI-powered chatbot that helps Nigerian entrepreneurs with **business registration, tax, and trade compliance**.  

The **web chat** is the **primary feature**, with an optional **WhatsApp extension**.

---

## Live Demo
 [Visit Web App](https://bizai-gamma.vercel.app)  

---

## Features
-  **Web Chat** – interactive chatbot interface (core platform)  
-  **WhatsApp Chat Integration** – optional extension for users  
-  **Modern UI** – built with TailwindCSS + Shadcn components  
-  **Fast & Responsive** – optimized for desktop & mobile  

---

##  Tech Stack
- **Framework:** [Next.js 15]  
- **Styling:** TailwindCSS + Shadcn UI  
- **State Management:** React hooks & Context API   
- **Deployment:** Vercel  

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YourOrg/bizai-frontend.git
cd bizai-frontend
```
### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env.local` file in the root folder with: 
```bash
# Authentication secrets
CLIENT_ID=
CLIENT_SECRET=

VERIFY_TOKEN=
WHATSAPP_TOKEN=
WHATSAPP_PHONE_ID=
```

### 4. Run the development server
```bash
npm run dev
```
App will be available at http://localhost:3000
