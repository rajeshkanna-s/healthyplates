import { 
  Utensils, Shirt, Car, Fuel, Smartphone, Wifi, Zap, 
  Apple, ShoppingCart, Film, Gamepad2, Heart, GraduationCap, 
  Home, CreditCard, PiggyBank, MoreHorizontal, Coffee, 
  Building2, Baby, Gift, Wrench, Users, Plane
} from "lucide-react";

export const DEFAULT_CATEGORIES = [
  { name: "Food", icon: "Utensils" },
  { name: "Dress / Clothing", icon: "Shirt" },
  { name: "Travel / Transport", icon: "Car" },
  { name: "Petrol / Fuel", icon: "Fuel" },
  { name: "Mobile Recharge", icon: "Smartphone" },
  { name: "Internet Bill", icon: "Wifi" },
  { name: "Electricity Bill", icon: "Zap" },
  { name: "Vegetables", icon: "Apple" },
  { name: "Grocery", icon: "ShoppingCart" },
  { name: "Cinema / Movies", icon: "Film" },
  { name: "Entertainment", icon: "Gamepad2" },
  { name: "Health / Medical", icon: "Heart" },
  { name: "Education", icon: "GraduationCap" },
  { name: "Rent / Home Loan", icon: "Home" },
  { name: "EMIs / Loans", icon: "CreditCard" },
  { name: "Savings / Investments", icon: "PiggyBank" },
  { name: "Office", icon: "Building2" },
  { name: "Kids / Family", icon: "Baby" },
  { name: "Gifts / Donations", icon: "Gift" },
  { name: "Home Maintenance", icon: "Wrench" },
  { name: "Social / Events", icon: "Users" },
  { name: "Travel / Vacation", icon: "Plane" },
  { name: "Miscellaneous", icon: "MoreHorizontal" },
];

export const CATEGORY_ICONS: Record<string, any> = {
  "Utensils": Utensils,
  "Shirt": Shirt,
  "Car": Car,
  "Fuel": Fuel,
  "Smartphone": Smartphone,
  "Wifi": Wifi,
  "Zap": Zap,
  "Apple": Apple,
  "ShoppingCart": ShoppingCart,
  "Film": Film,
  "Gamepad2": Gamepad2,
  "Heart": Heart,
  "GraduationCap": GraduationCap,
  "Home": Home,
  "CreditCard": CreditCard,
  "PiggyBank": PiggyBank,
  "MoreHorizontal": MoreHorizontal,
  "Coffee": Coffee,
  "Building2": Building2,
  "Baby": Baby,
  "Gift": Gift,
  "Wrench": Wrench,
  "Users": Users,
  "Plane": Plane,
};

export const PLATFORMS_BY_CATEGORY: Record<string, string[]> = {
  "Food": [
    "Swiggy", "Zomato", "Local Restaurant", "Home Cooked", "Canteen", "Street Food", "Other"
  ],
  "Dress / Clothing": [
    "Amazon", "Flipkart", "Meesho", "Ajio", "Myntra", "Tata Cliq", 
    "Local Shop", "Mall", "Showroom", "Other"
  ],
  "Grocery": [
    "BigBasket", "Zepto", "Blinkit", "Swiggy Instamart", "JioMart",
    "DMart", "Reliance Fresh", "Kirana Shop", "Local Market", "Other"
  ],
  "Vegetables": [
    "BigBasket", "Zepto", "Blinkit", "Swiggy Instamart", "JioMart",
    "Vegetable Shop", "Local Market", "Mandi", "Other"
  ],
  "Travel / Transport": [
    "Ola", "Uber", "Rapido", "RedBus", "IRCTC", "MakeMyTrip", "Goibibo", "Yatra",
    "Bus", "Auto", "Metro", "Local Train", "Taxi", "Parking", "Other"
  ],
  "Cinema / Movies": [
    "BookMyShow", "Paytm Movies", "PVR", "INOX", "Local Theatre", "Other"
  ],
  "Mobile Recharge": [
    "Paytm", "PhonePe", "Google Pay", "Amazon Pay", 
    "Jio App", "Airtel App", "VI App", "Local Shop", "Other"
  ],
  "Internet Bill": [
    "Paytm", "PhonePe", "Google Pay", "Amazon Pay", "Provider Website", "Other"
  ],
  "Electricity Bill": [
    "Paytm", "PhonePe", "Google Pay", "Amazon Pay", "EB Office", "Other"
  ],
  "Entertainment": [
    "Netflix", "Amazon Prime", "Disney+ Hotstar", "SonyLIV", "Zee5", "JioCinema",
    "Spotify", "YouTube Premium", "Gaana", "Apple Music", "Google One", "iCloud",
    "BGMI", "Free Fire", "Google Play Store", "Apple App Store", "Other"
  ],
  "Education": [
    "BYJU'S", "Unacademy", "Vedantu", "Udemy", "Coursera", "WhiteHat Jr",
    "School Fees", "Tuition", "Coaching", "Books", "Stationery", "Other"
  ],
  "Health / Medical": [
    "1mg", "NetMeds", "Pharmeasy", "Practo", "Hospital", "Clinic", 
    "Medical Shop", "Lab", "Other"
  ],
  "Petrol / Fuel": [
    "HP", "Indian Oil", "Bharat Petroleum", "Shell", "Local Pump", "Other"
  ],
  "Rent / Home Loan": [
    "Bank Transfer", "UPI", "Cash", "Other"
  ],
  "EMIs / Loans": [
    "Bank EMI", "Personal Loan", "Bike Loan", "Car Loan", "Chit Fund", "Other"
  ],
  "Savings / Investments": [
    "Bank Deposit", "RD", "FD", "SIP", "Mutual Funds", "Gold", 
    "Chit", "Insurance", "Other"
  ],
  "Office": [
    "Tea", "Office Lunch", "Birthday Share", "Cake Cutting", "Gifts", 
    "Team Lunch", "Office Outing", "Office Snack", "Canteen", "Other"
  ],
  "Kids / Family": [
    "Toys", "School Trip", "Family Outing", "Kids Items", "Other"
  ],
  "Gifts / Donations": [
    "Temple", "NGO", "Milaap", "Ketto", "Marriage", "Birthday", "Other"
  ],
  "Home Maintenance": [
    "Urban Company", "Justdial", "Sulekha", "Electrician", "Plumber", 
    "Carpenter", "Service Center", "Other"
  ],
  "Social / Events": [
    "Saloon", "Beauty Parlour", "Spa", "Amusement Park", "Local Events", "Other"
  ],
  "Travel / Vacation": [
    "MakeMyTrip", "Goibibo", "Yatra", "IRCTC", "Hotel", "Airbnb", "Other"
  ],
  "Miscellaneous": [
    "Other"
  ],
};

