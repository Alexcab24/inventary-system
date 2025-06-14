import { auth } from "@/auth.config";
import Card from "@/components/ui/dashboard/Cards";
import { FaFileInvoiceDollar, FaUsers } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import Chart from '@/components/ui/dashboard/Chart';
import { fetchProductByCompany, fetchProductsGroupedByMonth } from "@/actions/products/get-products-by-company";
import LastedProducts from "@/components/ui/dashboard/LastedProducts";
import { fetchSupplierByCompany } from "@/actions/supplier/get-supplier";

export default async function DashboardPage() {
  const resp = await fetchProductsGroupedByMonth();
  const { products } = await fetchProductByCompany();
  const { suppliers } = await fetchSupplierByCompany();


  if (!resp.ok || !resp.data) {
    return <div className="text-center text-red-600 font-semibold">Error fetching data</div>;
  }

  const chartData = resp.data.map((item) => ({
    month: item.month,
    desktop: item.count,
  }));

  const numberOfMonths = chartData.length;
  const session = await auth();

  const totalProducts = products?.length || 0;
  const totalSuppliers = suppliers?.length || 0;
  const lowStock = products?.filter(product => product.stock <= 5).length || 0;

  return (
    <main className="  w-full">
      {/* Saludo */}
      <div className="py-2 md:py-3">
        <span className="text-2xl md:text-4xl font-bold text-gray-800">
          Bienvenido/a, {session?.user.name}! 👋
        </span>
      </div>

      {/* Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card
          title="Productos en el inventario"
          value={totalProducts}
          icon={FaUsers}
          className="bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:shadow-blue-100/50"
        />
        <Card
          title="Proveedores registrados"
          value={totalSuppliers}
          icon={FaFileInvoiceDollar}
          className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100 hover:shadow-emerald-100/50"
        />
        <Card
          title="Productos con stock bajo"
          value={lowStock}
          icon={MdAttachMoney}
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
