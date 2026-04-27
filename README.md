# MyVote Helper 🗳️

A high-availability, GIGW 3.0-compliant election intelligence platform designed to simplify the voting experience. Built with modern web technologies, MyVote Helper focuses on scale-to-nation performance, intuitive Gov-Tech design, and rigorous accessibility standards.

## 🚀 Key Features

*   **General Info Hub**: A centralized, interactive dashboard providing essential election information, schedules, and voter guidelines.
*   **Sovereign's Aura System**: A gamified identity verification and voting proof system utilizing computer vision (`InkScanner`) to capture and verify voting ink.
*   **Ask AI Concierge**: An accessible, voice-activated AI assistant designed to guide users through the voting process, providing real-time answers and feedback.
*   **Voter Essentials**: Quick access to critical resources, documents, and checklists required on election day.

## 💻 Tech Stack

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: Vanilla CSS for maximum flexibility & rich aesthetics
*   **AI/ML**: Integrated AI functionalities for the Concierge and InkScanner
*   **Architecture**: Modular, component-driven design

## 🎯 Architecture & Design Focus

*   **Scale-to-Nation Performance**: Architected to handle high traffic loads synonymous with national elections.
*   **GIGW 3.0 Compliance**: Designed with rigorous adherence to the *Guidelines for Indian Government Websites*, ensuring high accessibility (a11y) for all citizens, including screen reader support and keyboard navigation.
*   **Gov-Tech Aesthetic**: A clean, authoritative, yet approachable user interface. Prioritizes premium visuals, dynamic micro-animations, and a highly responsive layout to create a "wow" factor while retaining official dignity.

## 🛠️ Getting Started

### Prerequisites

*   Node.js (v18.17 or later)
*   npm, yarn, pnpm, or bun

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/UdittyaBasak/MyVote_Helper.git
    cd MyVote_Helper
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```text
MyVote_Helper/
├── public/                 # Static assets and icons
├── src/
│   ├── app/                # Next.js App Router (Pages, Layouts, Routing)
│   │   ├── ask-ai/         # AI Concierge interface
│   │   ├── essentials/     # Voter essentials page
│   │   ├── general-info/   # Election data hub
│   │   └── sovereign-aura/ # Voting proof and gamification
│   ├── components/         # Reusable UI components (Header, InkScanner, etc.)
│   └── services/           # Core business logic and external services
├── ...                     # Config files (next.config, tsconfig, etc.)
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/UdittyaBasak/MyVote_Helper/issues).

---
*Built to empower every voter.*
