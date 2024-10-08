import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  List,
  Modal,
  Pagination,
  Popconfirm,
  Select,
  Tag,
  Upload,
  message,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import axios from "../axios";
import QRCodeButton from "../components/QRCodeButton ";

const { Option } = Select;

const GroupSeriesSubSeriesPage = () => {
  console.log(import.meta.env.VITE_URL);
  // for edit
  const [groupDataForEdit, setGroupDataForEdit] = useState();
  const [seriesDataForEdit, setSeriesDataForEdit] = useState();
  const [subSeriesDataForEdit, setSubSeriesDataForEdit] = useState();

  //for modal
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
  const [isSeriesModalVisible, setIsSeriesModalVisible] = useState(false);
  const [isSubSeriesModalVisible, setIsSubSeriesModalVisible] = useState(false);

  const [groups, setGroups] = useState([]);
  const [series, setSeries] = useState([]);
  const [subSeries, setSubSeries] = useState([]);
  //select options
  const [seriesByGroup, setSeriesByGroup] = useState([]);

  // State for form
  const [groupForm] = Form.useForm();
  const [seriesForm] = Form.useForm();
  const [subSeriesForm] = Form.useForm();

  // edit state for form
  const [groupEditForm] = Form.useForm();
  const [seriesEditForm] = Form.useForm();
  const [subSeriesEditForm] = Form.useForm();

  // State for images
  const [groupImage, setGroupImage] = useState();
  const [groupImagesForView, setGroupImagesForView] = useState([]);
  const [seriesImage, setSeriesImage] = useState([]);
  const [seriesImagesForView, setSeriesImagesForView] = useState([]);
  const [subSeriesImage, setSubSeriesImage] = useState([]);
  const [subSeriesImagesForView, setSubSeriesImagesForView] = useState([]);

  // State for loading
  const [loadingGroup, setLoadingGroup] = useState(false);
  const [loadingSeries, setLoadingSeries] = useState(false);
  const [loadingSubSeries, setLoadingSubSeries] = useState(false);

  // State for pagination and search
  const [groupPage, setGroupPage] = useState(1);
  const [groupPageSize] = useState(5);
  const [groupSearch, setGroupSearch] = useState("");

  const [seriesPage, setSeriesPage] = useState(1);
  const [seriesPageSize] = useState(5);
  const [seriesSearch, setSeriesSearch] = useState("");

  const [subSeriesPage, setSubSeriesPage] = useState(1);
  const [subSeriesPageSize] = useState(5);
  const [subSeriesSearch, setSubSeriesSearch] = useState("");

  //Update functions for group
  const handleGroupEdit = (data) => {
    setGroupDataForEdit(data);
    setIsGroupModalVisible(true);
  };
  const handleGroupEditOk = (value) => {
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("image", groupImage);
    setLoadingGroup(true);
    axios
      .patch(`/groups/${groupDataForEdit._id}`, formData)
      .then((res) => {
        fetchGroups();
        fetchSeries();
        fetchSubSeries();
        message.success({
          message: "Group Updated Successfully",
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        fetchGroups();
        groupEditForm.resetFields();
        setGroupImage();
        setGroupImagesForView([]);
        setLoadingGroup(false);
      });
    setIsGroupModalVisible(false);
  };
  const handleGroupEditCancel = () => {
    fetchGroups();
    groupEditForm.resetFields();
    setGroupImage();
    setGroupImagesForView([]);
    setIsGroupModalVisible(false);
    setLoadingGroup(false);
  };

  // Update functions for series
  const handleSeriesEdit = (data) => {
    setSeriesDataForEdit(data);
    setIsSeriesModalVisible(true);
  };

  const handleSeriesEditOk = (value) => {
    const formData = new FormData();

    if (typeof value.group === "object") {
      value.group = value.group._id;
    }
    formData.append("name", value.name);
    formData.append("group", value.group);
    formData.append("image", seriesImage);
    setLoadingSeries(true);
    axios
      .patch(`/series/${seriesDataForEdit._id}`, formData)
      .then((res) => {
        fetchGroups();
        fetchSeries();
        fetchSubSeries();
        notification.success({
          duration: 2,
          message: "Series Updated Successfully",
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        fetchSeries();
        setLoadingSeries(false);
        seriesEditForm.resetFields();
        setSeriesImage();
        setSeriesImagesForView([]);
      });
    setIsSeriesModalVisible(false);
  };

  const handleSeriesEditCancel = () => {
    fetchSeries();
    seriesEditForm.resetFields();
    setSeriesImage();
    setSeriesImagesForView([]);
    setIsSeriesModalVisible(false);
    loadingSeries(false);
  };

  // Update functions for subseries

  const handleSubSeriesEdit = (data) => {
    console.log(data);
    setSubSeriesDataForEdit(data);
    setIsSubSeriesModalVisible(true);
  };

  const handleSubSeriesEditOk = (value) => {
    const formData = new FormData();
    if (typeof value.series === "object") {
      value.series = value.series._id;
    }
    formData.append("name", value.name);
    formData.append("series", value.series);
    formData.append("image", subSeriesImage);
    setLoadingSubSeries(true);
    axios
      .patch(`/sub-series/${subSeriesDataForEdit._id}`, formData)
      .then((res) => {
        fetchGroups();
        fetchSeries();
        fetchSubSeries();
        notification.success({
          duration: 2,
          message: "Subseries Updated Successfully",
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        fetchSubSeries();
        setLoadingSubSeries(false);
        subSeriesEditForm.resetFields();
        setSubSeriesImage();
        setSubSeriesImagesForView([]);
      });
    setIsSubSeriesModalVisible(false);
  };

  const handleSubSeriesEditCancel = () => {
    fetchSubSeries();
    subSeriesEditForm.resetFields();
    setSubSeriesImage();
    setSubSeriesImagesForView([]);
    setIsSubSeriesModalVisible(false);
    loadingSubSeries(false);
  };

  useEffect(() => {
    fetchGroups();
    fetchSeries();
    fetchSubSeries();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await axios.get("/groups");
      setGroups(res.data || []);
    } catch (error) {
      console.error("Error fetching groups", error);
    }
  };

  const fetchSeries = async () => {
    try {
      const res = await axios.get(`/series`);
      setSeries(res.data || []);
    } catch (error) {
      console.error("Error fetching series", error);
    }
  };

  const fetchSubSeries = async () => {
    try {
      const res = await axios.get("/sub-series");
      setSubSeries(res.data || []);
    } catch (error) {
      console.error("Error fetching subseries", error);
    }
  };

  const handleGroupChange = async (value) => {
    try {
      const res = await axios.get(`/series/group/${value}`);
      setSeriesByGroup(res.data || []);
    } catch (error) {
      console.error("Error fetching series options", error);
    }
  };

  const handleGroupImageChange = (fileList) => {
    if (fileList.length > 0) {
      const image = URL.createObjectURL(fileList[0].originFileObj);
      setGroupImagesForView([image]);
      setGroupImage(fileList[0].originFileObj); // Only keep one image
    } else {
      setGroupImage([]);
      setGroupImagesForView([]);
    }
  };

  const handleGroupSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", groupImage);
    setLoadingGroup(true);
    try {
      await axios.post("/groups", formData);
      notification.success({
        duration: 2,
        message: "Group created successfully!",
      });
      fetchGroups();
      groupForm.resetFields();
      setGroupImage();
      setGroupImagesForView([]);
    } catch (error) {
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    } finally {
      setLoadingGroup(false);
    }
  };

  const handleSeriesImageChange = (fileList) => {
    if (fileList.length > 0) {
      const image = URL.createObjectURL(fileList[0].originFileObj);
      setSeriesImagesForView([image]);
      setSeriesImage(fileList[0].originFileObj); // Only keep one image
    } else {
      setSeriesImage(); // Clear if no images
      setSeriesImagesForView([]);
    }
  };

  const handleSeriesSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("group", values.group);
    formData.append("image", seriesImage);

    setLoadingSeries(true);

    try {
      await axios.post("/series", formData);
      notification.success({
        duration: 2,
        message: "Series created successfully!",
      });
      fetchSeries();
      seriesForm.resetFields();
      setSeriesImage();
      setSeriesImagesForView([]);
    } catch (error) {
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    } finally {
      setLoadingSeries(false);
    }
  };

  const handleSubSeriesImageChange = (fileList) => {
    if (fileList.length > 0) {
      const image = URL.createObjectURL(fileList[0].originFileObj);
      setSubSeriesImagesForView([image]);
      setSubSeriesImage(fileList[0].originFileObj); // Only keep one image
    } else {
      setSubSeriesImage(); // Clear if no images
      setSubSeriesImagesForView([]);
    }
  };

  const handleSubSeriesSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("series", values.series);
    formData.append("image", subSeriesImage);

    setLoadingSubSeries(true);

    try {
      await axios.post("/sub-series", formData);
      notification.success({
        duration: 2,
        message: "SubSeries created successfully!",
      });
      fetchSubSeries();
      subSeriesForm.resetFields();
      setSubSeriesImage();
      setSubSeriesImagesForView([]);
    } catch (error) {
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    } finally {
      setLoadingSubSeries(false);
    }
  };

  //delete function
  const handleGroupDelete = async (id) => {
    try {
      await axios.delete(`/groups/${id}`);
      notification.success({
        duration: 2,
        message: "Group deleted successfully!",
      });
      fetchGroups();
    } catch (error) {
      notification.error({
        message: "Cannot delete Group because it has associated series",
      });
    }
  };

  const handleSeriesDelete = async (id) => {
    try {
      const res = await axios.delete(`/series/${id}`);
      if (res.status === 200) {
        notification.success({
          duration: 2,
          message: "Series deleted successfully!",
        });
        fetchSeries();
      }
    } catch (error) {
      notification.error({
        message: "Cannot delete series because it has associated sub-series",
      });
    }
  };

  const handleSubSeriesDelete = async (id) => {
    try {
      await axios.delete(`/sub-series/${id}`);
      notification.success({
        duration: 2,
        message: "SubSeries deleted successfully!",
      });
      fetchSubSeries();
    } catch (error) {
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    }
  };

  // Search and pagination logic
  const filteredGroups = groups
    ? groups.filter((group) =>
        group.name.toLowerCase().includes(groupSearch.toLowerCase())
      )
    : [];
  const paginatedGroups = filteredGroups.slice(
    (groupPage - 1) * groupPageSize,
    groupPage * groupPageSize
  );

  const filteredSeries = series
    ? series.filter((ser) =>
        ser.name.toLowerCase().includes(seriesSearch.toLowerCase())
      )
    : [];
  const paginatedSeries = filteredSeries.slice(
    (seriesPage - 1) * seriesPageSize,
    seriesPage * seriesPageSize
  );

  const filteredSubSeries = subSeries
    ? subSeries.filter((subSer) =>
        subSer.name.toLowerCase().includes(subSeriesSearch.toLowerCase())
      )
    : [];
  const paginatedSubSeries = filteredSubSeries.slice(
    (subSeriesPage - 1) * subSeriesPageSize,
    subSeriesPage * subSeriesPageSize
  );

  return (
    <div className="p-8">
      <div className="grid grid-cols-2 gap-8">
        {/* Create Group Form and Group List */}
        <div className="border p-4 bg-white rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create Group</h2>
          <Form
            form={groupForm}
            onFinish={handleGroupSubmit}
            layout="vertical"
            className="mb-8"
          >
            <Form.Item
              name="name"
              label="Group Name"
              rules={[{ required: true, message: "Group name is required" }]}
            >
              <Input placeholder="Enter group name" />
            </Form.Item>
            <Form.Item
              name="image"
              label="Group Images"
              valuePropName="image"
              rules={[{ required: true, message: "Images are required" }]}
            >
              <Upload
                name="image"
                accept="image/*"
                listType="picture-card"
                fileList={groupImagesForView.map((img) => ({ url: img }))}
                onChange={({ fileList }) => handleGroupImageChange(fileList)}
                beforeUpload={() => false} // Prevent automatic upload
                maxCount={1}
              >
                {groupImagesForView.length < 1 && "+ Upload"}
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loadingGroup}>
                Create Group
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="border p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-semibold mb-2">Group List</h3>
          <Input.Search
            placeholder="Search groups"
            onSearch={(value) => setGroupSearch(value)}
            className="mb-4"
          />
          <List
            bordered
            dataSource={paginatedGroups}
            renderItem={(group) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Image
                      src={`${import.meta.env.VITE_URL}` + group.image}
                      className="!w-14 !h-14 !rounded-full"
                    ></Image>
                  }
                  title={group.name}
                />

                <Button
                  onClick={() => {
                    handleGroupEdit(group);
                  }}
                  type="link"
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure to delete this group?"
                  onConfirm={() => {
                    handleGroupDelete(group._id);
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>
              </List.Item>
            )}
          />
          <Pagination
            current={groupPage}
            pageSize={groupPageSize}
            total={filteredGroups.length}
            onChange={(page) => setGroupPage(page)}
            className="mt-4"
          />
        </div>

        {/* Create Series Form and Series List */}
        <div className="border p-4 bg-white rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create Series</h2>
          <Form
            form={seriesForm}
            onFinish={handleSeriesSubmit}
            layout="vertical"
            className="mb-8"
          >
            <Form.Item
              name="group"
              label="Select Group"
              rules={[{ required: true, message: "Group is required" }]}
            >
              <Select
                filterOption={(input, option) =>
                  (option?.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                showSearch
                allowClear
                placeholder="Select a group"
              >
                {groups.map((group) => (
                  <Option key={group._id} value={group._id}>
                    {group.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="name"
              label="Series Name"
              rules={[{ required: true, message: "Series name is required" }]}
            >
              <Input placeholder="Enter series name" />
            </Form.Item>
            <Form.Item
              name="image"
              label="Series Images"
              valuePropName="image"
              rules={[{ required: true, message: "Images are required" }]}
            >
              <Upload
                name="image"
                accept="image/*"
                maxCount={1}
                listType="picture-card"
                fileList={seriesImagesForView.map((img) => ({ url: img }))}
                onChange={({ fileList }) => handleSeriesImageChange(fileList)}
                beforeUpload={() => false} // Prevent automatic upload
              >
                {seriesImagesForView.length < 1 && "+ Upload"}
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loadingSeries}>
                Create Series
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="border p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-semibold mb-2">Series List</h3>
          <Input.Search
            placeholder="Search series"
            onSearch={(value) => setSeriesSearch(value)}
            className="mb-4"
          />
          <List
            bordered
            dataSource={paginatedSeries}
            renderItem={(ser) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Image
                      src={`${import.meta.env.VITE_URL}` + ser.image}
                      className="!w-14 !h-14 !rounded-full"
                    ></Image>
                  }
                  title={ser.name}
                  description={ser?.group?.name}
                />
                <QRCodeButton
                  key={ser._id}
                  link={`https://bdluminaries.com/product/detail/one/${ser?.group?._id}?series=${ser._id}`}
                  iconUrl={ser.iconUrl} // Optional: specify an icon if needed
                  bgColor="#f0f0f0"
                  qrCodeSize={800}
                  fileName={`${ser.name}QRCode`} // Unique filename for each series
                />
                <Button
                  onClick={() => {
                    handleSeriesEdit(ser);
                  }}
                  type="link"
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure to delete this series?"
                  onConfirm={() => {
                    handleSeriesDelete(ser._id);
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>
              </List.Item>
            )}
          />
          <Pagination
            current={seriesPage}
            pageSize={seriesPageSize}
            total={filteredSeries.length}
            onChange={(page) => setSeriesPage(page)}
            className="mt-4"
          />
        </div>

        {/* Create SubSeries Form and SubSeries List */}
        <div className="border p-4 bg-white rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create SubSeries</h2>
          <Form
            form={subSeriesForm}
            onFinish={handleSubSeriesSubmit}
            layout="vertical"
            className="mb-8"
          >
            <Form.Item
              name="group"
              label="Select Group"
              rules={[{ required: true, message: "Group is required" }]}
            >
              <Select
                allowClear
                placeholder="Select a group"
                onChange={(value) => {
                  handleGroupChange(value);
                }}
              >
                {groups.map((group) => (
                  <Option key={group._id} value={group._id}>
                    {group.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="series"
              label="Select Series"
              rules={[{ required: true, message: "Series is required" }]}
            >
              <Select
                filterOption={(input, option) =>
                  (option?.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                showSearch
                allowClear
                placeholder="Select a series"
              >
                {seriesByGroup.map((ser) => (
                  <Option key={ser._id} value={ser._id}>
                    {ser.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="name"
              label="SubSeries Name"
              rules={[
                { required: true, message: "SubSeries name is required" },
              ]}
            >
              <Input placeholder="Enter subSeries name" />
            </Form.Item>

            <Form.Item
              name="image"
              label="SubSeries Images"
              valuePropName="image"
              rules={[{ required: true, message: "Images are required" }]}
            >
              <Upload
                name="image"
                accept="image/*"
                maxCount={1}
                listType="picture-card"
                fileList={subSeriesImagesForView.map((img) => ({ url: img }))}
                onChange={({ fileList }) =>
                  handleSubSeriesImageChange(fileList)
                }
                beforeUpload={() => false} // Prevent automatic upload
              >
                {subSeriesImagesForView.length < 1 && "+ Upload"}
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loadingSubSeries}
              >
                Create SubSeries
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="border p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-semibold mb-2">SubSeries List</h3>
          <Input.Search
            placeholder="Search subSeries"
            onSearch={(value) => setSubSeriesSearch(value)}
            className="mb-4"
          />
          <List
            bordered
            dataSource={paginatedSubSeries}
            renderItem={(subSer) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Image
                      src={`${import.meta.env.VITE_URL}` + subSer.image}
                      className="!w-14 !h-14 !rounded-full"
                    ></Image>
                  }
                  title={subSer.name}
                  description={subSer.series.name}
                />

                <Button
                  onClick={() => {
                    handleSubSeriesEdit(subSer);
                  }}
                  type="link"
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure to delete this subSeries?"
                  onConfirm={() => {
                    handleSubSeriesDelete(subSer._id);
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger type="link" icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>
              </List.Item>
            )}
          />
          <Pagination
            current={subSeriesPage}
            pageSize={subSeriesPageSize}
            total={filteredSubSeries.length}
            onChange={(page) => setSubSeriesPage(page)}
            className="mt-4"
          />
        </div>
      </div>

      {/* Group Edit Modal */}
      <Modal
        title="Edit Group"
        open={isGroupModalVisible}
        onCancel={handleGroupEditCancel}
        footer={null}
        maskClosable={false}
      >
        <Form
          form={groupEditForm}
          initialValues={groupDataForEdit}
          onFinish={handleGroupEditOk}
          layout="vertical"
          className="mb-8"
        >
          <Form.Item name="name" label="Group Name">
            <Input name="name" placeholder="Enter group name" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Group Images"
            valuePropName="image"
            rules={[{ required: true, message: "Images are required" }]}
          >
            <Upload
              name="image"
              accept="image/*"
              maxCount={1}
              listType="picture-card"
              fileList={groupImagesForView.map((img) => ({ url: img }))}
              onChange={({ fileList }) => handleGroupImageChange(fileList)}
              beforeUpload={() => false} // Prevent automatic upload
            >
              {groupImagesForView.length < 1 && "+ Upload"}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              className="w-full"
              type="primary"
              htmlType="submit"
              loading={loadingGroup}
            >
              Update Group
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Series Edit Modal */}
      <Modal
        title="Edit Series"
        open={isSeriesModalVisible}
        onCancel={handleSeriesEditCancel}
        footer={null}
        maskClosable={false}
      >
        <Form
          form={seriesEditForm}
          initialValues={seriesDataForEdit}
          onFinish={handleSeriesEditOk}
          layout="vertical"
          className="mb-8"
        >
          <span className="mb-2 flex items-center gap-1">
            <Tag className="text-[16px]" color="geekblue">
              {seriesDataForEdit?.group?.name}
            </Tag>
          </span>
          <Form.Item name="group" label="Group">
            <Select
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              showSearch
              allowClear
              placeholder="Select a group"
            >
              {groups.map((group) => (
                <Option key={group._id} value={group._id}>
                  {group.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="name" label="Series Name">
            <Input placeholder="Enter series name" />
          </Form.Item>
          <Form.Item name="image" label="Series Images" valuePropName="image">
            <Upload
              name="image"
              accept="image/*"
              maxCount={1}
              listType="picture-card"
              fileList={seriesImagesForView.map((img) => ({ url: img }))}
              onChange={({ fileList }) => handleSeriesImageChange(fileList)}
              beforeUpload={() => false} // Prevent automatic upload
            >
              {seriesImagesForView.length < 1 && "+ Upload"}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              className="w-full"
              type="primary"
              htmlType="submit"
              loading={loadingSeries}
            >
              Update Series
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Sub Series Edit Modal */}
      <Modal
        title="Edit Sub Series"
        open={isSubSeriesModalVisible}
        onCancel={handleSubSeriesEditCancel}
        footer={null}
        maskClosable={false}
      >
        <Form
          form={subSeriesEditForm}
          initialValues={subSeriesDataForEdit}
          onFinish={handleSubSeriesEditOk}
          layout="vertical"
          className="mb-8"
        >
          <Form.Item name="group" label="Select Group">
            <Select
              allowClear
              placeholder="Select a group"
              onChange={(value) => {
                handleGroupChange(value);
              }}
            >
              {groups.map((group) => (
                <Option key={group._id} value={group._id}>
                  {group.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Tag className="text-[16px]" color="geekblue">
            {subSeriesDataForEdit?.series?.name}
          </Tag>
          <Form.Item name="series" label="Select Series">
            <Select
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              showSearch
              allowClear
              placeholder="Select a series"
            >
              {seriesByGroup.map((ser) => (
                <Option key={ser._id} value={ser._id}>
                  {ser.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="name" label="SubSeries Name">
            <Input placeholder="Enter subSeries name" />
          </Form.Item>

          <Form.Item
            name="image"
            label="SubSeries Images"
            valuePropName="image"
            rules={[{ required: true, message: "Images are required" }]}
          >
            <Upload
              name="image"
              accept="image/*"
              maxCount={1}
              listType="picture-card"
              fileList={subSeriesImagesForView.map((img) => ({ url: img }))}
              onChange={({ fileList }) => handleSubSeriesImageChange(fileList)}
              beforeUpload={() => false} // Prevent automatic upload
            >
              {subSeriesImagesForView.length < 1 && "+ Upload"}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              className="w-full"
              type="primary"
              htmlType="submit"
              loading={loadingSubSeries}
            >
              update SubSeries
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GroupSeriesSubSeriesPage;
