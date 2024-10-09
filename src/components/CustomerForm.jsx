import { Button, Form, Input, InputNumber, Select } from "antd";
import { useContext } from "react";
import CustomerContext from "../context/CustomerContext";

const { Option } = Select;

const CustomerForm = () => {
  const [form] = Form.useForm();
  const { createCustomer, loading } = useContext(CustomerContext);

  const onFinish = async (values) => {
    await createCustomer(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="create-customer"
      onFinish={onFinish}
      layout="vertical"
      className="bg-white p-3 rounded"
      initialValues={{ discount: 0 }}
    >
      <Form.Item
        label="Customer Code"
        name="customerCode"
        rules={[{ required: true, message: "Please input the customer code!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Customer Category"
        name="customerCategory"
        rules={[
          { required: true, message: "Please select the customer category!" },
        ]}
      >
        <Select placeholder="Select a category">
          <Option value="A">A</Option>
          <Option value="B">B</Option>
          <Option value="C">C</Option>
          <Option value="D">D</Option>
          <Option value="E">E</Option>
          <Option value="F">F</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Profession"
        name="profession"
        rules={[{ required: true, message: "Please select the profession!" }]}
      >
        <Select placeholder="Select a profession">
          <Option value="Engineer">Engineer</Option>
          <Option value="Architect">Architect</Option>
          <Option value="Electrician">Electrician</Option>
          <Option value="Others">Others</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input the email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true, message: "Please input the phone number!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Address" name="address">
        <Input />
      </Form.Item>

      <Form.Item label="Discount" name="discount">
        <InputNumber min={0} max={100} />
      </Form.Item>

      <Form.Item label="Remarks" name="remarks">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          Create Customer
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomerForm;
