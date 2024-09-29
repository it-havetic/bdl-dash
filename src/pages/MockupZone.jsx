import MockupZoneForm from "../components/MockupZoneForm";
import MockupZoneList from "../components/MockupZoneList ";

const MockupZone = () => {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-1/3">
        <MockupZoneForm />
      </div>

      <div className="w-2/3">
        <MockupZoneList />
      </div>
    </div>
  );
};

export default MockupZone;
