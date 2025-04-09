
// Mock user data
export const currentUser = {
  id: 1,
  fullName: 'John Smith',
  email: 'john.smith@example.com',
  profileImage: 'https://ui-avatars.com/api/?name=John+Smith&background=0D8ABC&color=fff'
};

// Mock portfolio data
export const portfolioSummary = {
  totalValue: 124750.82,
  totalInvestment: 100000,
  totalGain: 24750.82,
  percentageGain: 24.75
};

// Mock assets data
export const assets = [
  { 
    id: 1, 
    name: 'Apple Inc.', 
    symbol: 'AAPL', 
    type: 'Stock', 
    quantity: 50, 
    purchasePrice: 150.25, 
    currentPrice: 178.42, 
    purchaseValue: 7512.50,
    currentValue: 8921.00,
    percentageChange: 18.75,
    history: [150, 155, 162, 158, 170, 175, 178]
  },
  { 
    id: 2, 
    name: 'Microsoft Corp', 
    symbol: 'MSFT', 
    type: 'Stock', 
    quantity: 30, 
    purchasePrice: 290.45, 
    currentPrice: 336.20, 
    purchaseValue: 8713.50,
    currentValue: 10086.00,
    percentageChange: 15.75,
    history: [290, 295, 310, 305, 320, 330, 336]
  },
  { 
    id: 3, 
    name: 'Bitcoin', 
    symbol: 'BTC', 
    type: 'Cryptocurrency', 
    quantity: 1.25, 
    purchasePrice: 38000, 
    currentPrice: 51200, 
    purchaseValue: 47500.00,
    currentValue: 64000.00,
    percentageChange: 34.74,
    history: [38000, 42000, 45000, 40000, 48000, 50000, 51200]
  },
  { 
    id: 4, 
    name: 'Ethereum', 
    symbol: 'ETH', 
    type: 'Cryptocurrency', 
    quantity: 7.5, 
    purchasePrice: 2600, 
    currentPrice: 2950, 
    purchaseValue: 19500.00,
    currentValue: 22125.00,
    percentageChange: 13.46,
    history: [2600, 2650, 2800, 2700, 2850, 2900, 2950]
  },
  { 
    id: 5, 
    name: 'Vanguard S&P 500 ETF', 
    symbol: 'VOO', 
    type: 'ETF', 
    quantity: 40, 
    purchasePrice: 410.30, 
    currentPrice: 438.25, 
    purchaseValue: 16412.00,
    currentValue: 17530.00,
    percentageChange: 6.81,
    history: [410, 415, 420, 425, 430, 435, 438]
  }
];

// Mock transactions data
export const transactions = [
  { 
    id: 1, 
    date: '2023-01-15', 
    type: 'Buy', 
    assetName: 'Apple Inc.', 
    assetSymbol: 'AAPL', 
    quantity: 50, 
    price: 150.25, 
    total: 7512.50, 
    notes: 'Initial investment'
  },
  { 
    id: 2, 
    date: '2023-01-15', 
    type: 'Buy', 
    assetName: 'Microsoft Corp', 
    assetSymbol: 'MSFT', 
    quantity: 30, 
    price: 290.45, 
    total: 8713.50, 
    notes: 'Initial investment'
  },
  { 
    id: 3, 
    date: '2023-02-05', 
    type: 'Buy', 
    assetName: 'Bitcoin', 
    assetSymbol: 'BTC', 
    quantity: 1.25, 
    price: 38000, 
    total: 47500.00, 
    notes: 'Crypto investment'
  },
  { 
    id: 4, 
    date: '2023-03-10', 
    type: 'Buy', 
    assetName: 'Ethereum', 
    assetSymbol: 'ETH', 
    quantity: 7.5, 
    price: 2600, 
    total: 19500.00, 
    notes: 'Additional crypto'
  },
  { 
    id: 5, 
    date: '2023-05-20', 
    type: 'Buy', 
    assetName: 'Vanguard S&P 500 ETF', 
    assetSymbol: 'VOO', 
    quantity: 40, 
    price: 410.30, 
    total: 16412.00, 
    notes: 'Long-term investment'
  },
  { 
    id: 6, 
    date: '2023-07-15', 
    type: 'Sell', 
    assetName: 'Apple Inc.', 
    assetSymbol: 'AAPL', 
    quantity: 10, 
    price: 170.50, 
    total: 1705.00, 
    notes: 'Partial profit taking'
  },
  { 
    id: 7, 
    date: '2023-08-12', 
    type: 'Buy', 
    assetName: 'Apple Inc.', 
    assetSymbol: 'AAPL', 
    quantity: 10, 
    price: 165.75, 
    total: 1657.50, 
    notes: 'Buy the dip'
  }
];

// Mock financial goals data
export const goals = [
  {
    id: 1,
    name: 'Emergency Fund',
    targetAmount: 25000,
    currentAmount: 15000,
    deadline: '2024-12-31',
    progress: 60
  },
  {
    id: 2,
    name: 'House Down Payment',
    targetAmount: 100000,
    currentAmount: 35000,
    deadline: '2025-06-30',
    progress: 35
  },
  {
    id: 3,
    name: 'Vacation Fund',
    targetAmount: 5000,
    currentAmount: 4500,
    deadline: '2023-12-15',
    progress: 90
  },
  {
    id: 4,
    name: 'New Car',
    targetAmount: 35000,
    currentAmount: 12000,
    deadline: '2025-01-31',
    progress: 34
  }
];

// Mock financial advisor data
export const advisor = {
  id: 1,
  name: 'Sarah Johnson',
  email: 'sarah.johnson@financialadvisors.com',
  phone: '(555) 123-4567',
  expertise: 'Retirement Planning, Tax Optimization',
  image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff',
  bio: 'Sarah has over 15 years of experience helping clients achieve their financial goals through personalized investment strategies and retirement planning.'
};

// Mock advisor meetings
export const advisorMeetings = [
  {
    id: 1,
    date: '2023-11-15T10:00:00',
    topic: 'Annual Portfolio Review',
    duration: 60,
    location: 'Video Call'
  },
  {
    id: 2,
    date: '2023-12-05T14:30:00',
    topic: 'Tax Planning',
    duration: 45,
    location: 'Office'
  }
];

// Asset category distribution for charts
export const assetDistribution = [
  { name: 'Stocks', value: 36537 },
  { name: 'Cryptocurrency', value: 86125 },
  { name: 'ETF', value: 17530 },
  { name: 'Bonds', value: 0 },
  { name: 'Real Estate', value: 0 }
];

// Monthly portfolio performance
export const monthlyPerformance = [
  { month: 'Jan', value: 100000 },
  { month: 'Feb', value: 104500 },
  { month: 'Mar', value: 107800 },
  { month: 'Apr', value: 105200 },
  { month: 'May', value: 112000 },
  { month: 'Jun', value: 116000 },
  { month: 'Jul', value: 119000 },
  { month: 'Aug', value: 121500 },
  { month: 'Sep', value: 123800 },
  { month: 'Oct', value: 124750 }
];

// Asset types for filtering
export const assetTypes = [
  'All',
  'Stock', 
  'ETF', 
  'Cryptocurrency', 
  'Bond', 
  'Real Estate'
];
