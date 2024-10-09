import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Progress, Upload, message } from "antd";
import React, { useContext, useState } from "react";
import { ServicesContext } from "../context/ServicesContext";

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

const ServiceForm = () => {
  const [form] = Form.useForm();
  const [videos, setVideos] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { createService, loading } = useContext(ServicesContext);

  const handleVideoChange = ({ fileList: newVideoFileList }) =>
    setVideos(newVideoFileList);
  const handleThumbnailChange = ({ fileList: newThumbnailFileList }) =>
    setThumbnail(newThumbnailFileList);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (videos) {
      formData.append("video", videos[0].originFileObj);
    }
    if (thumbnail) {
      formData.append("thumbnail", thumbnail[0].originFileObj);
    }

    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      },
    };

    try {
      await createService(formData, config);
    } catch (error) {
      message.error("Failed to create service.");
    } finally {
      form.resetFields();
      setVideos([]);
      setThumbnail([]);
      setUploadProgress(0);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      className="mx-auto p-6 bg-white shadow-md rounded"
      initialValues={{ name: "" }}
    >
      {/* Name Input */}
      <Form.Item
        name="name"
        label="Service Name"
        rules={[{ required: true, message: "Please input the service name!" }]}
      >
        <Input placeholder="Enter service name" />
      </Form.Item>

      {/* Video Upload */}
      <div className="col-span-2 flex justify-between">
        {/* Video Upload */}
        <Form.Item
          className="mb-2"
          name="video"
          rules={[{ required: true, message: "Please upload a video!" }]}
          label="Videos"
        >
          <Upload
            listType="picture-card"
            multiple
            accept="video/*"
            fileList={videos}
            beforeUpload={() => false}
            onChange={handleVideoChange}
            maxCount={1}
          >
            {videos?.length >= 1 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload Video</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        {/* Thumbnail Upload */}
        <Form.Item
          className="mb-2"
          label="Thumbnail"
          name="thumbnail"
          rules={[{ required: true, message: "Please upload a thumbnail!" }]}
        >
          <Upload
            listType="picture-card"
            multiple
            accept="image/*"
            fileList={thumbnail}
            beforeUpload={() => false}
            onChange={handleThumbnailChange}
            maltiple
          >
            {thumbnail?.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
      </div>

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
          size={[480, 20]}
        />
      )}

      {/* Submit Button */}
      <Form.Item className="mt-3">
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ width: "100%" }}
        >
          Create Service
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ServiceForm;
