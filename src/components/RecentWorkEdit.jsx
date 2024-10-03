import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Progress,
  Select,
  Upload,
} from "antd";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import RecentWorksContext from "../context/RecentWorksContext";

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
const RecentWorkEdit = ({ recentWork, onCancel, visible }) => {
  const { updateRecentWork, loading } = useContext(RecentWorksContext);
  console.log(recentWork);
  const [form] = Form.useForm();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [image, setImage] = useState([]); // New images
  const [video, setVideo] = useState([]); // New videos
  const [thumbnail, setThumbnail] = useState([]); // New thumbnail

  const [imagesToDelete, setImagesToDelete] = useState([]); // Images to delete
  const [videosToDelete, setVideosToDelete] = useState([]); // Videos to delete

  const [series, setSeries] = useState([]);

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

  useEffect(() => {
    if (recentWork) {
      form.setFieldsValue({
        title: recentWork.title,
        description: recentWork.description,
        client: recentWork.client,
        location: recentWork.location,
        prioroty: recentWork.prioroty,
        status: recentWork.status,
        series: recentWork.series,
      });

      // Populate existing files
      setImage(
        recentWork.images.map((image, idx) => ({
          uid: idx,
          name: `Image ${idx + 1}`,
          status: "done",
          url: `${import.meta.env.VITE_URL}${image}`,
        }))
      );
      // Populate existing videos
      setVideo(
        recentWork.videos.map((video, idx) => ({
          uid: idx,
          name: `Video ${idx + 1}`,
          status: "done",
          url: `${import.meta.env.VITE_URL}${video.video}`,
        }))
      );
    }
  }, [recentWork, form]);

  const handleUpdate = async (values) => {
    const formData = new FormData();

    if (values.title) formData.append("title", values.title);
    if (values.client) formData.append("client", values.client);
    if (values.location) formData.append("location", values.location);
    if (values.description) formData.append("description", values.description);
    if (values.prioroty) formData.append("prioroty", values.prioroty);
    if (values.status) formData.append("status", values.status);
    if (values.series)
      values.series.forEach((s) => formData.append("series[]", s));

    if (image.length > 0) {
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i].originFileObj);
      }
    }

    if (video.length > 0) {
      for (let i = 0; i < video.length; i++) {
        formData.append("video", video[i].originFileObj);
      }
    }

    if (thumbnail.length > 0) {
      formData.append("thumbnail", thumbnail[0].originFileObj);
    }

    imagesToDelete.forEach((image) =>
      formData.append("imagesToDelete[]", image)
    );
    videosToDelete.forEach((video) =>
      formData.append("videosToDelete[]", video)
    );

    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setUploadProgress(percent);
        }
      },
    };

    try {
      await updateRecentWork(recentWork._id, formData, config);
    } catch (error) {
      console.error(error);
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    } finally {
      form.resetFields();
      setImage([]);
      setVideo([]);
      setThumbnail([]);
      setImagesToDelete([]);
      setVideosToDelete([]);

      setUploadProgress(0);
      onCancel();
    }
  };

  const handleFileRemove = (file, setList, setListToDelete) => {
    setList((prev) => prev.filter((item) => item.uid !== file.uid)); // Remove from fileList
    console.log(file.url.replace(import.meta.env.VITE_URL, ""));
    setListToDelete((prev) => [
      ...prev,
      file.url.replace(import.meta.env.VITE_URL, ""),
    ]); // Add to the deletion list
  };

  return (
    <>
      <Modal
        title="Edit Recent Work"
        visible={visible}
        onCancel={onCancel}
        footer={null}
        width={1000}
        maskClosable={false}
        style={{ top: 20 }}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <div className="flex justify-between">
            {/* Title */}
            <Form.Item name="title" label="Title">
              <Input name="title" placeholder="Enter title" />
            </Form.Item>
            {/* Client */}
            <Form.Item name="client" label="Client">
              <Input placeholder="Enter client" />
            </Form.Item>
            {/* Location */}
            <Form.Item name="location" label="Location">
              <Input placeholder="Enter location" />
            </Form.Item>
            {/* prioroty */}
            <Form.Item name="prioroty" label="Prioroty">
              <Input placeholder="Enter priority" type="number" />
            </Form.Item>

            <Form.Item name="status" label="status">
              <Select placeholder="Enter status" name="status">
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
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
          {/* Description */}
          <Form.Item name="description" label="Description">
            <Input.TextArea
              placeholder="Enter description"
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>

          {/* Images */}
          <Form.Item label="Images">
            <Upload
              accept="image/*"
              listType="picture-card"
              fileList={image}
              onChange={({ fileList }) => setImage(fileList)}
              onRemove={(file) =>
                handleFileRemove(file, setImage, setImagesToDelete)
              }
              beforeUpload={() => false} // Prevent automatic upload
              multiple
            >
              {uploadButton}
            </Upload>
          </Form.Item>

          {/* Videos Upload */}
          <Form.Item label="Videos">
            <Upload
              accept="video/*"
              listType="picture-card"
              fileList={video}
              onChange={({ fileList }) => setVideo(fileList)}
              onRemove={(file) =>
                handleFileRemove(file, setVideo, setVideosToDelete)
              }
              beforeUpload={() => false} // Prevent automatic upload
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item label="Thumbnails">
            <Upload
              accept="image/*"
              listType="picture-card"
              fileList={thumbnail}
              onChange={({ fileList }) => setThumbnail(fileList)}
              beforeUpload={() => false} // Prevent automatic upload
            >
              {thumbnail.length == 1 ? null : uploadButton}
            </Upload>
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

          {/* Submit button */}
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="mt-3"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RecentWorkEdit;

RecentWorkEdit.propTypes = {
  recentWork: PropTypes.object,
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
};
