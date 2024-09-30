import RecentWorkCreateForm from "../components/RecentWorkForm";
import RecentWorksList from "../components/RecentWorksList";

const RecentWorks = () => {
  return (
    <>
      <div className="flex gap-4 p-4">
        <div className="w-1/3">
          <RecentWorkCreateForm />
        </div>

        <div className="w-2/3">
          <RecentWorksList />
        </div>
      </div>
    </>
  );
};

export default RecentWorks;
