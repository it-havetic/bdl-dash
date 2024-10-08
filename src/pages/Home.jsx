import { Card, Col, Divider, message, Progress, Row, Statistic } from "antd";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "../axios";

const Home = () => {
  const [dashboardData, setDashboardData] = useState({
    groupsCount: 0,
    seriesCount: 0,
    subseriesCount: 0,
    productsCount: 0,
    specificationsCount: 0,
    mockupZoneCount: 0,
    recentWorkCount: 0,
    greetingCount: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    totalMessages: 0,
    readMessages: 0,
    unreadMessages: 0,
    recentWorkImageCount: 0,
    recentWorkVideoCount: 0,
    mockupZoneImageCount: 0,
    mockupZoneVideoCount: 0,
  });
  const [messageData, setMessageData] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/home") // Update the API endpoint as needed
      .then((res) => {
        setDashboardData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        message.error("Failed to fetch dashboard data");
        console.error(error);
        setLoading(false);
      });

    axios
      .get("/home/message")
      .then((res) => {
        setMessageData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to fetch dashboard data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const userData = [
    { name: "Active Users", value: dashboardData.activeUsers },
    { name: "Inactive Users", value: dashboardData.inactiveUsers },
  ];

  const COLORS = ["#1f2937", "#9ca3af"];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Row gutter={[16, 16]}>
        <Col span={2}>
          <Card className="shadow-md hover:shadow-lg transition duration-300 bg-white">
            <Statistic title="Groups" value={dashboardData.groupsCount} />
          </Card>
        </Col>
        <Col span={2}>
          <Card className="shadow-md hover:shadow-lg transition duration-300 bg-white">
            <Statistic title="Series" value={dashboardData.seriesCount} />
          </Card>
        </Col>
        <Col span={2}>
          <Card className="shadow-md hover:shadow-lg transition duration-300 bg-white">
            <Statistic title="Subseries" value={dashboardData.subseriesCount} />
          </Card>
        </Col>
        <Col span={2}>
          <Card className="shadow-md hover:shadow-lg transition duration-300 bg-white">
            <Statistic title="Products" value={dashboardData.productsCount} />
          </Card>
        </Col>
        <Col span={2}>
          <Card className="shadow-md hover:shadow-lg transition duration-300 bg-white">
            <Statistic
              title="Specifications"
              value={dashboardData.specificationsCount}
            />
          </Card>
        </Col>
        <Col span={2}>
          <Card className="shadow-md hover:shadow-lg transition duration-300 bg-white">
            <Statistic title="M-Zone" value={dashboardData.mockupZoneCount} />
          </Card>
        </Col>

        <Col span={2}>
          <Card className="shadow-md hover:shadow-lg transition duration-300 bg-white">
            <Statistic title="R-Work" value={dashboardData.recentWorkCount} />
          </Card>
        </Col>

        <Col span={2}>
          <Card className="shadow-md hover:shadow-lg transition duration-300 bg-white">
            <Statistic title="Academy" value={dashboardData.academyCount} />
          </Card>
        </Col>

        <Col span={2}>
          <Card className="shadow-md hover:shadow-lg transition duration-300 bg-white">
            <Statistic
              title="RW-Img.."
              value={dashboardData.recentWorkImageCount}
            />
          </Card>
        </Col>
        <Col span={2}>
          <Card className="shadow-md hover:shadow-lg transition duration-300 bg-white">
            <Statistic
              title="RW-Vid.."
              value={dashboardData.recentWorkVideoCount}
            />
          </Card>
        </Col>
        <Col span={2}>
          <Card className="shadow-md hover:shadow-lg transition duration-300 bg-white">
            <Statistic
              title="MZ-Ima.."
              value={dashboardData.mockupZoneImageCount}
            />
          </Card>
        </Col>
        <Col span={2}>
          <Card className="shadow-md hover:shadow-lg transition duration-300 bg-white">
            <Statistic
              title="MZ-Vid.."
              value={dashboardData.mockupZoneVideoCount}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-4"></Row>

      <Row gutter={16} className="mt-4">
        <Col span={8}>
          <Card className="shadow-md hover:shadow-lg transition duration-300 bg-white">
            <h3 className="font-semibold text-lg">Total Messages</h3>
            <Statistic
              title="Total Messages"
              value={dashboardData.totalMessages}
            />
            <Progress
              percent={Math.round(
                (dashboardData.readMessages / dashboardData.totalMessages) * 100
              )}
              strokeColor="#1890ff"
            />
            <Statistic
              title="Unread Messages"
              value={Math.round(dashboardData.unreadMessages)}
              className="mt-2"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="shadow-md hover:shadow-lg transition duration-300 bg-white">
            <h3 className="font-semibold text-lg">Active vs Inactive Users</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={userData} dataKey="value" outerRadius={100} label>
                  {userData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="shadow-md hover:shadow-lg transition duration-300 bg-white">
            <h3 className="font-semibold text-lg">Message Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={messageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="messages" fill="#6b7280" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
