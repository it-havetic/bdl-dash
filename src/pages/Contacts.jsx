import {
  Button,
  Form,
  Image,
  Modal,
  notification,
  Popconfirm,
  Select,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import axios from "../axios";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  const [form] = Form.useForm();
  const [isModalVisibleForView, setIsModalVisibleForView] = useState(false);
  const [isModalVisibleForEdit, setIsModalVisibleForEdit] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    getContacts(); // Fixed typo
  }, []);

  const getContacts = async () => {
    try {
      const res = await axios.get("/contacts");
      setContacts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = async (record) => {
    setSelectedContact(record);
    setIsModalVisibleForView(true);
    try {
      await axios.patch(`/contacts/${record._id}`, {
        status: "read",
      });
      setIsModalVisibleForEdit(false);
      getContacts();
    } catch (error) {
      console.log(error);
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    }
    // Add your view logic here
  };
  const handleCancelForView = () => {
    setIsModalVisibleForView(false);
    setSelectedContact(null);
  };

  const handleEdit = (record) => {
    setSelectedContact(record);
    setIsModalVisibleForEdit(true);
    console.log("Edit contact:", record);
  };

  const handleCancelForEdit = () => {
    setIsModalVisibleForEdit(false);
    setSelectedContact(null);
  };

  const handleDelete = async (id) => {
    try {
      //   await axios.delete(`/contacts/${id}`);
      console.log(id);
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.log("Error deleting contact:", error);
    }
  };

  const handleUpdate = async (values) => {
    console.log(values);
    try {
      await axios.patch(`/contacts/${selectedContact._id}`, {
        status: values.status,
      });
      setIsModalVisibleForEdit(false);
      setSelectedContact(null);
      getContacts();
    } catch (error) {
      console.log(error);
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => (text ? <p>{text}</p> : <p>N/A</p>),
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (text) => (
        <a target="_blank" rel="noopener noreferrer" href={text}>
          {text}
        </a>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text) => (
        <p>
          {text && text.length > 10
            ? text.slice(0, 10) + "..."
            : text || "No message"}
        </p>
      ),
    },
    {
      title: "Card",
      dataIndex: "visitingCard",
      key: "visitingCard",
      render: (images) =>
        images && images.length > 0 ? (
          images.map((item, index) => (
            <div key={index} className="flex justify-center gap-2">
              <Image
                width={100}
                src={`${import.meta.env.VITE__URL}${item}`}
                alt="Card"
              />
            </div>
          ))
        ) : (
          <p>No Image</p>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Tag
          color={status === "read" ? "green" : "red"}
          onClick={() => handleEdit(record)}
          className="cursor-pointer"
        >
          {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unread"}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => handleView(record)}>
            View
          </Button>
          <Popconfirm
            title="Are you sure to delete this contact?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      <Table
        columns={columns}
        dataSource={contacts}
        pagination={{ pageSize: 10 }}
        rowKey="_id"
      />
      <Modal
        title="Status"
        visible={isModalVisibleForEdit}
        onCancel={handleCancelForEdit}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
          initialValues={selectedContact}
        >
          <Form.Item lable="Status" name="status">
            <Select placeholder="Select status" name="status">
              <Select.Option value="read">Read</Select.Option>
              <Select.Option value="unread">Unread</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* for view Modal */}

      <Modal
        title="Contact Details"
        visible={isModalVisibleForView}
        onCancel={handleCancelForView}
        footer={null}
        maskClosable={false}
        width={800}
      >
        <p>
          Name:{" "}
          <span className="font-medium text-[18px]">
            {selectedContact?.name}
          </span>
        </p>
        <p>
          Email:{" "}
          <span className="font-medium text-[18px]">
            {selectedContact?.email}
          </span>{" "}
        </p>
        <p>
          Phone:{" "}
          <span className="font-medium text-[18px]">
            {selectedContact?.phone}
          </span>{" "}
        </p>
        <p>
          URL:{" "}
          <span className="font-medium text-[18px]">
            {selectedContact?.url}
          </span>
        </p>
        <p>
          Message:{" "}
          <span className="font-medium text-[18px]">
            {selectedContact?.message}
          </span>{" "}
        </p>
        <p>
          Status:{" "}
          <span className="font-medium text-[18px]">
            {selectedContact?.status}
          </span>{" "}
        </p>
        {selectedContact?.visitingCard && (
          <div className="flex justify-between w-full">
            <Image
              src={`${import.meta.env.VITE__URL}${
                selectedContact?.visitingCard
              }`}
              alt="Card"
              width={300}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Contacts;
