import { NextRequest, NextResponse } from 'next/server';
import rateLimit from '../config/rateLimit';



export async function rateLimitMiddleware(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1';
  const result = await rateLimit.limit(ip);

  if (!result.success) {
    return NextResponse.json({
     
      message: 'Too many requests',
    },{
      status : 429
    });
  }

  return NextResponse.next(); // Continue to next middleware or route handler
}
