import SpecificationForm from "../components/SpecificationForm";
import SpecificationList from "../components/SpecificationList";

const Specification = () => {
  return (
    <>
      <SpecificationForm />
      <div className="mt-5">
        <SpecificationList />
      </div>
    </>
  );
};

export default Specification;
