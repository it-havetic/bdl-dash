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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import the styles for react-quill
import { AcademyContext } from "../context/AcademyContext";

const { Option } = Select;

const AcademyForm = () => {
  const { createAcademy, loading } = useContext(AcademyContext);
  const [form] = Form.useForm();
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [description, setDescription] = useState(""); // For the rich text editor

  const handleFinish = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", description); // Use rich text content
    formData.append("status", values.status);

    if (image.length > 0) formData.append("image", image[0].originFileObj);
    if (video.length > 0) formData.append("video", video[0].originFileObj);

    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const progress = Math.round((loaded * 100) / total);
        setUploadProgress(progress);
      },
    };

    try {
      await createAcademy(formData, config);
    } catch (error) {
      console.error(error.message);
      notification.error({
        message: error.message,
      });
    } finally {
      setUploadProgress(0);
      form.resetFields();
      setImage([]);
      setVideo([]);
      setDescription("");
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  };

  return (
    <>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{ status: "active" }}
        className="p-4 bg-white shadow-md rounded"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item label="Description" required>
          <ReactQuill
            value={description}
            onChange={setDescription}
            placeholder="Enter description"
            style={{ height: "200px" }}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4 mt-12">
          <Form.Item name="image" label="Image">
            <Upload
              accept="image/*"
              listType="picture-card"
              beforeUpload={() => false} // Prevent automatic upload
              onChange={({ fileList }) => setImage(fileList)}
            >
              {video.length < 1 && image.length < 1 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item name="video" label="Video">
            <Upload
              accept="video/*"
              listType="picture-card"
              onChange={({ fileList }) => setVideo(fileList)}
              fileList={video}
              beforeUpload={() => false}
            >
              {image.length < 1 && video.length < 1 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </div>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status!" }]}
        >
          <Select>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
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
        <Form.Item className="mt-3">
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Academy
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AcademyForm;
