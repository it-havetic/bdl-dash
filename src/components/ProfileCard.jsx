import { Card, Image, List } from "antd";
import { useContext } from "react";
import { CompanyProfileContext } from "../context/CompanyProfileContext";

const ProfileCard = () => {
  const { companyProfile } = useContext(CompanyProfileContext);
  console.log(companyProfile);
  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Profile ID and Article */}
      <Card title="Profile Information" className="shadow-lg">
        <p>
          <strong>Article:</strong> {companyProfile[0]?.article}
        </p>
      </Card>

      {/* Media Section */}
      <Card title="Media" className="shadow-lg">
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="w-full h-[300px]">
            <video
              src={`${import.meta.env.VITE_URL}${companyProfile[0]?.video}`}
              controls
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-[300px]">
            <Image
              style={{ width: "100%", height: "100%" }}
              src={`${import.meta.env.VITE_URL}${companyProfile[0]?.image}`}
              alt="Profile Image"
              className="rounded-lg w-full object-cover"
            />
          </div>
        </div>
      </Card>

      {/* Projects & Team Information */}
      <Card title="Projects & Team" className="shadow-lg">
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Completed Projects:</strong>{" "}
            {companyProfile[0]?.completedProjects}
          </p>
          <p>
            <strong>Satisfied Clients:</strong>{" "}
            {companyProfile[0]?.satisfiedclients}
          </p>
          <p>
            <strong>Under Construction Projects:</strong>{" "}
            {companyProfile[0]?.underConstruction}
          </p>
          <p>
            <strong>Ongoing Projects:</strong>{" "}
            {companyProfile[0]?.ongoingProjects}
          </p>
          <p>
            <strong>Team Members:</strong> {companyProfile[0]?.teamMembers}
          </p>
          <p>
            <strong>Total Awards:</strong> {companyProfile[0]?.awards}
          </p>
        </div>
      </Card>

      {/* Portfolio Section */}
      <Card title="Portfolio" className="shadow-lg">
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={companyProfile[0]?.portfolio}
          renderItem={(item) => (
            <List.Item>
              <Image
                src={`${import.meta.env.VITE_URL}${item}`}
                alt="Portfolio Image"
                className="rounded-lg"
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ProfileCard;

// Example usage of the ProfileCard component
