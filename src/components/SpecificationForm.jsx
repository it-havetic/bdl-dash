import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Upload,
} from "antd";
import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import { SpecificationContext } from "../context/SpecificationContext";

const { Option } = Select;

const wattsOptions = ["1-10W", "11-20W", "21-30W"];
const lumensOptions = ["110lm/W", "120lm/W", "130lm/W"];
const beamAngleOptions = ["BD", "120", "240", "360", "450", "+"];
const rimColorOptions = ["White", "Black", "Chrome", "Rose Gold", "+"];
const mountingOptions = [
  "Surface",
  "Recessed",
  "Base Plait",
  "Pendant",
  "Floor Standing",
  "+",
];
const ipGradeOptions = ["20", "40", "65", "66", "67", "68", "+"];
const glareOptions = ["LMS", "Parabolic", "Honeycomb", "+"];
const bodyColorOptions = ["White", "Black", "Gold", "Chrome", "Rose Gold", "+"];
const dimmingOptions = ["0/1-10W", "DALI", "Phase", "PWM", "24VDC"];
const cctOptions = [
  "3000K",
  "2700K",
  "6400K",
  "5000K",
  "4000K",
  "3500K",
  "2000K",
];

const SpecificationForm = () => {
  const { createSpecification, loading } = useContext(SpecificationContext);

  const [groups, setGroups] = useState([]);
  const [series, setSeries] = useState([]);
  const [subSeries, setSubSeries] = useState([]);

  const [imagesForView, setImagesForView] = useState([]);
  const [videosForView, setVideosForView] = useState([]);
  const [productImage, setProductImage] = useState();
  const [productVideo, setProductVideo] = useState();
  const [form] = Form.useForm();

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
      setProductImage();
      setImagesForView([]);
    }
  };
  const handleVideoChange = (fileList) => {
    if (fileList.length > 0) {
      const video = URL.createObjectURL(fileList[0].originFileObj);
      setVideosForView([video]);
      setProductVideo(fileList[0].originFileObj); // Only keep one image
    } else {
      setProductVideo();
      setVideosForView([]);
    }
  };

  const onFinish = async (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("group", values.group);
    formData.append("series", values.series);
    formData.append("subSeries", values.subSeries);
    formData.append("priority", values.priority);

    formData.append("watts", values.watts);
    formData.append("lumens", values.lumens);
    formData.append("beamAngle", values.beamAngle);
    formData.append("rimColor", values.rimColor);
    formData.append("mounting_array", values.mounting_array);
    formData.append("ipGrade", values.ipGrade);
    formData.append("glare", values.glare);
    formData.append("bodyColor", values.bodyColor);
    formData.append("dimming", values.dimming);
    formData.append("cct", values.cct);

    formData.append("dimention", values.dimension);
    formData.append("shape", values.shape);
    formData.append("thickness", values.thickness);
    formData.append("mounting", values.mounting);
    formData.append("finish", values.finish);
    formData.append("capacity", values.capacity);

    formData.append("image", productImage);
    formData.append("video", productVideo);
    createSpecification(formData);
    form.resetFields();
    setProductImage();
    setProductVideo();
    setImagesForView([]);
    setVideosForView([]);
  };

  return (
    <Form
      form={form}
      name="specification"
      layout="vertical"
      onFinish={onFinish}
      className="space-y-8 p-8 bg-gray-50 rounded-lg shadow-lg text-xl"
    >
      {/* Group, Series, SubSeries, Priority */}
      <div className="grid grid-cols-4 gap-6">
        <Form.Item
          label={<span className="text-blue-600 font-bold text-lg">Group</span>}
          name="group"
          className="w-full"
        >
          <Select
            onChange={(value) => fetchSeries(value)}
            placeholder="Select Group"
            size="large"
            className="text-gray-700 border border-blue-300 rounded-md"
          >
            {groups.map((group) => (
              <Option key={group._id} value={group._id}>
                {group.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={
            <span className="text-blue-600 font-bold text-lg">Series</span>
          }
          name="series"
          className="w-full"
        >
          <Select
            onChange={(value) => fetchSubSeries(value)}
            placeholder="Select Series"
            size="large"
            className="text-gray-700 border border-blue-300 rounded-md"
          >
            {series.map((series) => (
              <Option key={series._id} value={series._id}>
                {series.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={
            <span className="text-blue-600 font-bold text-lg">SubSeries</span>
          }
          name="subSeries"
          className="w-full"
        >
          <Select
            placeholder="Select SubSeries"
            size="large"
            className="text-gray-700 border border-blue-300 rounded-md"
          >
            {subSeries.map((subSeries) => (
              <Option key={subSeries._id} value={subSeries._id}>
                {subSeries.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={
            <span className="text-blue-600 font-bold text-lg">Priority</span>
          }
          name="priority"
          className="w-full"
        >
          <InputNumber
            type="number"
            min={1}
            className="w-full border border-blue-300 rounded-md"
            size="large"
          />
        </Form.Item>
      </div>

      {/* Checkbox Groups */}
      <div className="grid grid-cols-10 gap-6">
        <Form.Item
          label={<span className="text-blue-600 font-bold text-lg">Watts</span>}
          name="watts"
        >
          <Checkbox.Group
            options={wattsOptions}
            className="flex-col text-gray-800"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-blue-600 font-bold text-lg">Lumens</span>
          }
          name="lumens"
        >
          <Checkbox.Group
            options={lumensOptions}
            className="flex-col text-gray-800"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-blue-600 font-bold text-lg">Beam Angle</span>
          }
          name="beamAngle"
        >
          <Checkbox.Group
            options={beamAngleOptions}
            className="flex-col text-gray-800"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-blue-600 font-bold text-lg">Rim Color</span>
          }
          name="rimColor"
        >
          <Checkbox.Group
            options={rimColorOptions}
            className="flex-col text-gray-800"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-blue-600 font-bold text-lg">Mounting</span>
          }
          name="mounting_array"
        >
          <Checkbox.Group
            options={mountingOptions}
            className="flex-col text-gray-800"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-blue-600 font-bold text-lg">IP Grade</span>
          }
          name="ipGrade"
        >
          <Checkbox.Group
            options={ipGradeOptions}
            className="flex-col text-gray-800"
          />
        </Form.Item>
        <Form.Item
          label={<span className="text-blue-600 font-bold text-lg">Glare</span>}
          name="glare"
        >
          <Checkbox.Group
            options={glareOptions}
            className="flex-col text-gray-800"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-blue-600 font-bold text-lg">Body Color</span>
          }
          name="bodyColor"
        >
          <Checkbox.Group
            options={bodyColorOptions}
            className="flex-col text-gray-800"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-blue-600 font-bold text-lg">Dimming</span>
          }
          name="dimming"
        >
          <Checkbox.Group
            options={dimmingOptions}
            className="flex-col text-gray-800"
          />
        </Form.Item>
        <Form.Item
          label={<span className="text-blue-600 font-bold text-lg">CCT</span>}
          name="cct"
        >
          <Checkbox.Group
            options={cctOptions}
            className="flex-col text-gray-800"
          />
        </Form.Item>
      </div>

      {/* Dimension, Shape, Customization */}
      <div className="grid grid-cols-7 gap-6">
        <Form.Item
          label={
            <span className="text-blue-600 font-bold text-lg">Dimension</span>
          }
          name="dimension"
        >
          <Input
            placeholder="Enter Dimension"
            size="large"
            className="border border-blue-300 rounded-md text-gray-700"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-blue-600 font-bold text-lg">Shape</span>}
          name="shape"
        >
          <Input
            placeholder="Enter Shape"
            size="large"
            className="border border-blue-300 rounded-md text-gray-700"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-blue-600 font-bold text-lg">Thickness</span>
          }
          name="thickness"
        >
          <Input
            placeholder="Enter Thickness"
            size="large"
            className="border border-blue-300 rounded-md text-gray-700"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-blue-600 font-bold text-lg">Mounting</span>
          }
          name="mountingType"
        >
          <Input
            placeholder="Enter Mounting"
            size="large"
            className="border border-blue-300 rounded-md text-gray-700"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-blue-600 font-bold text-lg">Finish</span>
          }
          name="finish"
        >
          <Input
            placeholder="Enter Finish"
            size="large"
            className="border border-blue-300 rounded-md text-gray-700"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-blue-600 font-bold text-lg">
              Customization
            </span>
          }
          name="customization"
        >
          <Input
            placeholder="Enter Customization"
            size="large"
            className="border border-blue-300 rounded-md text-gray-700"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-blue-600 font-bold text-lg">Capacity</span>
          }
          name="capacity"
        >
          <Input
            placeholder="Enter Capacity"
            size="large"
            className="border border-blue-300 rounded-md text-gray-700"
          />
        </Form.Item>
      </div>

      <div className="flex justify-center items-center">
        {/* Image Upload */}
        <div className="w-1/2">
          {imagesForView.length > 0 && (
            <div className="mt-3 w-[400px] aspect-square overflow-hidden flex justify-center items-center">
              <img
                src={imagesForView[0]}
                alt="Product Image"
                className="w-full object-cover"
              />
            </div>
          )}
          <Form.Item
            label={
              <span className="text-blue-600 font-bold text-lg">
                Diagram Image
              </span>
            }
            name="image"
          >
            <Upload
              name="image"
              accept="image/*"
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
                  Upload Diagram Image
                </Button>
              )}
            </Upload>
          </Form.Item>
        </div>

        {/* Video Upload */}
        <div className="flex justify-center items-center">
          <div className="w-1/2">
            {videosForView.length > 0 && (
              <div className="mt-3 w-[400px] aspect-square flex justify-center items-center overflow-hidden">
                <video
                  controls
                  src={videosForView[0]}
                  alt="Product Image"
                  className="w-full object-cover"
                  autoPlay={false}
                />
              </div>
            )}
            <Form.Item
              label={
                <span className="text-blue-600 font-bold text-lg">
                  Video Upload
                </span>
              }
              name="video"
            >
              <Upload
                name="video"
                accept="video/*"
                fileList={videosForView.map((img) => ({
                  name: img.split("/").pop(),
                }))}
                onChange={({ fileList }) => handleVideoChange(fileList)}
                beforeUpload={() => false} // Prevent automatic upload
              >
                {videosForView.length < 1 && (
                  <Button
                    type="dashed"
                    className="w-[340px] text-black font-mono text-[17px]"
                    icon={<UploadOutlined />}
                  >
                    Upload Tutorial Video
                  </Button>
                )}
              </Upload>
            </Form.Item>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Form.Item>
        <Button size="large" type="primary" htmlType="submit" loading={loading}>
          Create Specification
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SpecificationForm;