export const ALL_PLATFORMS = [
  "Swiggy", "Zomato", "Amazon", "Flipkart", "Meesho", "Ajio", "Myntra", "Tata Cliq",
  "BigBasket", "Zepto", "Blinkit", "Swiggy Instamart", "JioMart",
  "Ola", "Uber", "Rapido", "RedBus", "IRCTC", "MakeMyTrip", "Goibibo", "Yatra",
  "BookMyShow", "Paytm Movies", "Paytm", "PhonePe", "Google Pay", "Amazon Pay",
  "Netflix", "Amazon Prime", "Disney+ Hotstar", "SonyLIV", "Zee5", "JioCinema",
  "Spotify", "YouTube Premium", "Gaana", "Apple Music",
  "BYJU'S", "Unacademy", "Vedantu", "Udemy", "Coursera",
  "1mg", "NetMeds", "Pharmeasy", "Practo",
  "Urban Company", "Justdial", "Sulekha",
  "DMart", "Reliance Fresh", "Kirana Shop", "Local Market", "Local Shop",
  "Tea", "Office Lunch", "Birthday Share", "Cake Cutting", "Team Lunch", "Office Outing",
  "Hospital", "Clinic", "Temple", "Bank Transfer", "Cash", "Other"
];

export const PAYMENT_METHODS = [
  "Cash",
  "UPI",
  "Debit Card",
  "Credit Card",
  "Net Banking",
  "Wallet (Paytm)",
  "Wallet (GPay)",
  "Wallet (PhonePe)",
  "Wallet (Amazon Pay)",
];

export const DEFAULT_QUICK_ADD_TEMPLATES = [
  { id: "1", name: "Tea", amount: 20, category: "Office", platform: "Tea", icon: "Coffee" },
  { id: "2", name: "Office Lunch", amount: 120, category: "Office", platform: "Office Lunch", icon: "Utensils" },
  { id: "3", name: "Auto to Office", amount: 50, category: "Travel / Transport", platform: "Auto", icon: "Car" },
  { id: "4", name: "Petrol", amount: 500, category: "Petrol / Fuel", platform: "Local Pump", icon: "Fuel" },
  { id: "5", name: "Grocery", amount: 200, category: "Grocery", platform: "Kirana Shop", icon: "ShoppingCart" },
  { id: "6", name: "Snacks", amount: 50, category: "Food", platform: "Local Shop", icon: "Coffee" },
];

export const DEFAULT_FAMILY_MEMBERS = [
  { id: "1", name: "Me" },
  { id: "2", name: "Spouse" },
  { id: "3", name: "Mom" },
  { id: "4", name: "Dad" },
];

export const CURRENCIES = [
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
];
