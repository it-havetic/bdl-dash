import GreetingForm from "../components/GreetingForm";
import GreetingTable from "../components/GreetingList";

const Greeting = () => {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-1/3">
        <GreetingForm />
      </div>
      <div className="w-2/3">
        <GreetingTable />
      </div>
    </div>
  );
};

export default Greeting;
