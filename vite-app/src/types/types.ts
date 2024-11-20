// Auth & User Types
export interface TokenResponse {
  sessionToken: string;
}

export interface DecodedToken {
  user: {
    firstName: string;
    email: string;
  };
  exp: number;
}

export interface User {
  firstName: string;
  email: string;
}

export interface StoredUser extends User {
  sessionToken: string;
  exp: number;
}

// Site Types
export interface Site {
  id: string;
  displayName: string;
  createdOn: string;
  lastUpdated: string;
  lastPublished: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

export interface SitesResponse {
  sites: Site[];
}

// Component Props Types
export interface DashboardProps {
  user: User;
  sites: Site[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onFetchSites: () => void;
}

export interface DataTableProps {
  data: Site[];
}

export interface AuthScreenProps {
  onAuth: () => void;
}

// JWT Decoded Token Type
export interface DecodedToken {
  user: User;
  exp: number;
  // Add other JWT claims as needed
  iat?: number;
  iss?: string;
}

// Environment Variables Type
export interface ImportMetaEnv {
  VITE_NEXTJS_API_URL: string;
  // Add other env variables as needed
}
