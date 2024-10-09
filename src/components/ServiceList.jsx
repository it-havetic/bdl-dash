import { PlayCircleOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import React, { useContext } from "react";
import { ServicesContext } from "../context/ServicesContext";

const ServiceList = () => {
  const { services } = useContext(ServicesContext);
  console.log(services);
  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={
        <img
          alt="thumbnail"
          src={`${import.meta.env.VITE_URL}${services[0]?.video?.thumbnail}`}
          style={{ height: 180, objectFit: "cover" }}
        />
      }
    >
      <Card.Meta title={services[0]?.name} />
      <Button
        type="primary"
        icon={<PlayCircleOutlined />}
        style={{ marginTop: 16, width: "100%" }}
        onClick={() =>
          window.open(
            `${import.meta.env.VITE_URL}${services[0].video.url}`,
            "_blank"
          )
        }
      >
        Play Video
      </Button>
    </Card>
  );
};

export default ServiceList;
