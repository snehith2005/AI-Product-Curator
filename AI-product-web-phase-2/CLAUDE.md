# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **AI-Powered Product Curation and Cross-Platform Price Aggregation for E-Commerce** system - a final year project for MGIT by B.R.MridulaTara & A.Koushik. The frontend is built using React + TypeScript + Vite with TailwindCSS for styling.

## Key Development Commands

```bash
# Development server (runs on localhost:5173 or next available port)
npm run dev

# Production build with TypeScript compilation
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture Overview

### Core Application Structure

- **Router-based SPA**: Uses React Router with a shared Layout component that wraps all pages
- **Three main routes**:
  - `/` - Landing page with project overview and features
  - `/dashboard/user` - Product search interface (referred to as "Product Search" in UI)
  - `/dashboard/business` - Business analytics dashboard

### Component Hierarchy

```
App.tsx (Router setup)
├── Layout (Header + main content + Footer)
    ├── Landing - Marketing page with hero, features, workflow
    ├── UserDashboard - Product search, AI recommendations, price comparison
    └── BusinessDashboard - Analytics, metrics, competitor analysis
```

### Data Architecture

- **Types**: Centralized in `src/types/index.ts`
  - `Product` - Core product interface with pricing, ratings, platform info
  - `PriceComparison` - Cross-platform price comparison data
  - `BusinessMetric` - Analytics metrics with trend indicators

- **Mock Data**: Located in `src/data/mockData.ts`
  - Sample products from various e-commerce platforms
  - Price comparison data across multiple platforms
  - Business metrics and trend data for dashboard visualization

### Key Features Implemented

1. **Product Search Dashboard**:
   - AI-powered search with category filtering
   - Product cards with price, ratings, stock status
   - Cross-platform price comparison modal
   - Personalized AI recommendations

2. **Business Analytics Dashboard**:
   - KPI metrics with trend indicators
   - Price trend visualizations
   - Competitor benchmarking table
   - Customer journey analytics
   - Sentiment analysis charts

3. **Responsive Design**:
   - Mobile-first approach using TailwindCSS
   - Consistent navigation with active states
   - Professional styling throughout

## Technology Stack

- **Frontend**: React 19.1.1 + TypeScript 5.8.3
- **Build Tool**: Vite 7.1.2
- **Styling**: TailwindCSS 4.1.13 with Vite plugin
- **Routing**: React Router DOM 7.8.2
- **Linting**: ESLint with TypeScript support

## Development Notes

- The project uses TailwindCSS v4 with the Vite plugin (not PostCSS)
- Types are separated from data files to avoid import/export issues
- All pages use the shared Layout component for consistent header/footer
- Mock data is structured to demonstrate real-world e-commerce scenarios
- The UserDashboard component is displayed as "Product Search" in the UI but maintains the technical name

## Project Context

This frontend serves as a demonstration for an AI-powered e-commerce system that integrates:
- Machine Learning recommendations
- Natural Language Processing for product matching
- Cross-platform data aggregation
- Business intelligence and analytics
- Sustainable e-commerce practices

The application showcases the frontend interface for what would be a comprehensive backend system using Python, ML libraries (scikit-learn, NLTK, spaCy), and databases (PostgreSQL, Redis).