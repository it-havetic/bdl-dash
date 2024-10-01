import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  notification,
  Progress,
  Select,
  Upload,
} from "antd";
import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import RecentWorksContext from "../context/RecentWorksContext";

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
const RecentWorkCreateForm = () => {
  const [form] = Form.useForm();
  const { createRecentWork } = useContext(RecentWorksContext);
  const [series, setSeries] = useState([]);

  const [uploadProgress, setUploadProgress] = useState(0); // State for progress

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);

  const getAllSerise = async () => {
    try {
      const res = await axios.get("/series");
      setSeries(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllSerise();
  }, []);

  const handleImageChange = ({ fileList: newImagesFileList }) =>
    setImages(newImagesFileList);
  const handleVideoChange = ({ fileList: newVideoFileList }) =>
    setVideos(newVideoFileList);
  const handleThumbnailChange = ({ fileList: newThumbnailFileList }) =>
    setThumbnail(newThumbnailFileList);

  const onFinish = async (values) => {
    const formData = new FormData();

    if (values.title) formData.append("title", values.title);
    if (values.client) formData.append("client", values.client);
    if (values.location) formData.append("location", values.location);
    if (values.description) formData.append("description", values.description);

    if (images.length > 0) {
      images.forEach((image) => {
        formData.append("image", image.originFileObj);
      });
    }
    if (videos) {
      formData.append("video", videos[0].originFileObj);
    }
    if (thumbnail) {
      formData.append("thumbnail", thumbnail[0].originFileObj);
    }

    if (values.series) {
      values.series.forEach((serise) => formData.append("series[]", serise));
    }

    // Set up the config to track the progress
    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted); // Update the progress
      },
    };

    // Submit the form data to the server
    try {
      await createRecentWork(formData, config);
    } catch (error) {
      console.error(error.message);
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    } finally {
      setUploadProgress(0);
      form.resetFields();
      setImages([]);
      setVideos([]);
      setThumbnail([]);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="grid grid-cols-2 gap-6"
      >
        <div className="col-span-2">
          <Form.Item
            className="mb-2"
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>

          {/* Client */}
          <Form.Item className="mb-2" name="client" label="Client">
            <Input placeholder="Client name" />
          </Form.Item>

          {/* Location */}
          <Form.Item className="mb-2" name="location" label="Location">
            <Input placeholder="Location" />
          </Form.Item>
        </div>
        {/* Title */}

        {/* Description */}
        <div className="col-span-2">
          <Form.Item className="mb-2" name="description" label="Description">
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>
        </div>

        {/* Image Upload */}
        <Form.Item
          className="mb-2 col-span-2"
          label="Upload Images"
          name="image"
          rules={[
            { required: true, message: "Please upload at least one image!" },
          ]}
        >
          <Upload
            accept="image/*"
            action={null}
            listType="picture-card"
            fileList={images}
            onChange={handleImageChange}
            beforeUpload={() => false} // Prevent automatic upload
            multiple // Allow multiple image uploads
          >
            {images.length >= 40 ? null : uploadButton}
          </Upload>
        </Form.Item>

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
              {videos.length >= 1 ? null : (
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
              {thumbnail.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </div>
        <Form.Item className="col-span-2" name="series" label="Series">
          <Select
            mode="multiple"
            name="series"
            allowClear
            style={{
              width: "100%",
            }}
            className="col-span-2"
            placeholder="Please select"
          >
            {series.map((item) => (
              <Select.Option
                style={{ display: "flex", alignItems: "center" }}
                key={item._id}
                value={item._id}
              >
                <img
                  className="inline-block mr-1 mb-1"
                  src={`${import.meta.env.VITE_URL}` + item.image}
                  width={20}
                  alt=""
                />
                <span className="inline-block">{item.name}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {uploadProgress > 0 && (
          <Progress
            className="col-span-2"
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            percentPosition={{
              align: "end",
              type: "inner",
            }}
            percent={uploadProgress}
            size={["100%", 20]}
          />
        )}

        {/* Submit Button */}
        <div className="col-span-2 mt-3">
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RecentWorkCreateForm;
