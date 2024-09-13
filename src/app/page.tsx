import { redirect } from "next/navigation";


export default function Home() {
  redirect('/dashboard')
  //Aquí estará el login
  return (
    <h1>Hola mundo</h1>
  );
}
