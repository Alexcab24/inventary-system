import NextAuth from 'next-auth';
import { auth, authConfig } from './auth.config';
import { NextResponse } from 'next/server';
import { adminRoutes } from './utils/protected-routes';



export default NextAuth(authConfig).auth;




export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};


export async function middleware(req: any) {

  const session = await auth();
  const pathName = req.nextUrl.pathname

  if (adminRoutes.some((route) => pathName.startsWith(route))) {
    if (!auth || session?.user.role !== 'admin') {
    
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
      
    }
  }

}