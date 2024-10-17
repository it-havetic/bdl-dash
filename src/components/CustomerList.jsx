import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Popconfirm,
  Select,
  Space,
  Table,
} from "antd";
import { useContext, useEffect, useState } from "react";
import CustomerContext from "../context/CustomerContext";

const { Option } = Select;

const CustomerList = () => {
  const { customer, deleteCustomer, updateCustomer } =
    useContext(CustomerContext);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(customer); // Initialize with customer data
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  // Update filtered data whenever the customer context changes
  useEffect(() => {
    setFilteredData(customer); // Set all customers initially
  }, [customer]);

  // Update form values dynamically when selected changes
  useEffect(() => {
    form.setFieldsValue(selected);
  }, [selected, form]);

  // Handle search
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);

    const filteredCustomers = customer.filter((item) => {
      return (
        item.customerCode.toLowerCase().includes(value.toLowerCase()) ||
        item.customerCategory.toLowerCase().includes(value.toLowerCase()) ||
        item.profession.toLowerCase().includes(value.toLowerCase()) ||
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase()) ||
        item.phoneNumber.toLowerCase().includes(value.toLowerCase()) ||
        item.address.toLowerCase().includes(value.toLowerCase()) ||
        item.discount.toString().includes(value) || // Discount is a number
        item.remarks?.toLowerCase().includes(value.toLowerCase()) // Remarks may be null
      );
    });
    setFilteredData(filteredCustomers);
  };

  const handleDelete = async (customer) => {
    setLoading(true);
    try {
      await deleteCustomer(customer._id);
    } catch (error) {
      notification.error({
        message: "Failed to delete customer!",
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (customer) => {
    setIsModalVisible(true);
    setSelected(customer);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateCustomer(selected._id, values);
      notification.success({
        message: "Customer updated successfully!",
        duration: 2,
      });
    } catch (error) {
      notification.error({
        message: error.response?.data.message || error.message,
        duration: 2,
      });
    } finally {
      form.resetFields();
      setSelected({});
      setIsModalVisible(false);
      setLoading(false);
    }
  };

  const onCancel = () => {
    setIsModalVisible(false);
    setSelected({});
  };

  const columns = [
    {
      title: "Customer Code",
      dataIndex: "customerCode",
      key: "customerCode",
    },
    {
      title: "Customer Category",
      dataIndex: "customerCategory",
      key: "customerCategory",
    },
    {
      title: "Profession",
      dataIndex: "profession",
      key: "profession",
    },
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
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this customer?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Search Input */}
      <Input
        placeholder="Search Customers"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: 20, width: 300 }}
      />

      {/* Customer Table */}
      <Table
        columns={columns}
        dataSource={filteredData?.length ? filteredData : []}
        rowKey="_id"
        loading={loading}
        locale={{ emptyText: "No customers found" }}
      />

      <Modal
        title="Edit Customer"
        open={isModalVisible} // Updated from 'visible'
        maskClosable={false}
        footer={null}
        width={"600px"}
        onCancel={onCancel}
        style={{ top: 20 }}
      >
        <Form
          form={form}
          name="create-customer"
          onFinish={onFinish}
          layout="vertical"
          className="bg-white p-3 rounded"
          initialValues={selected}
        >
          <div className="flex justify-between">
            <Form.Item
              label="Customer Code"
              name="customerCode"
              rules={[
                { required: true, message: "Please input the customer code!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Customer Category"
              name="customerCategory"
              rules={[
                {
                  required: true,
                  message: "Please select the customer category!",
                },
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
              rules={[
                { required: true, message: "Please select the profession!" },
              ]}
            >
              <Select placeholder="Select a profession">
                <Option value="Engineer">Engineer</Option>
                <Option value="Architect">Architect</Option>
                <Option value="Electrician">Electrician</Option>
                <Option value="Others">Others</Option>
              </Select>
            </Form.Item>
          </div>

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
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
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
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Customer
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CustomerList;
