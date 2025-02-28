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

    session({ session, token }) {
      session.user = token.data as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Extraer el subdominio de la baseUrl
      const urlParts = baseUrl.split('.'); // Divide la URL por los puntos
      const subdomain = urlParts.length > 2 ? urlParts[0] : ''; // Asegurarse de que haya subdominio
  
      // Verificar si la URL está vacía y ajustarla correctamente
      const correctBaseUrl = baseUrl.replace('https://', `https://${subdomain}.`);
  
      // Si no hay URL de redirección (url es vacía), redirigir a la base URL con el subdominio
      if (!url) {
        return `${correctBaseUrl}${url || '/'}`;
      }
  
      // Si hay una URL de redirección, asegúrate de que esté correctamente concatenada con el subdominio
      return `${correctBaseUrl}${url}`;
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

        const subdomain = getSubdomain(req);  // Aquí extraes el subdominio de la solicitud

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
  ],
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
