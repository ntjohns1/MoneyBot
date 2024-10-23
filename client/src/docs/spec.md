# SPEC-001: Frontend for MoneyBot

## Background

The frontend application will interface with a backend powered by the Alpaca Trade API. The key focus of the application is to enable users to interact with real-time financial data, manage their positions, and make informed trades. The frontend should be built with reusable components, ensuring scalability and maintainability.

## Requirements

**Must-Have:**
> Input component for selecting stocks by company name (Assets endpoints)
> Baseline chart component for historical data display
> Main dashboard to display current amount invested and top positions
> Table showing a list of positions (top positions)
> Buying Power, Cash, Daily Change, and Day Trade count box
> Form for creating orders, with bid/ask price display if a stock is selected
> Ability to add/remove stocks from a watchlist
> Stock search with an autocomplete feature
> Display of the total amount invested as a chart

**Should-Have:**
> News feed for company news and updates
> Chart display when a single stock is selected
> Enhancement to connect to Sharadar fundamentals and metrics.

**Could-Have:**
> Integration with external MUI autocomplete API for enhanced input functionality

**Won’t-Have for Now:**
> Advanced metrics, portfolio management, quant trading algos. All planned for future releases.

## Method

### 1. Reusable Components

> **Stock Input Component**: Autocomplete field for stock selection, using the Alpaca Assets API and possibly MUI Autocomplete for enhanced UX.
> **Chart Component**: Line chart for displaying historical data of stocks, built using Chart.js or D3.js.
  
### 2. Main Dashboard

> **Current Amount Invested**: Displays total investments in large font.
> **Positions Table**: Displays user's top positions in a table format.
> **Financial Metrics Box**: Displays Buying Power, Cash, Daily Change, Day Trade Count using data from the `/v2/account` API.
> **Chart of Total Amount Invested**: A line chart that tracks the total investment amount over time.
  
### 3. Order Creation

> **Order Form Component**: Allows users to place buy/sell orders, including a stock selector, order type selector, and bid/ask price display.
> **Bid/Ask Prices**: Displays real-time bid and ask prices for the selected stock using the Alpaca API.

### 4. Watchlist Functionality

> **Add/Remove from Watchlist**: Users can add or remove stocks from a personalized watchlist using Alpaca Watchlist API.
> **Watchlist Display**: Shows current watchlist stocks with basic stock details like price and daily change.

### 5. News Feed

> **News Feed Component**: Displays the latest news related to stocks in the user’s portfolio or watchlist, with links to full articles.

## Implementation

### Step 1: Project Setup and Structure
> Set up a React-based frontend application.
> Install required dependencies: `axios`, `@mui/x-charts`, `@mui/material`.
> Organize the project structure for components, services, and pages.

### Step 2: Build Reusable Components
> Implement the Stock Input (Autocomplete) and Chart components.
> Ensure these components can be reused in the dashboard, order form, and other areas.

### Step 3: Main Dashboard
> Implement the current amount invested, positions table, and financial metrics box.
> Add chart to display total investments over time.

### Step 4: Order Form and Watchlist Integration
> Implement order form with stock selection and order type.
> Add the ability to manage a watchlist (add/remove stocks).

### Step 5: News Feed Component
> Implement a news feed component to display relevant stock market news.

### Step 6: Testing and Debugging
> Write unit tests for individual components.
> Perform integration and manual testing for API data handling.

### Step 7: Final Integration and Deployment
> Deploy the application using platforms like Netlify or Vercel.
> Perform final tests with live API data.

## Milestones

Here’s a proposed milestone plan to track progress:

1. **Milestone 1**: Project setup, install dependencies, and structure the project.
   - Estimated time: 1 week

2. **Milestone 2**: Implement reusable components (Stock Input, Chart) and integrate them with the Alpaca API.
   - Estimated time: 1-2 weeks

3. **Milestone 3**: Implement the main dashboard, displaying positions, account metrics, and total investment chart.
   - Estimated time: 2 weeks

4. **Milestone 4**: Implement order creation functionality, including stock selection, order type, and bid/ask price.
   - Estimated time: 2 weeks

5. **Milestone 5**: Implement watchlist management and news feed components.
   - Estimated time: 1-2 weeks

6. **Milestone 6**: Testing, debugging, and deployment.
   - Estimated time: 1 week

## Gathering Results

### Evaluation Criteria:

1. **User Experience**:
   - Is the application easy to use?
   - Do the components (input, charts, order form) work smoothly and consistently?

2. **API Performance**:
   - Are the API requests handled efficiently?
   - Are API data (positions, account data, stock prices) updated in real-time?

3. **Application Stability**:
   - Is the application stable in both development and production environments?
   - How does the application handle errors, such as API failures or invalid data?

4. **Feature Set**:
   - Are all must-have and should-have features implemented correctly?
   - Is the application scalable for future updates (e.g., adding more financial metrics, additional charts)?