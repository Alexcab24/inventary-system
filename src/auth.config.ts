import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';

import prisma from './lib/prisma';
import { getSubdomain } from './lib/subdomain';


export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },

  trustHost: true,
  callbacks: {


    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }

      return token;
    },

    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },



  },



  providers: [

    Credentials({
      async authorize(credentials, req) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const subdomain = getSubdomain(req);
        console.log(subdomain);

        const user = await prisma.user.findUnique({ where: { email: email.toLocaleLowerCase() } });
        if (!user) return null;
        // Comprobación del tenant
        const company = await prisma.company.findUnique({ where: { id_tenant: user.companyId } });
        if (!company || company.id_tenant !== subdomain) {
          return null;
        }

        //Comprobación de habilitación
        if (user.disabled) {
          return null;
        }


        if (!bcryptjs.compareSync(password, user.password)) return null;


        const { password: _, ...rest } = user;

        return {
          ...rest,
          role: user.role,
        };
      },
    }),



  ]
}



export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);