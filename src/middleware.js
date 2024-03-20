import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {jwtDecode} from "jwt-decode"; 
import { ADMIN_ROLE } from './config';

function checkIsTokenCorrect (token) {
  if(!token?.exp) return false
  const expireTime = token.exp
  const currentTime = Math.floor(Date.now() / 1000)
  return expireTime > currentTime ? token : false
}
 
export function middleware(request) {
  const pathname = request.nextUrl.pathname
  const token = cookies().get('token')?.value;

  if(pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    const decodedToken = jwtDecode(token)
    const isTokenCorrect = checkIsTokenCorrect(decodedToken);

    if (!isTokenCorrect) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if(pathname.startsWith('/admin/users') && decodedToken.userRole !== ADMIN_ROLE) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

  } else if(pathname.startsWith('/login')){
    if(token && checkIsTokenCorrect(jwtDecode(token))) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/admin/:path*', '/login'],
}