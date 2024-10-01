import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification, Progress, Upload } from "antd";
import { useContext, useState } from "react";
import { CompanyProfileContext } from "../context/CompanyProfileContext";

const CompanyProfileForm = () => {
  const { createCompanyProfile, loading } = useContext(CompanyProfileContext);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState([]);
  const [videoFile, setVideoFile] = useState([]);
  const [portfolioFiles, setPortfolioFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("article", values.article);
    formData.append("completedProjects", values.completedProjects);
    formData.append("satisfiedClients", values.satisfiedClients);
    formData.append("underConstruction", values.underConstruction);
    formData.append("ongoingProjects", values.ongoingProjects);
    formData.append("teamMembers", values.teamMembers);
    formData.append("awards", values.awards);

    if (imageFile) {
      formData.append("image", imageFile[0].originFileObj);
    }
    if (videoFile) {
      formData.append("video", videoFile[0].originFileObj);
    }
    portfolioFiles.forEach((file) => {
      formData.append(`portfolio`, file.originFileObj);
    });

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted); // Update the progress
      },
    };

    try {
      await createCompanyProfile(formData, config);
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
      setImageFile([]);
      setVideoFile([]);
      setPortfolioFiles([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create Profile</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-6"
      >
        <Form.Item
          name="article"
          label="Article"
          rules={[{ required: true, message: "Article is required" }]}
        >
          <Input.TextArea rows={4} className="rounded-lg" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="completedProjects" label="Completed Projects">
            <Input type="number" className="rounded-lg" />
          </Form.Item>

          <Form.Item name="satisfiedClients" label="Satisfied Clients">
            <Input type="number" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            name="underConstruction"
            label="Under Construction Projects"
          >
            <Input type="number" className="rounded-lg" />
          </Form.Item>

          <Form.Item name="ongoingProjects" label="Ongoing Projects">
            <Input type="number" className="rounded-lg" />
          </Form.Item>

          <Form.Item name="teamMembers" label="Team Members">
            <Input type="number" className="rounded-lg" />
          </Form.Item>

          <Form.Item name="awards" label="Awards">
            <Input className="rounded-lg" type="number" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="image"
            label="Image"
            rules={[{ required: true, message: "Image is required" }]}
          >
            <Upload
              accept="image/*"
              listType="picture-card"
              beforeUpload={() => false} // Prevent automatic upload
              onChange={({ fileList }) => setImageFile(fileList)}
            >
              {imageFile.length > 0 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            name="video"
            label="Video"
            rules={[{ required: true, message: "Video is required" }]}
          >
            <Upload
              accept="video/*"
              listType="picture-card"
              onChange={({ fileList }) => setVideoFile(fileList)}
              fileList={videoFile}
              beforeUpload={() => false}
              maxCount={1}
            >
              {videoFile.length > 0 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </div>

        <Form.Item
          label="Upload Portfolio"
          rules={[{ required: true, message: "Portfolio is required" }]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            multiple
            fileList={portfolioFiles}
            onChange={({ fileList }) => setPortfolioFiles(fileList)}
            className="block"
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
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

        <Form.Item className="w-full mt-3">
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-full"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CompanyProfileForm;
