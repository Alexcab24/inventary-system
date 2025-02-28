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
      // Obtener el subdominio de baseUrl (por ejemplo, 'testcompany')
      const urlParts = baseUrl.split('.'); // Divide la URL en partes
      const subdomain = urlParts.length > 2 ? urlParts[0] : ''; // Obtener el subdominio (si existe)
  
      // Si no hay subdominio, no agregar nada a la URL base
      if (!subdomain) {
        return url || baseUrl;  // Si no hay subdominio, solo devolver la URL
      }
  
      // Si hay subdominio, agregarlo a la baseUrl
      const correctBaseUrl = `https://${subdomain}.${urlParts.slice(1).join('.')}`;
  
      // Si no hay URL de redirección, redirigir a la base URL con el subdominio
      if (!url) {
        return correctBaseUrl; // Solo devolver la URL base corregida
      }
  
      // Si hay una URL de redirección, agregar el subdominio correctamente
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
