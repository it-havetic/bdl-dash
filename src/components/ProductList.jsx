import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
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
  }, []);

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
    if (typeof values.subSeries === "object") {
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
    console.log("Edit product with ID:", product.id);
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
    },
    {
      title: "Sub Series",
      dataIndex: ["subSeries", "name"],
      key: "subSeries",
    },
    {
      title: "Series",
      dataIndex: ["series", "name"],
      key: "series",
    },
    {
      title: "Group",
      dataIndex: ["group", "name"],
      key: "group",
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
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
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
          ></Button>
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
      <Table
        title={() => <h1 className="text-2xl font-bold">Product List</h1>}
        dataSource={products}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 6 }}
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
                  <Select onChange={fetchSeries} placeholder="Select group">
                    {groups.map((group) => (
                      <Select.Option key={group._id} value={group._id}>
                        {group.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Tag color="blue">{formValues?.subSeries?.name}</Tag>
                <Form.Item name="subSeries" label="Sub Series">
                  <Select placeholder="Select sub series">
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
                  <Select onChange={fetchSubSeries} placeholder="Select series">
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
