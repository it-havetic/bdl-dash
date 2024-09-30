import {
  Button,
  Form,
  Image,
  Modal,
  Popconfirm,
  Select,
  Table,
  Tag,
} from "antd";
import React, { useContext, useState } from "react";
import GreetingContext from "../context/GreetingContext";

const GreetingTable = () => {
  const { greeting, deleteGreeting, updateGreeting, loading } =
    useContext(GreetingContext);
  const [isModalVisibleForEdit, setIsModalVisibleForEdit] = useState(false);
  const [selectedGreeting, setSelectedGreeting] = useState(null);
  const [form] = Form.useForm();

  const handleDelete = async (id) => {
    deleteGreeting(id);
  };
  const handleEdit = (record) => {
    form.setFieldsValue({
      status: record.status,
    });
    console.log(record);
    setIsModalVisibleForEdit(true);
    setSelectedGreeting(record);
  };

  const handleCancel = () => {
    setIsModalVisibleForEdit(false);
    setSelectedGreeting(null);
  };

  const handleEditOk = async (values) => {
    const formData = new FormData();
    formData.append("status", values.status);
    try {
      updateGreeting(selectedGreeting._id, formData);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsModalVisibleForEdit(false);
      setSelectedGreeting(null);
    }
  };

  // Define columns for the table
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          width={100}
          src={`${import.meta.env.VITE_URL}` + image}
          alt="Greeting Image"
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Tag
          color={status === "active" ? "green" : "red"}
          onClick={() => handleEdit(record)}
          className="cursor-pointer"
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this greeting?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={greeting}
        rowKey="_id" // Use the _id field as the unique key for rows
      />
      <Modal
        title="Edit Greeting"
        visible={isModalVisibleForEdit}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
      >
        <Form form={form} layout="vertical" onFinish={handleEditOk}>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
                message: "Please select a status",
              },
            ]}
          >
            <Select>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default GreetingTable;
