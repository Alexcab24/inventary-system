
import { auth } from "@/auth.config";
import Card from "@/components/ui/dashboard/Cards";
import { FaFileInvoiceDollar, FaUsers } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";


export default async function DashboardPage() {
  const session = await auth();
  return (
    <main>
      {/* <div>
        <span className="text-3xl text-gray-700 font-semibold">Bienvenido, {session?.user.name}! </span>
      </div> */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 p-4">
        <Card title="Todos los clientes" value={1234} icon={FaUsers} />
        <Card title="Todas las facturas" value={'1234'} icon={FaFileInvoiceDollar} />
        <Card title="Dinero de hoy" value={`RD$${1234}`} icon={MdAttachMoney} />
      </section>
      <section className="grid gap-3 grid-cols-1 md:grid-cols-2 w-full">
        {/* <InventorySummary /> */}
      </section>
    </main>
  );
}
