# BiOS Frontend

> An Open-Source Framework for the Integration of Heterogeneous Biodiversity Data.

This repository contains the frontend application for the **BiOS** framework. Built with [Next.js](https://nextjs.org/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/), it provides a modern, responsive, and interactive user interface for managing, visualizing, and integrating heterogeneous biodiversity data.

## Features

- **Modern Tech Stack**: Powered by Next.js 15, React 19, and TailwindCSS 4.
- **Interactive Maps**: Integrates `react-map-gl` and `maplibre-gl` for advanced spatial data visualization and exploration.
- **Data Visualizations**: Incorporates `@mui/x-charts` for clear, insightful statistical representations.
- **Rich UI Components**: Built with `@heroui/react` and `@mui/material` for a polished, accessible, and intuitive user experience.
- **Fluid Animations**: Enhanced with `framer-motion` for smooth UI transitions.
- **Internationalization**: Built-in multi-language handling using `react-i18next`.

## Getting Started

### Prerequisites

Ensure you have a recent version of Node.js installed, along with your preferred package manager (npm, yarn, pnpm, or bun).

### Installation

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone https://github.com/centrebalearbiodiversitat/BiOS_frontend.git
   cd BiOS_frontend
   ```

2. Install all dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:
   ```bash
   cp .env.template .env
   ```
   _Note: Open `.env` and provide any necessary credentials or keys required by the application._

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action. The development environment supports robust hot-module replacement to instantly reflect code changes without page reloads.

### Production Build

To create an optimized production build, run:

```bash
npm run build
```

Once the application is built, start the production server:

```bash
npm run start
```

## Citation

If you use **BiOS** in your research, workflows, or projects, please acknowledge our work by citing the following article:

> Roldan, A., Duran, T. G., Far, A. J., Capa, M., Arboleda, E., & Cancellario, T. (2026). BiOS: An Open-Source Framework for the Integration of Heterogeneous Biodiversity Data. bioRxiv, 2026-02.

## License

Please refer to the `LICENSE` file in the root directory for information regarding licensing and usage conditions.
