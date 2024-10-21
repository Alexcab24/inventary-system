
import { auth } from "@/auth.config";
import { PaginatedUsersProps } from "@/interfaces";
import prisma from "@/lib/prisma";




//Tabla de usuarios
export const fetchPaginatedUsers = async ({
   page = 1,
   take = 6,
   query
}: PaginatedUsersProps) => {

   //Validaciones de page
   if (isNaN(Number(page))) page = 1;
   if (page < 1) page = 1;

   const session = await auth();

   if (!session?.user) {
      return {
         ok: false,
         message: 'Debe de estar autenticado'
      };
   };



   try {

      const users = await prisma.user.findMany({
         take: take,
         skip: (page - 1) * take,
         where: {
             companyId: session.user.companyId,
             OR: [
                 {
                     name: {
                         contains: query.trim(),  // Asegúrate de eliminar espacios
                         mode: 'insensitive',
                     },
                 },
                 {
                     email: {
                         contains: query.trim(),  // Asegúrate de eliminar espacios
                         mode: 'insensitive',
                     },
                 },
             ],
         },
         orderBy: {
             name: 'asc',
         },
     });
     

      //Obtener total de páginas

      const totalCount = await prisma.user.count({
         where: {
            companyId: session.user.companyId
         }
      });

      const totalPages = Math.ceil(totalCount / take);

      return {
         ok: true,
         currentPage: page,
         totalPages: totalPages,
         users
      };
   } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      return {
         ok: false,
         message: 'Error al obtener los usuarios'
      };
   }
};


//Not filtered users
export const fetchUserByCompany = async () => {

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