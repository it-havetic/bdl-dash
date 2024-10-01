import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Image, Modal, Popconfirm, Table } from "antd";
import { useContext, useState } from "react";
import { AcademyContext } from "../context/AcademyContext";
import AcademyEdit from "./AcademyEdit";

// Sample data (you can replace it with your fetched data from the backend)

const AcademyList = () => {
  const { academy, deleteAcademy } = useContext(AcademyContext);

  const [isModalVisibleForView, setIsModalVisibleForView] = useState(false);
  const [isModalVisibleForEdit, setIsModalVisibleForEdit] = useState(false);
  const [selectedAcademy, setSelectedAcademy] = useState(null);

  const handleView = (record) => {
    setSelectedAcademy(record);
    setIsModalVisibleForView(true);
  };

  const handleCancelForView = () => {
    setIsModalVisibleForView(false);
    setSelectedAcademy(null);
  };

  const handleEdit = (record) => {
    setSelectedAcademy(record);
    setIsModalVisibleForEdit(true);
  };

  const handleCancelForEdit = () => {
    setIsModalVisibleForEdit(false);
    setSelectedAcademy(null);
  };

  const handleDelete = async (record) => {
    deleteAcademy(record._id);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <p>{text.slice(0, 20) + "..."}</p>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <div dangerouslySetInnerHTML={{ __html: text.slice(0, 50) + "..." }} />
      ), // Render HTML description
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "active" ? (
          <span style={{ color: "green" }}>{status}</span>
        ) : (
          <span style={{ color: "red" }}>{status}</span>
        ),
    },
    {
      title: "prioroty",
      dataIndex: "prioroty",
      key: "prioroty",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            style={{ marginRight: 8 }}
          >
            View
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this zone?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger type="default">
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={academy}
        pagination={{ pageSize: 10 }}
        columns={columns}
        rowKey="_id"
      />
      <Modal
        title="View Academy"
        visible={isModalVisibleForView}
        onCancel={handleCancelForView}
        footer={null}
        maskClosable={false}
        width={1000}
        style={{ top: 20 }}
      >
        <div>
          <h2 className="text-xl font-bold my-3">{selectedAcademy?.title}</h2>
          {selectedAcademy?.image && (
            <Image
              alt="Academy"
              src={`${import.meta.env.VITE_URL}${selectedAcademy.image}`}
              className="w-full"
            ></Image>
          )}
          {selectedAcademy?.video && (
            <video controls width={1000}>
              <source
                src={`${import.meta.env.VITE_URL}${selectedAcademy?.video}`}
                type="video/mp4"
              />
            </video>
          )}
          <p
            className="my-3 text-[18px] leading-8"
            dangerouslySetInnerHTML={{ __html: selectedAcademy?.description }}
          />
        </div>
      </Modal>

      {/* Edit Modal */}
      <AcademyEdit
        academy={selectedAcademy}
        onCancel={handleCancelForEdit}
        visible={isModalVisibleForEdit}
      />
    </>
  );
};

export default AcademyList;

{
  /* <div>
          <p dangerouslySetInnerHTML={{ __html: record.description }} />
          {record.image && (
            <img src={`/${record.image}`} alt="Academy" width={200} />
          )}
          {record.video && (
            <video controls width={200}>
              <source
                src={`${import.meta.VITE_APP_BASE_URL}${record.video}`}
                type="video/mp4"
              />
            </video>
          )}
        </div> */
}
