import { NextRequest } from 'next/server';

declare module 'next/server' {
  interface NextRequest {
    user?: {
      _id: string;
      userName: string;
    };
  }
}
