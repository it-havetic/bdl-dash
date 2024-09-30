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
import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { AcademyContext } from "../context/AcademyContext";

const AcademyEdit = ({ onCancel, visible, academy }) => {
  const { updateAcademy, loading } = useContext(AcademyContext);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [form] = Form.useForm();
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [description, setDescription] = useState();
  const [imageToDelete, setImageToDelete] = useState();
  const [videoToDelete, setVideoToDelete] = useState();

  useEffect(() => {
    if (academy) {
      form.setFieldsValue({
        title: academy.title,
        status: academy.status,
        prioroty: academy.prioroty,
      });

      setDescription(academy.description);

      //   Populate existing files
      setImage(
        academy?.image
          ? [
              {
                uid: 0,
                name: "Image",
                status: "done",
                url: `${import.meta.env.VITE_URL}${academy.image}`,
              },
            ]
          : []
      );

      setVideo(
        academy?.video
          ? [
              {
                uid: 0,
                name: `Video`,
                status: "done",
                url: `${import.meta.env.VITE_URL}${academy?.video}`,
              },
            ]
          : []
      );
    }
  }, [academy, form]);

  const handleFinish = async (values) => {
    console.log("from handleFinish", imageToDelete, videoToDelete);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", description);
    formData.append("status", values.status);
    formData.append("prioroty", values.prioroty);
    if (imageToDelete) formData.append("imageToDelete", imageToDelete);
    if (videoToDelete) formData.append("videoToDelete", videoToDelete);
    console.log(image, video);
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
      await updateAcademy(academy._id, formData, config);
    } catch (error) {
      console.error(error.message);
      notification.error({
        message: "Error",
        description: error.message,
      });
    } finally {
      setUploadProgress(0);
      onCancel();
      form.resetFields();
    }

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  const handleFileRemove = (file, setList, setListToDelete) => {
    setList((prev) => prev.filter((item) => item.uid !== file.uid)); // Remove from fileList
    console.log(file.url.replace(import.meta.env.VITE_URL, ""));
    setListToDelete(file.url.replace(import.meta.env.VITE_URL, "")); // Add to the deletion list
    console.log("form handler", imageToDelete, videoToDelete);
  };

  return (
    <>
      <Modal
        title="Academy Details"
        visible={visible}
        onCancel={onCancel}
        footer={null}
        maskClosable={false}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item label="Description" required>
            <ReactQuill
              theme="snow"
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
                fileList={image}
                beforeUpload={() => false} // Prevent automatic upload
                onChange={({ fileList }) => setImage(fileList)}
                onRemove={(file) =>
                  handleFileRemove(file, setImage, setImageToDelete)
                }
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
                onRemove={(file) =>
                  handleFileRemove(file, setVideo, setVideoToDelete)
                }
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
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select a status!" }]}
            >
              <Select>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="prioroty" label="Prioroty">
              <Input type="number" />
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
              size={["large", 20]}
            />
          )}
          <Form.Item className="mt-3 w-full">
            <Button
              className="w-full"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Update Academy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AcademyEdit;
