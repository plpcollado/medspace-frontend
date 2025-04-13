import { FC } from "react";
import PastTenantCard, { PastTenant } from "./PastTenantCard";

const pastTenants: PastTenant[] = [
  {
    id: "1",
    name: "John Doe",
    agreementDate: "Diciembre 2021",
    specialty: "Cardiologist",
    rating: 5,
  },
  {
    id: "2",
    name: "Jane Smith",
    agreementDate: "Diciembre 2021",
    specialty: "Pediatry",
    rating: 3,
  },
];

interface PastTenantListProps {
  tenants: PastTenant[];
}

const PastTenantList: FC<PastTenantListProps> = ({ tenants }) => {
  if (tenants.length === 0) {
    return <p className="text-gray-500">No past tenants available.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {tenants.map((tenant) => (
        <PastTenantCard key={tenant.id} tenant={tenant} />
      ))}
    </div>
  );
};

export default function PastTenantsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Past Tenants</h1>
      <PastTenantList tenants={pastTenants} />
    </main>
  );
}
