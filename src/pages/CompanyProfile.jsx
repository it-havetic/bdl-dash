import CompanyProfileForm from "../components/CompanyProfileForm";
import ProfileCard from "../components/ProfileCard";

const CompanyProfile = () => {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-1/3">
        <CompanyProfileForm />
      </div>
      <div className="w-2/3">
        <ProfileCard />
      </div>
    </div>
  );
};

export default CompanyProfile;
