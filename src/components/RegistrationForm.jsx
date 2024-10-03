import { Button, Form, Input, notification, Select } from "antd";
import React, { useState } from "react";
import axios from "../axios";

const { Option } = Select;

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post("/users/register", values);
      notification.success({
        duration: 2,
        message: res.data.message,
      });
    } catch (error) {
      notification.error({
        message: error.response.data.message || "Something went wrong",
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl mb-4 font-bold">Register</h1>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ role: "user" }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select your role!" }]}
        >
          <Select>
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;
