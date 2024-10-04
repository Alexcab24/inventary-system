import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};


export function middleware(req: any) {
  const host = req.headers.get('host'); 
  const subdomain = host.split('.')[0]; 

  req.headers.set('x-company-id', subdomain);


  return NextResponse.next();
}