//import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//const isProtectedRoute = createRouteMatcher([
//  "/dashboard(.*)",
//]);

//export default clerkMiddleware((auth, req) => {
//  if (isProtectedRoute(req)) {
//    auth().protect();
//  }
//});

//export const config = {
//  matcher: ["/((?!_next|.*\\..*).*)"],
//};

//import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//const isProtectedRoute = createRouteMatcher([
//  "/dashboard(.*)",
//]);

//export default clerkMiddleware((auth, req) => {
//  if (isProtectedRoute(req)) {
//    return
//  }
//})

//import { ClerkProvider } from '@clerk/nextjs'
//import type { Metadata } from 'next'
//import './globals.css'

//export const metadata: Metadata = {
//  title: 'HireIQ',
//  description: 'AI-Powered Recruitment Platform',
//}

//export default function RootLayout({
//  children,
//}: {
//  children: React.ReactNode
//}) {
//  return (
//    <ClerkProvider>
//      <html lang="en">
//        <body>{children}</body>
//      </html>
//    </ClerkProvider>
//  )
//}

//import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

//const isPublicRoute = createRouteMatcher([
//  '/',
//  '/sign-in(.*)',
//  '/sign-up(.*)',
//])

//export default clerkMiddleware(async (auth, request) => {
//  if (!isPublicRoute(request)) {
//    await auth.protect()
//  }
//})

//export const config = {
//  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
//}

//import { clerkMiddleware } from "@clerk/nextjs/server";

//export default clerkMiddleware();

//export const config = {
//  matcher: [
//    "/((?!_next|.*\\..*).*)",
//  ],
//};

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};