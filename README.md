# New Year Countdown with Fireworks

This is a Next.js app built using TypeScript, Tailwind CSS, and the App Router, designed to display a large countdown to the New Year (January 1, 2025, 12:00 AM, Asia/Manila Time Zone). Once the countdown reaches zero, fireworks will appear. The fireworks feature is testable via a configurable variable that can be adjusted for testing purposes.

## Features

- **Countdown Screen**: A large, prominent countdown that shows the time remaining until the New Year.
- **Fireworks Effect**: Once the countdown reaches zero, "fireworks" will appear on the screen.
- **Customizable Target Date**: Developers can change the target date (e.g., setting it to a different time and date) to trigger the fireworks effect.

## Requirements

- Node.js (v16 or higher)
- npm (or yarn)

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).


## Notes

- The app uses **Tailwind CSS** for styling. For more information, check the [Tailwind CSS documentation](https://tailwindcss.com/).
- The app uses the **App Router** in Next.js for routing.
- The fireworks feature (canvas-confetti) is triggered based on the target date and will be visible on the screen once the countdown hits zero.

## License

This project is open-source and available under the MIT License.

