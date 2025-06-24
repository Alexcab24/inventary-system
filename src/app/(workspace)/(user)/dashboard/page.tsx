import { auth } from "@/auth.config";
import Card from "@/components/ui/dashboard/Cards";
import { FaFileInvoiceDollar, FaUsers, FaRegSmileBeam, FaTruck } from "react-icons/fa";
import { MdAttachMoney, MdInventory, MdWarningAmber } from "react-icons/md";
import Chart from '@/components/ui/dashboard/Chart';
import { fetchProductByCompany } from "@/actions/products/get-products-by-company";
import { getInboundMovementsByMonth } from "@/actions/movements/get-inbound-movements-by-month";
import LastedProducts from "@/components/ui/dashboard/LastedProducts";
import { fetchSupplierByCompany } from "@/actions/supplier/get-supplier";

export default async function DashboardPage() {
  const resp = await getInboundMovementsByMonth();
  const { products } = await fetchProductByCompany();
  const { suppliers } = await fetchSupplierByCompany();

  if (!resp.ok || !resp.data) {
    return <div className="text-center text-red-600 font-semibold">Error fetching data</div>;
  }

  const chartData = resp.data.map((item) => ({
    month: item.month,
    desktop: item.desktop,
  }));

  const numberOfMonths = chartData.length;
  const session = await auth();

  const totalProducts = products?.length || 0;
  const totalSuppliers = suppliers?.length || 0;
  const lowStock = products?.filter(product => product.stock <= 5).length || 0;

  return (
    <main className="w-full">
      {/* Saludo moderno */}
      <section className="mb-6">
        <div className="relative flex items-center gap-4 p-5 md:p-7 rounded-xl border bg-gradient-to-br from-blue-50/70 to-white shadow-sm overflow-hidden">
          <div className="flex-shrink-0 flex items-center justify-center size-14 md:size-16 rounded-lg bg-blue-100/70">
            <FaRegSmileBeam className="text-blue-500" size={32} />
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-1">
              Welcome, {session?.user.name}! <span className="inline-block">👋</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Here&apos;s a quick overview of your inventory and recent activity.
            </p>
          </div>
          {/* Gradiente decorativo */}
          <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-2xl opacity-60 pointer-events-none" />
        </div>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card
          title="Products in inventory"
          value={totalProducts}
          icon={MdInventory}
          className="bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:shadow-blue-100/50"
        />
        <Card
          title="Registered Suppliers"
          value={totalSuppliers}
          icon={FaTruck}
          className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100 hover:shadow-emerald-100/50"
        />
        <Card
          title="Products with low stock"
          value={lowStock}
          icon={MdWarningAmber}
          className="bg-gradient-to-br from-amber-50 to-white border-amber-100 hover:shadow-amber-100/50"
        />
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
