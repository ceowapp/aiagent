import { NextRequest, NextResponse } from "next/server";
import { 
  API_AUTH_PREFIX, 
  AUTH_ROUTES, 
  PUBLIC_ROUTES, 
  USER_PROTECTED_ROUTES, 
  ADMIN_PROTECTED_ROUTES,
  AUTH_SIGNOUT_ROUTES, 
} from "./configs/routes";
import { allowedOrigins, corsHeaders, DOMAIN } from './configs/sites';

export async function middleware(request: NextRequest) {
  const { search, pathname } = request.nextUrl;
  const response = NextResponse.next();
  const origin = request.headers.get('origin') ?? '';
  const isAllowedOrigin = origin && allowedOrigins.some(allowed => {
    if (allowed.includes('*')) {
      const regex = new RegExp('^' + allowed.replace('*', '.*') + '$');
      return regex.test(origin);
    }
    return allowed === origin;
  });
  if (isAllowedOrigin && origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  } 
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Origin': "*", 
      },
    });
  }
  const isApiAuthRoute = pathname.startsWith(API_AUTH_PREFIX);
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));
  const isSignOutRoute = AUTH_SIGNOUT_ROUTES.some(route => pathname.startsWith(route));
  const isProtectedAdminRoute = ADMIN_PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  const isProtectedUserRoute = USER_PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  
  if (isPublicRoute || isApiAuthRoute || isAuthRoute || isSignOutRoute) {
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon\\.ico).*)', 
  ],
};
