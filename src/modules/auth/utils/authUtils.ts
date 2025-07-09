import { User } from '../store/authSlice';

// Token utilities
export const tokenUtils = {
  // Store token in localStorage
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  },

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  // Remove token from localStorage
  removeToken(): void {
    localStorage.removeItem('auth_token');
  },

  // Check if token exists
  hasToken(): boolean {
    return !!this.getToken();
  },

  // Store refresh token
  setRefreshToken(refreshToken: string): void {
    localStorage.setItem('refresh_token', refreshToken);
  },

  // Get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  },

  // Remove refresh token
  removeRefreshToken(): void {
    localStorage.removeItem('refresh_token');
  },

  // Clear all tokens
  clearTokens(): void {
    this.removeToken();
    this.removeRefreshToken();
  },

  // Check if token is expired (basic check)
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  },
};

// User utilities
export const userUtils = {
  // Get user initials
  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  },

  // Get user display name
  getDisplayName(user: User): string {
    return user.name || user.email.split('@')[0];
  },

  // Check if user has role
  hasRole(user: User, role: string): boolean {
    return user.role === role;
  },

  // Check if user is admin
  isAdmin(user: User): boolean {
    return this.hasRole(user, 'admin');
  },

  // Format user for display
  formatUser(user: User): string {
    return `${user.name} (${user.email})`;
  },
};

// Validation utilities
export const validationUtils = {
  // Email validation
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Password validation
  isValidPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },

  // Get password strength
  getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    if (this.isValidPassword(password)) return 'strong';
    return 'medium';
  },

  // Validate login form
  validateLoginForm(email: string, password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!email) {
      errors.push('Email is required');
    } else if (!this.isValidEmail(email)) {
      errors.push('Please enter a valid email address');
    }

    if (!password) {
      errors.push('Password is required');
    } else if (password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

// Auth state utilities
export const authStateUtils = {
  // Create initial auth state
  createInitialState() {
    return {
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    };
  },

  // Check if user is authenticated
  isAuthenticated(state: any): boolean {
    return state.isAuthenticated && !!state.user && !!state.token;
  },

  // Get auth header
  getAuthHeader(token: string): { Authorization: string } {
    return { Authorization: `Bearer ${token}` };
  },
};

// Session utilities
export const sessionUtils = {
  // Set session expiry
  setSessionExpiry(minutes: number): void {
    const expiryTime = Date.now() + (minutes * 60 * 1000);
    localStorage.setItem('session_expiry', expiryTime.toString());
  },

  // Check if session is expired
  isSessionExpired(): boolean {
    const expiryTime = localStorage.getItem('session_expiry');
    if (!expiryTime) return true;
    
    return Date.now() > parseInt(expiryTime);
  },

  // Clear session
  clearSession(): void {
    localStorage.removeItem('session_expiry');
    tokenUtils.clearTokens();
  },

  // Extend session
  extendSession(minutes: number = 30): void {
    this.setSessionExpiry(minutes);
  },
};

// Security utilities
export const securityUtils = {
  // Generate random string
  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  },

  // Hash password (client-side hashing for additional security)
  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  // Sanitize input
  sanitizeInput(input: string): string {
    return input.replace(/[<>]/g, '');
  },
}; 