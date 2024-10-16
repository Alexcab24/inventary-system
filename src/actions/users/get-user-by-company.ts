

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";


export const getUserByCompany = async () => {

   const session = await auth()

   if (!session?.user) {
      return {
         ok: false,
         message: 'Debe de estar autenticado'
      }
   };

   const users = await prisma.user.findMany({
      where: {
         companyId: session.user.companyId
      }
   })

   return {
      ok: true,
      users
   }



}

