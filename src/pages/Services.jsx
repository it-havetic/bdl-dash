import ServiceForm from "../components/ServiceForm";
import ServiceList from "../components/ServiceList";

const Services = () => {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-1/3">
        <ServiceForm />
      </div>
      <div className="w-2/3">
        <ServiceList />
      </div>
    </div>
  );
};

export default Services;
