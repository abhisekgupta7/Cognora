import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isClerkRoute = createRouteMatcher([
  '/__clerk(.*)',
  // add any other routes Clerk actually needs to protect
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isClerkRoute(request)) {
    return; // let NextAuth handle everything else
  }
  await auth.protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/__clerk/:path*',
    '/(api|trpc)(.*)',
  ],
};