import { redirect } from "next/navigation";


export default function Home() {
  redirect('/auth/login')
  //Aquí estará el login
  return (
    <h1>Hola mundo</h1>
  );
}
