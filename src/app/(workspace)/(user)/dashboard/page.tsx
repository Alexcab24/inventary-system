
import { auth } from "@/auth.config";
import Card from "@/components/ui/dashboard/Cards";
import { FaFileInvoiceDollar, FaUsers } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import Chart from '@/components/ui/dashboard/Chart';
import { fetchProductsGroupedByMonth, getLastProducts } from "@/actions/products/get-products-by-company";
import LastedProducts from "@/components/ui/dashboard/LastedProducts";


export default async function DashboardPage() {


  const resp = await fetchProductsGroupedByMonth()

  if (!resp.ok || !resp.data) {
    return <div>Error fetching data</div>;
  }




  const chartData = resp.data.map((item) => ({
    month: item.month,
    desktop: item.count,
  }));

  const numberOfMonths = chartData.length


const session = await auth();

  return (
    <main className="p-6 space-y-6">
    {/* Encabezado de bienvenida */}
    <div className=" p-6 rounded-lg shadow-md">
      <span className="text-4xl font-bold text-gray-800">
        Bienvenido/a, {session?.user.name}! 👋
      </span>
    </div>
  
    {/* Sección de estadísticas */}
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card title="Productos en el inventario" value={1234} icon={FaUsers} />
      <Card title="Proveedores registrados" value={"1234"} icon={FaFileInvoiceDollar} />
      <Card title="Productos con stock bajo" value={"1234"} icon={MdAttachMoney} />
    </section>
  
    {/* Gráfico y Últimos productos */}
    <section className="grid gap-6 md:grid-cols-2 w-full">
      <div className="p-6 bg-white  rounded-lg ">
        <Chart chartData={chartData} numberOfMonths={numberOfMonths} />
      </div>
      
      <LastedProducts />
    </section>
  </main>
  
  );
}
