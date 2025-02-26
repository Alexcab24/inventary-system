
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
    <main>
      <div>
        <span className="text-3xl text-gray-700 font-semibold">Bienvenido/a, {session?.user.name}! </span>
      </div>
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 p-4">
        <Card title="productos en el inventario" value={1234} icon={FaUsers} />
        <Card title="proveedores registrados" value={'1234'} icon={FaFileInvoiceDollar} />
        <Card title="Productos con stock bajo" value={'1234'} icon={MdAttachMoney} />
      </section>
      <section className="grid gap-3 grid-cols-1 md:grid-cols-2 p-4 w-full">
        <Chart
          chartData={chartData}
          numberOfMonths={numberOfMonths}
        />

        <LastedProducts />
      </section>
    </main>
  );
}
