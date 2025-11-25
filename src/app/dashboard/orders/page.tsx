// app/products/page.tsx
export const dynamic = 'force-dynamic';
import { IOrder } from "@/types";
import { DataTable } from "../../../components/DataTable";
import Fetcher from "../../../components/Fetcher";
import { orderColumns } from "./columns";

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Fetcher resourceName="orders" cache="force-cache" tags={["orders"]}>
  {({ data: { docs: data } }) => (
    <DataTable<IOrder> columns={orderColumns} data={data} />
  )}
</Fetcher>

    </div>
  );
}
