import { notification } from "antd";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import axios from "../axios";

export const ServicesContext = createContext();

const ServicesContextProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/services");
      if (response.status === 200) {
        console.log("from context", response.data);
        setServices(response.data);
      }
    } catch (error) {
      console.error(error.message);
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  const createService = async (values, config) => {
    setLoading(true);
    try {
      const res = await axios.post("/services", values, config);
      if (res.status === 201) {
        fetchAllServices();
        notification.success({
          duration: 2,
          message: "Service created successfully!",
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(error.message);
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServicesContext.Provider
      value={{
        services,
        loading,
        fetchAllServices,
        createService,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesContextProvider;

ServicesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
