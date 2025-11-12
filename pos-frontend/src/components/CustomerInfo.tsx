interface Customer {
  name: string;
  loyalty_points: number;
}

interface Props {
  customer: Customer | null;
}

const CustomerInfo = ({ customer }: Props) => (
  <div className="border p-2 rounded mb-4">
    <h3 className="font-bold">Customer Info</h3>
    {customer ? (
      <>
        <p>Name: {customer.name}</p>
        <p>Loyalty Points: {customer.loyalty_points}</p>
      </>
    ) : (
      <p>No customer selected</p>
    )}
  </div>
);

export default CustomerInfo;
