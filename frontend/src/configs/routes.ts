export const PUBLIC_ROUTES = [
  "/login",
  "/main"
];

export const API_AUTH_PREFIX = "/api/auth";

export const AUTH_ROUTES = [
  '/api/auth', 
  '/api/auth/google', 
  '/api/auth/shopify', 
  '/api/auth/shopify/callback',
  '/api/auth/google/callback', 
  '/api/auth/session', 
  '/api/auth/shopify/exchange_token', 
  '/api/auth/shopify/verify_session', 
];

export const AUTH_SIGNOUT_ROUTES = [
  '/api/auth/google/signout',
];

export const USER_PROTECTED_ROUTES = [
  "/main",
  "/billing",
];

export const ADMIN_PROTECTED_ROUTES = [
  "/admin",
];

