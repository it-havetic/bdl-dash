import AcademyForm from "../components/AcademyForm";
import AcademyList from "../components/AcademyList";

const Academy = () => {
  return (
    <>
      <div className="flex gap-4 p-4">
        <div className="w-1/3">
          <AcademyForm />
        </div>
        <div className="w-2/3">
          <AcademyList />
        </div>
      </div>
    </>
  );
};

export default Academy;
