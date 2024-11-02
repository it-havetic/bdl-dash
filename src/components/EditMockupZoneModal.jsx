import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Progress, Select, Upload } from "antd";
import { useContext, useEffect, useState } from "react";
import { MockupZoneContext } from "../context/MockupZoneContex";

import PropTypes from "prop-types";

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

/**
 * A modal for editing a mockup zone.
 *
 * @param {Object} visible - Flag for showing the modal.
 * @param {Function} onCancel - Function to call when the modal is canceled.
 * @param {Object} mockupZone - Object with the data of the mockup zone to edit.
 *
 * @returns A JSX element representing the modal.
 */

const EditMockupZoneModal = ({ visible, onCancel, mockupZone }) => {
  const { updateMockupZone, loading } = useContext(MockupZoneContext);
  console.log(mockupZone);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]); // New images
  const [videoFileList, setVideoFileList] = useState([]); // New videos
  const [thumbnailFileList, setThumbnailFileList] = useState([]); // New thumbnails
  const [imagesToDelete, setImagesToDelete] = useState([]); // Images to delete
  const [videosToDelete, setVideosToDelete] = useState([]); // Videos to delete

  useEffect(() => {
    if (mockupZone) {
      form.setFieldsValue({
        name: mockupZone.name,
        prioroty: mockupZone.prioroty,
        status: mockupZone.status,
      });

      // Populate existing files
      setFileList(
        mockupZone.images.map((image, idx) => ({
          uid: idx,
          name: `Image ${idx + 1}`,
          status: "done",
          url: `${import.meta.env.VITE_URL}${image}`,
        }))
      );
      // Populate existing videos
      setVideoFileList(
        mockupZone.videos.map((video, idx) => ({
          uid: idx,
          name: `Video ${idx + 1}`,
          status: "done",
          url: `${import.meta.env.VITE_URL}${video.video}`,
        }))
      );
    }
  }, [mockupZone, form]);

  /**
   * Handle the update of a mockup zone.
   *
   * Fetches the form values, and appends the files to delete and new files to
   * a FormData object. Then makes a PATCH request to the server to update
   * the mockup zone.
   *
   * @async
   */
  const handleUpdate = async () => {
    const { name, prioroty, status } = form.getFieldsValue();
    // console.log(handleUpdate);
    const formData = new FormData();
    formData.append("name", name);
    if (prioroty) formData.append("prioroty", prioroty);

    if (status) formData.append("status", status);

    // Append files to delete
    imagesToDelete.forEach((image) =>
      formData.append("imageToDelete[]", image)
    );
    videosToDelete.forEach((video) =>
      formData.append("videoToDelete[]", video)
    );

    // Append new files
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("image", file.originFileObj);
      }
    });
    videoFileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("video", file.originFileObj);
      }
    });
    thumbnailFileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("thumbnail", file.originFileObj);
      }
    });

    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted); // Update the progress
      },
    };

    try {
      await updateMockupZone(mockupZone._id, formData, config);
    } catch (error) {
      console.error("Update failed:", error.response.data);
    } finally {
      onCancel();
      setUploadProgress(0);
    }
  };

  /**
   * Handles the removal of a file from the list.
   *
   * Filters out the file from the fileList and adds its URL to the list of files
   * to delete.
   *
   * @param {Object} file The file to remove.
   * @param {Function} setList The setter for the fileList.
   * @param {Function} setListToDelete The setter for the list of files to delete.
   */
  const handleFileRemove = (file, setList, setListToDelete) => {
    setList((prev) => prev.filter((item) => item.uid !== file.uid)); // Remove from fileList
    console.log(file.url.replace(import.meta.env.VITE_URL, ""));
    setListToDelete((prev) => [
      ...prev,
      file.url.replace(import.meta.env.VITE_URL, ""),
    ]); // Add to the deletion list
  };

  return (
    <Modal
      title="Edit Mockup Zone"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width="60%"
      maskClosable={false}
      style={{ top: 20 }}
    >
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <div className="flex gap-2 w-full">
          <div className="w-1/3">
            <Form.Item label="Zone Name" name="name">
              <Select
                filterOption={(input, option) =>
                  (option?.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                showSearch
                allowClear
                placeholder="Select a zone"
              >
                {[
                  "Zone-1",
                  "Zone-2",
                  "Zone-3",
                  "Zone-4",
                  "Zone-5",
                  "Zone-6",
                  "Zone-7",
                  "Zone-8",
                  "Zone-9",
                  "Zone-10",
                  "Zone-11",
                  "Zone-12",
                  "Zone-13",
                  "Zone-14",
                  "Zone-15",
                  "Zone-16",
                  "Zone-17",
                ].map((zone) => (
                  <Select.Option key={zone} value={zone}>
                    {zone}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="w-1/3">
            <Form.Item label="prioroty" name="prioroty">
              <Input
                placeholder="Enter prioroty"
                name="prioroty"
                type="number"
              />
            </Form.Item>
          </div>
          <div className="w-1/3">
            <Form.Item label="status" name="status">
              <Select placeholder="Select a status">
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        {/* Images Upload */}
        <Form.Item label="Images">
          <Upload
            accept="image/*"
            listType="picture-card"
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            onRemove={(file) =>
              handleFileRemove(file, setFileList, setImagesToDelete)
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
            fileList={videoFileList}
            onChange={({ fileList }) => setVideoFileList(fileList)}
            onRemove={(file) =>
              handleFileRemove(file, setVideoFileList, setVideosToDelete)
            }
            beforeUpload={() => false} // Prevent automatic upload
          >
            {uploadButton}
          </Upload>
        </Form.Item>

        {/* Thumbnails Upload */}
        <Form.Item label="Thumbnails">
          <Upload
            accept="image/*"
            listType="picture-card"
            fileList={thumbnailFileList}
            onChange={({ fileList }) => setThumbnailFileList(fileList)}
            beforeUpload={() => false} // Prevent automatic upload
          >
            {thumbnailFileList.length == 1 ? null : uploadButton}
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
        <Form.Item className="mt-4">
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditMockupZoneModal;

EditMockupZoneModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  mockupZone: PropTypes.object.isRequired,
};
