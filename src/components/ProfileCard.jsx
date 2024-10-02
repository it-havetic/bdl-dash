import { EditFilled, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  List,
  Modal,
  notification,
  Progress,
  Upload,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { CompanyProfileContext } from "../context/CompanyProfileContext";

const ProfileCard = () => {
  const {
    loading,
    getAllCompanyProfile,
    companyProfile,
    updateCompanyProfile,
  } = useContext(CompanyProfileContext);
  const [form] = Form.useForm();
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [portfolioToDelete, setPortfolioToDelete] = useState([]);

  useEffect(() => {
    console.log("im here");
    getAllCompanyProfile();
  }, [loading]);

  useEffect(() => {
    // populate form
    if (companyProfile) {
      form.setFieldsValue({
        article: companyProfile[0].article,
        completedProjects: companyProfile[0].completedProjects,
        satisfiedclients: companyProfile[0].satisfiedclients,
        underConstruction: companyProfile[0].underConstruction,
        ongoingProjects: companyProfile[0].ongoingProjects,
        teamMembers: companyProfile[0].teamMembers,
        awards: companyProfile[0].awards,
      });

      // populate image
      if (companyProfile[0].image) {
        setImage([
          {
            uid: "1",
            name: "image",
            status: "done",

            url: `${import.meta.env.VITE_URL}${companyProfile[0].image}`,
          },
        ]);
      }
      // populate video
      if (companyProfile[0].video) {
        setVideo([
          {
            uid: "1",
            name: "video",
            status: "done",
            url: `${import.meta.env.VITE_URL}${companyProfile[0].video}`,
          },
        ]);
      }
      // populate portfolio
      if (companyProfile[0].portfolio) {
        setPortfolio(
          companyProfile[0].portfolio.map((item, idx) => {
            return {
              uid: idx,
              name: "portfolio",
              status: "done",
              url: `${import.meta.env.VITE_URL}${item}`,
            };
          })
        );
      }
    }
  }, [companyProfile, form]);

  /**
   * Opens the modal for editing the company profile article
   */
  const editArticle = async () => {
    setModalVisible(true);
  };

  /**
   * Cancels the modal for editing the company profile article
   */

  const handleCancel = () => {
    setModalVisible(false);
  };

  /**
   * Handles a file being removed from the upload list.
   * Filters out the file from the list and adds it to the list of files to delete.
   * @param {object} file - The file that was removed.
   * @param {function} setList - The state setter for the list of files.
   * @param {function} setListToDelete - The state setter for the list of files to delete.
   */
  const hendleFileChange = (file, setList, setListToDelete) => {
    setList((prev) => prev.filter((item) => item.uid !== file.uid));
    console.log(file.url.replace(import.meta.env.VITE_URL, ""));
    setListToDelete((prev) => [
      ...prev,
      file.url.replace(import.meta.env.VITE_URL, ""),
    ]);
  };

  /**
   * Handles the form submission.
   * @param {object} values - The values from the form.
   */
  const onFinish = async (values) => {
    console.log(values);
    const formData = new FormData();
    if (values.article) formData.append("article", values.article);
    if (values.completedProjects)
      formData.append("completedProjects", values.completedProjects);
    if (values.satisfiedClients)
      formData.append("satisfiedClients", values.satisfiedClients);
    if (values.underConstruction)
      formData.append("underConstruction", values.underConstruction);
    if (values.ongoingProjects)
      formData.append("ongoingProjects", values.ongoingProjects);
    if (values.teamMembers) formData.append("teamMembers", values.teamMembers);
    if (values.awards) formData.append("awards", values.awards);
    if (values.image) formData.append("image", image[0].originFileObj);
    if (values.video) formData.append("video", video[0].originFileObj);
    if (values.portfolio) {
      portfolio.forEach((file) => {
        formData.append(`portfolio`, file.originFileObj);
      });
    }

    portfolioToDelete.forEach((portfolio) =>
      formData.append("imageToDelete[]", portfolio)
    );

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    /**
     * Function to update the progress bar when uploading a company profile.
     * @param {ProgressEvent} progressEvent - The event containing the upload progress.
     */
    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted); // Update the progress
      },
    };
    try {
      await updateCompanyProfile(companyProfile[0]._id, formData, config);
    } catch (error) {
      console.log(error);
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    } finally {
      setUploadProgress(0);
      setModalVisible(false);
      getAllCompanyProfile();
    }
  };

  if (!companyProfile) {
    return <p>Loading..</p>;
  }
  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Profile ID and Article */}
      <Card
        title={
          <div className="flex justify-between items-center">
            <p>Article</p>
            <Button
              onClick={() => editArticle()}
              icon={<EditFilled />}
            ></Button>
          </div>
        }
        className="shadow-lg"
      >
        <p>
          <strong>Article:</strong> {companyProfile[0].article}
        </p>
      </Card>

      {/* Media Section */}
      <Card title="Media" className="shadow-lg">
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="w-full h-[300px]">
            <video
              src={`${import.meta.env.VITE_URL}${companyProfile[0]?.video}`}
              controls
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-[300px] overflow-hidden">
            <Image
              style={{ width: "100%", height: "100%" }}
              src={`${import.meta.env.VITE_URL}${companyProfile[0]?.image}`}
              alt="Profile Image"
              className="rounded-lg w-full object-cover"
            />
          </div>
        </div>
      </Card>

      {/* Projects & Team Information */}
      <Card title="Projects & Team" className="shadow-lg">
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Completed Projects:</strong>{" "}
            {companyProfile[0]?.completedProjects}
          </p>
          <p>
            <strong>Satisfied Clients:</strong>{" "}
            {companyProfile[0]?.satisfiedclients}
          </p>
          <p>
            <strong>Under Construction Projects:</strong>{" "}
            {companyProfile[0]?.underConstruction}
          </p>
          <p>
            <strong>Ongoing Projects:</strong>{" "}
            {companyProfile[0]?.ongoingProjects}
          </p>
          <p>
            <strong>Team Members:</strong> {companyProfile[0]?.teamMembers}
          </p>
          <p>
            <strong>Total Awards:</strong> {companyProfile[0]?.awards}
          </p>
        </div>
      </Card>

      {/* Portfolio Section */}
      <Card title="Portfolio" className="shadow-lg">
        <List
          grid={{ gutter: 16, column: 7 }}
          dataSource={companyProfile[0]?.portfolio}
          renderItem={(item) => (
            <List.Item>
              <Image
                src={`${import.meta.env.VITE_URL}${item}`}
                alt="Portfolio Image"
                className="rounded-lg"
              />
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title="Edit Article"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
        style={{ top: 20 }}
        width={1000}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
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

            <Form.Item name="satisfiedclients" label="Satisfied Clients">
              <Input
                name="satisfiedclients"
                type="number"
                className="rounded-lg"
              />
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
            <Form.Item name="image" label="Image">
              <Upload
                accept="image/*"
                listType="picture-card"
                beforeUpload={() => false} // Prevent automatic upload
                fileList={image}
                onChange={({ fileList }) => setImage(fileList)}
                maxCount={1}
              >
                {image.length > 0 ? null : (
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
                maxCount={1}
              >
                {video.length > 0 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </div>

          <Form.Item label="Upload Portfolio" name="portfolio">
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              multiple
              fileList={portfolio}
              onChange={({ fileList }) => setPortfolio(fileList)}
              className="block"
              onRemove={(file) =>
                hendleFileChange(file, setPortfolio, setPortfolioToDelete)
              }
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
      </Modal>
    </div>
  );
};

export default ProfileCard;

// Example usage of the ProfileCard component
