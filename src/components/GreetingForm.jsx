import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  notification,
  Progress,
  Select,
  Upload,
} from "antd";
import { useContext, useState } from "react";
import GreetingContext from "../context/GreetingContext";

const GreetingForm = () => {
  const { createGreeting, loading } = useContext(GreetingContext);
  const [form] = Form.useForm();
  const [image, setImage] = useState(); // Store selected image
  const [uploadProgress, setUploadProgress] = useState(0);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.message) formData.append("message", values.message);
    formData.append("status", values.status);

    if (image) {
      formData.append("image", image[0].originFileObj);
    } else {
      notification.error({
        message: "Image is required",
      });
      return;
    }
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const progress = Math.round((loaded * 100) / total);
        setUploadProgress(progress);
      },
    };

    try {
      await createGreeting(formData, config);
    } catch (error) {
      notification.error({
        message: "Failed to create greeting",
      });
    } finally {
      setUploadProgress(0);
      form.resetFields();
      setImage();
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <Form
        title="Create Greeting"
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        {/* Title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        {/* Message */}
        <Form.Item label="Message" name="message">
          <Input.TextArea
            placeholder="Enter message (optional)"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>

        {/* Status */}
        <Form.Item
          label="Status"
          name="status"
          initialValue="active"
          rules={[{ required: true, message: "Please select a status!" }]}
        >
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>

        {/* Image Upload */}
        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <Upload
            accept="image/*"
            listType="picture-card"
            beforeUpload={() => false} // Prevent automatic upload
            onChange={({ fileList }) => setImage(fileList)}
          >
            {image ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        {uploadProgress > 0 && (
          <Progress
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            percent={uploadProgress}
            status="active"
            percentPosition={{
              align: "end",
              type: "inner",
            }}
            size={["large", 20]}
          />
        )}

        {/* Submit Button */}
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Create Greeting
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GreetingForm;
