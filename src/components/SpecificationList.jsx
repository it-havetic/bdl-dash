import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Image, Input, Modal, Popconfirm, Table } from "antd";
import { useContext, useState } from "react";
import { SpecificationContext } from "../context/SpecificationContext";
import SpecificationEditForm from "./SpecificationEditForm";
import SpecificationModal from "./SpecificationModal";

const SpecificationList = () => {
  const { specifications, deleteSpecification } =
    useContext(SpecificationContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecification, setSelectedSpecification] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleView = (record) => {
    setSelectedSpecification(record);
    setVisible(true);
  };

  const handleEdit = (record) => {
    setSelectedSpecification(record);
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setVisible(false);
    setEditModalVisible(false);
    setSelectedSpecification(null); // Reset selected specification after cancel
  };

  const handleDelete = (record) => {
    deleteSpecification(record._id);
  };

  // Filtering logic based on search term
const filteredSpecifications = specifications?.filter((spec) => {
  const { group, series, subSeries, priority } = spec;
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return (
    group?.name?.toLowerCase().includes(lowerCaseSearchTerm) || // Safely check group.name
    series?.name?.toLowerCase().includes(lowerCaseSearchTerm) || // Safely check series.name
    subSeries?.name?.toLowerCase().includes(lowerCaseSearchTerm) || // Safely check subSeries.name
    (priority &&
      priority.toString().toLowerCase().includes(lowerCaseSearchTerm)) // Ensure priority exists
  );
});

  const columns = [
    {
      title: "Group",
      dataIndex: ["group", "name"],
      key: "group",
      render: (name) => <p className="font-bold text-lg">{name}</p>,
    },
    {
      title: "Series",
      dataIndex: ["series", "name"],
      key: "series",
      render: (name) => <p className="font-bold text-lg">{name}</p>,
    },
    {
      title: "Sub-series",
      dataIndex: ["subSeries", "name"],
      key: "subSeries",
      render: (name) => <p className="font-bold text-lg">{name}</p>,
    },
    {
      title: "Diagram",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <div className="flex justify-center">
          <Image
            src={`${import.meta.env.VITE_URL}` + image}
            alt="Product"
            style={{ height: 150, borderRadius: "8px" }}
          />
        </div>
      ),
    },
    {
      title: "Video",
      dataIndex: "video",
      key: "video",
      render: (video) => (
        <video
          src={`${import.meta.env.VITE_URL}` + video}
          alt="Product"
          style={{ width: 300, height: 150, borderRadius: "8px" }}
          autoPlay={false}
          controls
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            type="primary"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded shadow"
          >
            View
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="dashed"
          >
            Edit
          </Button>
          <Popconfirm
            title={`Are you sure you want to delete ${record.group.name}?`} // Adjust field
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="default" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (!specifications) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Input
        placeholder="Search Group, Series, Sub-series, Priority"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table
        columns={columns}
        dataSource={filteredSpecifications}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        className="bg-white shadow-md rounded-lg"
        bordered
        rowClassName="hover:bg-gray-50 transition"
      />
      <SpecificationModal
        visible={visible}
        onClose={() => setVisible(false)}
        specification={selectedSpecification}
      />
      <Modal
        title="Edit Specification"
        visible={editModalVisible}
        onCancel={handleEditCancel}
        footer={null}
        width={"80%"}
        style={{ top: 20 }}
        maskClosable={false}
      >
        <SpecificationEditForm
          specification={selectedSpecification}
          handleEditCancel={handleEditCancel}
        />
      </Modal>
    </div>
  );
};

export default SpecificationList;
