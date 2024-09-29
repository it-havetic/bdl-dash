import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import { ProductContext } from "../context/ProductContext";

const ProductForm = () => {
  const { createProduct, loading } = useContext(ProductContext);
  const [form] = Form.useForm();

  const [productImage, setProductImage] = useState();
  const [imagesForView, setImagesForView] = useState([]);

  const [groups, setGroups] = useState([]);
  const [series, setSeries] = useState([]);
  const [subSeries, setSubSeries] = useState([]);

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

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("itemCode", values.itemCode);
    formData.append("subSeries", values.subSeries);
    formData.append("series", values.series);
    formData.append("group", values.group);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("image", productImage);
    createProduct(formData);
    form.resetFields();
    setProductImage();
    setImagesForView([]);
  };

  return (
    <div className="flex p-5 bg-white rounded-lg">
      <div style={{ flex: 1, marginRight: "20px" }}>
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="itemCode"
            label="Item Code"
            rules={[{ required: true, message: "Item Code is required" }]}
          >
            <Input placeholder="Enter item code" />
          </Form.Item>
          <Form.Item
            name="group"
            label="Group"
            rules={[{ required: true, message: "Group is required" }]}
          >
            <Select
              allowClear
              showSearch
              onChange={fetchSeries} // Pass the value directly to fetchSeries
              placeholder="Select group"
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {groups.map((group) => (
                <Select.Option key={group._id} value={group._id}>
                  {group.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="series"
            label="Series"
            rules={[{ required: true, message: "Series is required" }]}
          >
            <Select
              allowClear
              onChange={fetchSubSeries} // Pass the value directly to fetchSubSeries
              placeholder="Select series"
            >
              {series.map((series) => (
                <Select.Option key={series._id} value={series._id}>
                  {series.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="subSeries" label="Sub Series">
            <Select
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              showSearch
              allowClear
              placeholder="Select sub series"
            >
              {subSeries.map((subSeries) => (
                <Select.Option key={subSeries._id} value={subSeries._id}>
                  {subSeries.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Price is required" }]}
          >
            <Input type="number" placeholder="Enter price" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>
          <Form.Item
            name="image"
            valuePropName="image"
            rules={[{ required: true, message: "Images are required" }]}
          >
            {imagesForView.length > 0 && (
              <div className="mt-3 w-full h-56 overflow-hidden">
                <img
                  src={imagesForView[0]}
                  alt="Product Image"
                  className="w-full object-cover"
                />
              </div>
            )}
            <Upload
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
                  className="w-[340px] text-black font-mono text-[17px]"
                  icon={<UploadOutlined />}
                >
                  Upload Product Image
                </Button>
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
