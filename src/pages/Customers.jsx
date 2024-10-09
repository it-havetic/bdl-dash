import CustomerForm from "../components/CustomerForm";
import CustomerList from "../components/CustomerList";

const Customers = () => {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-1/4">
        <CustomerForm />
      </div>
      <div className="w-3/4">
        <CustomerList />
      </div>
    </div>
  );
};

export default Customers;
