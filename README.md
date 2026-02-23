# Stoic Wisdom

A modern web application featuring classic Stoic philosophy quotes from the great masters - Seneca, Marcus Aurelius, and Epictetus. Explore timeless wisdom with beautiful design and intuitive interactions.

## Features

- **Daily Quote**: Get a new Stoic quote every day based on the date
- **Random Quotes**: Discover quotes at random to explore the collection
- **Category Filtering**: Browse quotes by themes:
  - Resilience
  - Wisdom
  - Mortality
  - Happiness
  - Discipline
  - Virtue
  - Mindfulness
- **Favorites**: Save your favorite quotes for later
- **Author Biographies**: Learn about the Stoic philosophers
- **Reading Progress**: Track how many quotes you've explored
- **Export as Image**: Download beautiful quote images
- **Keyboard Shortcuts**:
  - `Space` or `→` - New quote
  - `C` - Copy quote
  - `F` - Favorite/unfavorite

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **@siemens/ix-react** - Design system components
- **React Router** - Navigation
- **Vitest** - Testing

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/csatarij/stoic-wisdom.git
cd stoic-wisdom

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Live Demo

Visit the deployed application: [https://csatarij.github.io/stoic-wisdom/](https://csatarij.github.io/stoic-wisdom/)

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow is configured in `.github/workflows/deploy.yml`.

To trigger a deployment, simply push to the `main` branch.

## Origin

This project was initially created using [Lovable](https://lovable.dev) and then exported to a local codebase for further development and customization.

## License

This project is private and proprietary.