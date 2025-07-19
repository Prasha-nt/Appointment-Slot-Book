# Appointment Slot Booker UI



This is a frontend-focused React application designed to simulate an appointment booking system for a single professional for a single day. Users can view available 30-minute time slots, book them, and see their status update in real-time. The application also includes a date picker to simulate loading different days and an admin feature to pre-book slots.

## ✨ Features

* 🗓️ **Working Hours Display**: Clearly shows the professional's daily availability (e.g., 9:00 AM - 5:00 PM).
* ⏰ **Dynamic Slot Generation**: Automatically generates all potential 30-minute appointment slots within the defined working hours.
* 👆 **Interactive Slot Display**: Presents slots as clickable buttons.
* 🎨 **Visual Slot Status**: Differentiates available slots (green) from booked slots (red and disabled) for clear visual feedback.
* ✅ **Booking Functionality**: Allows users to book an available slot with a single click, updating its status.
* 📅 **Date Selection**: A simple date picker enables users to switch between days, simulating the loading of a new day's schedule by clearing previously booked slots.
* 💬 **Confirmation Messages**: Displays a temporary confirmation message upon successful booking.
* 🔑 **Admin Pre-booking**: An administrative input field allows specific slots to be manually marked as booked, useful for initial setup or testing.
* 📱 **Responsive Design**: Built with Tailwind CSS, ensuring an eye-catching and adaptive user interface across various devices.
* ⚙️ **Client-Side State Management**: All booking logic and slot availability are managed efficiently using React's `useState` and `useCallback`/`useMemo` hooks.

## 🚀 How to Run

To get this project up and running on your local machine, follow these simple steps:

1.  **Clone the repository (or copy the code):**
    If this were a Git repository, you would clone it. For this single-file example, you can simply copy the `App.jsx` content into a new React project.

2.  **Set up a React project:**
    If you don't have a React project set up, you can quickly create one using Vite:

    ```bash
    npm create vite@latest my-appointment-app -- --template react
    cd my-appointment-app
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Install Tailwind CSS:**
    Follow the official Tailwind CSS installation guide for Vite (or your chosen framework).

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

    Then, configure your `tailwind.config.js` to scan your component files:

    ```javascript
    // tailwind.config.js
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          fontFamily: {
            inter: ['Inter', 'sans-serif'],
          },
        },
      },
      plugins: [],
    }
    ```

    Add Tailwind directives to your `src/index.css` (or `src/App.css` if you prefer):

    ```css
    /* src/index.css or src/App.css */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    /* Optional: Add Inter font if not already linked in index.html */
    @import url('[https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap](https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap)');
    ```

5.  **Replace `App.jsx` content:**
    Copy the provided React code (from the `App` component) into your `src/App.jsx` file, replacing its existing content.

6.  **Start the development server:**

    ```bash
    npm run dev
    ```

    Open your browser to the address indicated in the terminal (usually `http://localhost:5173`).

## 🛠️ Technologies Used

* **React**: A JavaScript library for building user interfaces.
* **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.

## 💡 Future Enhancements

* **Backend Integration**: Connect to a real backend to persist booked appointments across sessions and users.
* **User Authentication**: Implement user login to manage personal appointments.
* **Multi-Professional Support**: Extend to allow booking for multiple professionals.
* **Advanced Date Navigation**: Add month/year navigation to the date picker.
* **Cancellation Feature**: Allow users to cancel their booked appointments.
* **Notifications**: Implement email or in-app notifications for bookings/cancellations.

## 📄 License

This project is open-sourced under the MIT License.
