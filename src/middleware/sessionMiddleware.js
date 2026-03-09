import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import session from 'express-session';
import prisma from '../../lib/prisma.js';

const isProduction = process.env.NODE_ENV === 'production';

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
  }),
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
  },
});

export default sessionMiddleware;
