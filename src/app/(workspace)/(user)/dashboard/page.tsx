import { auth } from "@/auth.config";
import Card from "@/components/ui/dashboard/Cards";
import { FaFileInvoiceDollar, FaUsers } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import Chart from '@/components/ui/dashboard/Chart';
import { fetchProductsGroupedByMonth } from "@/actions/products/get-products-by-company";
import LastedProducts from "@/components/ui/dashboard/LastedProducts";

export default async function DashboardPage() {
  const resp = await fetchProductsGroupedByMonth();

  if (!resp.ok || !resp.data) {
    return <div className="text-center text-red-600 font-semibold">Error fetching data</div>;
  }

  const chartData = resp.data.map((item) => ({
    month: item.month,
    desktop: item.count,
  }));

  const numberOfMonths = chartData.length;
  const session = await auth();

  return (
    <main className="p-4 md:p-6 space-y-6 w-full">
      {/* Saludo */}
      <div className="py-4 md:py-6">
        <span className="text-2xl md:text-4xl font-bold text-gray-800">
          Bienvenido/a, {session?.user.name}! 👋
        </span>
      </div>

      {/* Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Productos en el inventario" value={1234} icon={FaUsers} />
        <Card title="Proveedores registrados" value={"1234"} icon={FaFileInvoiceDollar} />
        <Card title="Productos con stock bajo" value={"1234"} icon={MdAttachMoney} />
      </section>

      {/* Gráficos y Últimos Productos */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="w-full">
          <Chart chartData={chartData} numberOfMonths={numberOfMonths} />
        </div>
        <div className="w-full">
          <LastedProducts />
        </div>
      </section>
    </main>
  );
}
