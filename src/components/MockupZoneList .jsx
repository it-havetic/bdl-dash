import { Button, Col, Image, Modal, Popconfirm, Row, Table } from "antd";
import { useContext, useState } from "react";
import { MockupZoneContext } from "../context/MockupZoneContex";
import EditMockupZoneModal from "./EditMockupZoneModal";

const MockupZoneList = () => {
  const { mockupZone, loading, deleteMockupZone } =
    useContext(MockupZoneContext);
  const [selectedMockupZone, setSelectedMockupZone] = useState(null);
  const [isModalVisibleForView, setIsModalVisibleForView] = useState(false);
  const [isModalVisibleForEdit, setIsModalVisibleForEdit] = useState(false);

  /**
   * Shows the view mockup zone modal and sets the selected mockup zone to the
   * given record.
   *
   * @param {object} record - The mockup zone to view.
   */
  const handleView = (record) => {
    setIsModalVisibleForView(true);
    setSelectedMockupZone(record);
  };

  /**
   * Hides the view mockup zone modal and resets the selected mockup zone to null.
   */
  const handleCancel = () => {
    setIsModalVisibleForView(false);
    setSelectedMockupZone(null);
  };

  /**
   * Deletes the given mockup zone from the server by calling the
   * `deleteMockupZone` function from the context.
   *
   * @param {Object} record - The mockup zone to delete.
   */
  const handleDelete = (record) => {
    deleteMockupZone(record._id);
  };

  /**
   * Shows the edit mockup zone modal and sets the selected mockup zone to the
   * given record.
   *
   * @param {object} record - The mockup zone to edit.
   */
  const handleEdit = (record) => {
    setIsModalVisibleForEdit(true);
    setSelectedMockupZone(record);
  };

  /**
   * Hides the edit mockup zone modal and resets the selected mockup zone to null.
   */
  const handleEditCancel = () => {
    setIsModalVisibleForEdit(false);
    setSelectedMockupZone(null);
  };

  const columns = [
    {
      title: "Zone Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      /**
       * Renders the images column by displaying the first 3 images as 100x100
       * images, with a +X more indicator if there are more than 3 images.
       *
       * @param {string[]} images - The images to render.
       * @returns {JSX.Element} - The rendered JSX.
       */
      render: (images) => (
        <div className="flex flex-wrap items-center">
          {images.slice(0, 3).map((image, index) => (
            <Image
              key={index}
              src={`${import.meta.env.VITE_URL}` + image}
              alt={`Image ${index + 1}`}
              style={{
                width: 100,
                height: 100,
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          ))}
          {images.length > 3 && (
            <span className="ml-3 text-gray-500">
              +{images.length - 3} more
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => handleView(record)}>
            View
          </Button>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this zone?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={mockupZone || []}
        pagination={{ pageSize: 4 }}
        loading={loading}
        rowKey="_id" // Use _id as the unique key
      />
      <Modal
        title="Zone Details"
        visible={isModalVisibleForView}
        onCancel={handleCancel}
        footer={null}
        width="60%"
        style={{ top: 20 }}
      >
        <p style={{ fontWeight: "bold" }}>Zone Name:</p>
        <p style={{ marginBottom: 16 }}>{selectedMockupZone?.name}</p>

        <p style={{ fontWeight: "bold" }}>Images:</p>
        <Row gutter={[16, 16]}>
          {selectedMockupZone?.images.map((image, index) => (
            <Col key={index}>
              <Image.PreviewGroup>
                <Image
                  preview={true} // Disable default preview
                  src={`${import.meta.env.VITE_URL}` + image}
                  alt={`Image ${index + 1}`}
                  style={{ width: "100%", height: 150, objectFit: "cover" }}
                  lazy={true}
                />
              </Image.PreviewGroup>
            </Col>
          ))}
        </Row>

        {/* Videos Section */}
        {selectedMockupZone?.videos && selectedMockupZone.videos.length > 0 && (
          <>
            <p style={{ fontWeight: "bold" }}>Videos:</p>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              {selectedMockupZone.videos.map((video, index) => (
                <Col span={8} key={index}>
                  <video
                    width="100%"
                    height="150"
                    controls
                    poster={`${import.meta.env.VITE_URL}` + video.thumbnail}
                    src={`${import.meta.env.VITE_URL}` + video.video}
                    autoPlay={false}
                    style={{ objectFit: "cover" }}
                  ></video>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Modal>

      <EditMockupZoneModal
        visible={isModalVisibleForEdit}
        onCancel={handleEditCancel}
        mockupZone={selectedMockupZone}
      />
    </>
  );
};

export default MockupZoneList;
