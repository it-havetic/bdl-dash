//create Greeting context
import { notification } from "antd";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import axios from "../axios";

export const GreetingContext = createContext();

export const GreetingContextProvider = ({ children }) => {
  const [greeting, setGreeting] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGreeting();
  }, []);

  const fetchGreeting = async () => {
    try {
      const response = await axios.get("/greeting");
      if (response.status === 200) {
        setGreeting(response.data);
      }
    } catch (error) {
      console.error(error.message);
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    }
  };

  const createGreeting = async (data, config) => {
    setLoading(true);
    try {
      const response = await axios.post("/greeting", data, config);
      if (response.status === 201) {
        fetchGreeting();
        notification.success({
          duration: 2,
          message: "Greeting created successfully!",
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
    }
  };

  const updateGreeting = async (id, data) => {
    setLoading(true);
    try {
      const response = await axios.patch(`/greeting/${id}`, data);
      if (response.status === 200) {
        fetchGreeting();
        notification.success({
          duration: 2,
          message: "Greeting updated successfully!",
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
    }
  };

  const deleteGreeting = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/greeting/${id}`);
      if (response.status === 200) {
        notification.success({
          duration: 2,
          message: "Greeting deleted successfully!",
        });
        fetchGreeting();
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
    }
  };

  return (
    <GreetingContext.Provider
      value={{
        greeting,
        createGreeting,
        updateGreeting,
        deleteGreeting,
        loading,
      }}
    >
      {children}
    </GreetingContext.Provider>
  );
};

export default GreetingContext;

GreetingContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
