# Controle de Finanças Pessoais

## Overview

This is a personal finance management web application built with vanilla HTML, CSS (Tailwind), and JavaScript. The application allows users to track their income and expenses, automatically calculate savings goals, and maintain a comprehensive financial overview through a dashboard interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla HTML, CSS, and JavaScript
- **Styling Framework**: Tailwind CSS for responsive design and component styling
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Mobile-first approach with responsive grid layouts

### Client-Side Architecture
- **Class-Based Structure**: Main `FinanceManager` class handles all financial operations
- **Event-Driven**: DOM event handling for form submissions and user interactions
- **Local Storage**: Browser's localStorage for data persistence
- **Modular Design**: Separate methods for different financial categories

## Key Components

### 1. Dashboard System
- **Overview Cards**: Display total earnings, expenses, savings, and available balance
- **Real-time Updates**: Automatic recalculation when data changes
- **Visual Indicators**: Color-coded cards for different financial metrics

### 2. Income Management
- **Fixed Income**: Regular monthly income sources
- **Variable Income**: One-time or irregular income entries with dates
- **Income Categories**: Structured tracking of different income types

### 3. Expense Management
- **Fixed Expenses**: Monthly recurring expenses (rent, utilities, subscriptions)
- **Variable Expenses**: Irregular expenses with date tracking
- **Daily Expenses**: Day-to-day spending with description and date

### 4. Financial Calculations
- **Automatic Totals**: Real-time calculation of income and expense totals
- **Savings Goal**: 10% of total income automatically allocated to savings
- **Available Balance**: 90% of income minus total expenses

### 5. Data Management
- **Local Storage**: Browser-based data persistence
- **CRUD Operations**: Add, view, and manage financial entries
- **Data Validation**: Form validation for financial entries

## Data Flow

1. **User Input**: Forms for adding income and expenses
2. **Data Processing**: JavaScript validation and formatting
3. **Storage**: Local storage persistence
4. **Calculation**: Automatic financial calculations
5. **Display**: Real-time dashboard updates
6. **Interaction**: User can view and manage all entries

### Data Structure
```javascript
{
    fixedIncome: [],      // Monthly recurring income
    variableIncome: [],   // One-time income with dates
    fixedExpenses: [],    // Monthly recurring expenses
    variableExpenses: [], // Irregular expenses with dates
    dailyExpenses: []     // Daily spending entries
}
```

## External Dependencies

### CDN Dependencies
- **Tailwind CSS**: `https://cdn.tailwindcss.com` - Main styling framework
- **Font Awesome**: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css` - Icons

### No Backend Dependencies
- Pure client-side application
- No server-side processing required
- No database connections needed

## Deployment Strategy

### Static Hosting
- **No Build Process**: Direct HTML/CSS/JS files
- **CDN Delivery**: External dependencies loaded from CDNs
- **Browser Compatibility**: Modern browsers with localStorage support

### Local Development
- **No Server Required**: Can run directly in browser
- **File Structure**: Single directory with HTML, CSS, and JS files
- **Testing**: Browser-based testing and debugging

### Production Considerations
- **Performance**: Minimal dependencies, fast loading
- **Security**: Client-side only, no server vulnerabilities
- **Scalability**: Limited to browser localStorage capacity
- **Backup**: No automatic backup (localStorage only)

## Technical Decisions

### Frontend-Only Architecture
- **Problem**: Need for simple, accessible financial tracking
- **Solution**: Client-side application with localStorage
- **Rationale**: Eliminates server costs and complexity while maintaining user privacy
- **Trade-offs**: Limited storage capacity, no cross-device sync

### Tailwind CSS Choice
- **Problem**: Need for responsive, professional styling
- **Solution**: Utility-first CSS framework
- **Rationale**: Rapid development, consistent design, built-in responsiveness
- **Alternatives**: Bootstrap, custom CSS
- **Pros**: Fast development, small bundle size, highly customizable

### localStorage for Persistence
- **Problem**: Need to save user financial data
- **Solution**: Browser's localStorage API
- **Rationale**: No server required, immediate persistence, simple implementation
- **Trade-offs**: Data limited to single browser, no backup mechanism

### Vanilla JavaScript
- **Problem**: Need for dynamic financial calculations and DOM manipulation
- **Solution**: Pure JavaScript without frameworks
- **Rationale**: Lightweight, no learning curve, full control
- **Alternatives**: React, Vue, Angular
- **Pros**: Fast loading, no dependencies, simple debugging