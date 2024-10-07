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

  const createService = async (data, config) => {
    setLoading(true);
    try {
      const response = await axios.post("/services", data, config);
      if (response.status === 201) {
        notification.success({
          duration: 2,
          message: "Service created successfully!",
        });
        fetchAllServices();
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

  //update service
  const updateService = async (id, data, config) => {
    setLoading(true);
    try {
      const response = await axios.patch(`/services/${id}`, data, config);
      if (response.status === 200) {
        notification.success({
          duration: 2,
          message: "Service updated successfully!",
        });
        fetchAllServices();
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

  //delete service
  const deleteService = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/services/${id}`);
      if (response.status === 200) {
        notification.success({
          duration: 2,
          message: "Service deleted successfully!",
        });
        fetchAllServices();
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
        updateService,
        deleteService,
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
