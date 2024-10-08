import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Table,
  Tag,
  Upload,
} from "antd";
import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import { ProductContext } from "../context/ProductContext";

const ProductList = () => {
  const { products, deleteProduct, updateProduct } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search input
  const [pageSize, setPageSize] = useState(6); // Initialize page size

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productImage, setProductImage] = useState();
  const [imagesForView, setImagesForView] = useState([]);

  const [groups, setGroups] = useState([]);
  const [series, setSeries] = useState([]);
  const [subSeries, setSubSeries] = useState([]);
  const [form] = Form.useForm();

  const [formValues, setFormValues] = useState();

  useEffect(() => {
    fetchGroups();
  }, [products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const highlightText = (text, searchTerm) => {
    if (!text) return ""; // Handle undefined or null text
    if (!searchTerm) return text; // If no search term is provided, return the original text
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredProducts = products?.filter(
    (product) =>
      product?.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.subSeries?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product?.group?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.series?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchGroups = async () => {
    try {
      const response = await axios.get("/groups");
      setGroups(response.data);
    } catch (error) {
      message.error("Failed to fetch groups");
    }
  };

  const fetchSeries = async (groupId) => {
    try {
      const response = await axios.get(`/series/group/${groupId}`);
      setSeries(response.data);
      form.resetFields(["series", "subSeries"]); // Reset series and subSeries when group changes
      setSubSeries([]); // Clear subSeries when the group changes
    } catch (error) {
      message.error("Failed to fetch series");
    }
  };

  const fetchSubSeries = async (seriesId) => {
    try {
      const response = await axios.get(`/sub-series/series/${seriesId}`);
      setSubSeries(response.data);
    } catch (error) {
      message.error("Failed to fetch subseries");
    }
  };

  const handleImageChange = (fileList) => {
    if (fileList.length > 0) {
      const image = URL.createObjectURL(fileList[0].originFileObj);
      setImagesForView([image]);
      setProductImage(fileList[0].originFileObj); // Only keep one image
    } else {
      setProductImage([]);
      setImagesForView([]);
    }
  };

  const onFinish = (values) => {
    const formData = new FormData();
    if (typeof values.subSeries === "object" && values.subSeries) {
      values.subSeries = values.subSeries._id;
    }
    if (typeof values.series === "object") {
      values.series = values.series._id;
    }
    if (typeof values.group === "object") {
      values.group = values.group._id;
    }

    formData.append("itemCode", values.itemCode);
    formData.append("subSeries", values.subSeries);
    formData.append("series", values.series);
    formData.append("group", values.group);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("image", productImage);
    updateProduct(formValues._id, formData);
    form.resetFields();
    setFormValues();
    setProductImage();
    setImagesForView([]);
    setIsModalVisible(false);
  };

  const handleEdit = (product) => {
    console.log("Edit product with ID:", product._id);
    setFormValues(product);
    setIsModalVisible(true);
  };

  const onCancel = () => {
    form.resetFields();
    setFormValues();
    setIsModalVisible(false);
    setProductImage();
    setImagesForView([]);
  };

  const handleDelete = async (id) => {
    deleteProduct(id);
  };

  const columns = [
    {
      title: "Item Code",
      dataIndex: "itemCode",
      key: "itemCode",
      render: (text) => highlightText(text, searchTerm),
    },
    {
      title: "Sub Series",
      dataIndex: ["subSeries", "name"],
      key: "subSeries",
      render: (text) => highlightText(text, searchTerm),
    },
    {
      title: "Series",
      dataIndex: ["series", "name"],
      key: "series",
      render: (text) => highlightText(text, searchTerm),
    },
    {
      title: "Group",
      dataIndex: ["group", "name"],
      key: "group",
      render: (text) => highlightText(text, searchTerm),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => highlightText(text, searchTerm),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          src={`${import.meta.env.VITE_URL}` + image}
          alt="Product"
          style={{ width: 100 }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
            type="link"
            icon={<EditOutlined />}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <>
      {/* Search Input */}
      <div className="mb-4 flex justify-end">
        <Input.Search
          placeholder="Search by group, series, subseries, item code, or description"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </div>
      <Table
        title={() => <h1 className="text-2xl font-bold">Product List</h1>}
        dataSource={filteredProducts}
        columns={columns}
        rowKey="_id"
        pagination={{
          pageSize: pageSize, // Default page size
          showSizeChanger: true, // Enable size changer
          pageSizeOptions: ["6", "10", "20", "50"], // Page size options for the user
          onShowSizeChange: (current, size) => {
            setPageSize(size); // Set the selected page size
          },
        }}
      />

      <Modal
        title="Edit Product"
        visible={isModalVisible}
        onCancel={onCancel}
        footer={null}
        maskClosable={false}
      >
        <div>
          <Form
            form={form}
            initialValues={formValues}
            onFinish={onFinish}
            layout="vertical"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* First Column */}
              <div>
                <Form.Item name="itemCode" label="Item Code">
                  <Input placeholder="Enter item code" />
                </Form.Item>

                <Tag color="blue">{formValues?.group?.name}</Tag>
                <Form.Item name="group" label="Group">
                  <Select
                    allowClear
                    onChange={fetchSeries}
                    placeholder="Select group"
                  >
                    {groups.map((group) => (
                      <Select.Option key={group._id} value={group._id}>
                        {group.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Tag color="blue">{formValues?.subSeries?.name}</Tag>
                <Form.Item name="subSeries" label="Sub Series">
                  <Select
                    filterOption={(input, option) =>
                      (option?.children ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    showSearch
                    placeholder="Select sub series"
                  >
                    {subSeries.map((subSeries) => (
                      <Select.Option key={subSeries._id} value={subSeries._id}>
                        {subSeries.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              {/* Second Column */}
              <div>
                <Tag color="blue">{formValues?.series?.name}</Tag>
                <Form.Item name="series" label="Series">
                  <Select
                    showSearch
                    onChange={fetchSubSeries}
                    placeholder="Select series"
                  >
                    {series.map((series) => (
                      <Select.Option key={series._id} value={series._id}>
                        {series.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="price" label="Price">
                  <Input type="number" placeholder="Enter price" />
                </Form.Item>

                <Form.Item name="description" label="Description">
                  <Input.TextArea placeholder="Enter description" />
                </Form.Item>
              </div>
            </div>

            {/* Image Upload Centered at Bottom */}
            <div className="col-span-2 text-center mt-8">
              {imagesForView.length > 0 && (
                <div className="mt-3 w-full h-56 overflow-hidden">
                  <img
                    src={imagesForView[0]}
                    alt="Product Image"
                    className="w-full object-cover"
                  />
                </div>
              )}

              <Form.Item name="image" valuePropName="image">
                <Upload
                  accept="image/*"
                  name="image"
                  listType=""
                  fileList={imagesForView.map((img) => ({
                    name: img.split("/").pop(),
                  }))}
                  onChange={({ fileList }) => handleImageChange(fileList)}
                  beforeUpload={() => false} // Prevent automatic upload
                >
                  {imagesForView.length < 1 && (
                    <Button
                      type="dashed"
                      className="w-[472px] text-black font-mono text-[17px]"
                      icon={<UploadOutlined />}
                    >
                      Upload Product Image
                    </Button>
                  )}
                </Upload>
              </Form.Item>
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Add Product
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ProductList;
