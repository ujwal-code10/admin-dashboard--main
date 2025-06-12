# AdminHub Dashboard

A modern, responsive admin dashboard built with React, TypeScript, and Tailwind CSS. Features a clean interface, dark mode support, and comprehensive admin tools.

![AdminHub Dashboard](public/preview.png)

## 🚀 Features

- 📱 **Responsive Design** - Fully responsive layout that works on all devices
- 🌓 **Dark Mode** - Built-in dark mode with system preference detection
- 📊 **Dashboard Analytics** - Comprehensive dashboard with charts and statistics
- 👥 **User Management** - Client and team management capabilities
- 📈 **Reports** - Detailed reporting and analytics tools
- ⚙️ **Settings Management** - Customizable user settings and preferences
- 🔐 **Authentication** - Secure authentication system
- 💳 **Billing Integration** - Billing and subscription management
- 🎨 **Modern UI** - Clean and modern interface using Tailwind CSS
- 🔧 **Customizable Components** - Built with reusable and customizable components

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Query
- **Routing:** React Router
- **UI Components:** Radix UI
- **Theme Management:** next-themes
- **Charts:** Recharts
- **Build Tool:** Vite
- **Package Manager:** npm/bun

## 📁 Project Structure

```
admin-dashboard/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components
│   │   └── layout/        # Layout components
│   ├── pages/             # Page components
│   │   ├── dashboard/     # Dashboard views
│   │   ├── team/          # Team management
│   │   ├── profile/       # Profile settings
│   │   └── billing/       # Billing pages
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── App.tsx           # Main application component
├── public/                # Static assets
├── index.html            # Entry HTML file
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ or Bun runtime
- npm or bun package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/admin-dashboard.git
   cd admin-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
```

### Tailwind Configuration

The project uses a custom Tailwind configuration with extended themes and colors. You can modify `tailwind.config.ts` to customize the styling.

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Customization

### Themes

The dashboard supports light and dark modes. Theme preferences are managed using `next-themes` and can be customized in:
- `src/index.css` - Theme variables
- `tailwind.config.ts` - Theme extension
- `src/pages/Settings.tsx` - Theme toggle implementation

### Components

UI components are built using a combination of:
- Radix UI for accessibility
- Tailwind CSS for styling
- Custom components in `src/components/ui`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Recharts](https://recharts.org/) for beautiful charts
- [Lucide Icons](https://lucide.dev/) for the icon set

## 📧 Contact

Your Name - (www.linkedin.com/in/ujwalmagar) - magarujal6@gmail.com

Project Link: [https://admin-dashboard-jade-two-66.vercel.app/)
