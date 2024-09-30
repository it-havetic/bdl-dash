import {
  Button,
  Form,
  Input,
  message,
  Modal,
  notification,
  Popconfirm,
  Select,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import axios from "../axios";

const UsersTable = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (error) {
      message.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`);
      notification.success({
        duration: 2,
        message: "User deleted successfully",
      });
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    }
  };

  const handleEdit = (record) => {
    setSelectedUser(record);
    setShowModal(true);
  };
  const handleCancel = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleEditOk = async (values) => {
    try {
      await axios.patch(`/users/${selectedUser._id}`, values);
      notification.success({
        duration: 2,
        message: "User updated successfully",
      });
      fetchUsers(); // Refresh the user list after update
      setShowModal(false);
    } catch (error) {
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
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (text, record) => {
        return (
          <Tag
            color={record.status === "active" ? "green" : "red"}
            className="cursor-pointer"
          >
            {record.status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
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
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Table
        columns={columns}
        dataSource={users}
        rowKey={(record) => record._id}
        loading={loading}
      />
      <Modal
        title="Edit User"
        visible={showModal}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
      >
        <Form
          form={form}
          onFinish={handleEditOk}
          layout="vertical"
          initialValues={selectedUser}
        >
          <Form.Item label="Name" name="name">
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: "email", message: "Please enter a valid email!" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item label="Role" name="role">
            <Select>
              <Select.Option value="user">User</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Update User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersTable;
