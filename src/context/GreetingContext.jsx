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
      notification.error({ message: "Failed to fetch greeting" });
    }
  };

  const createGreeting = async (data, config) => {
    setLoading(true);
    try {
      const response = await axios.post("/greeting", data, config);
      if (response.status === 201) {
        fetchGreeting();
        notification.success({
          message: "Greeting created successfully!",
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: "Failed to create greeting" });
    }
  };

  const updateGreeting = async (id, data) => {
    setLoading(true);
    try {
      const response = await axios.patch(`/greeting/${id}`, data);
      if (response.status === 200) {
        fetchGreeting();
        notification.success({
          message: "Greeting updated successfully!",
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: "Failed to update greeting" });
    }
  };

  const deleteGreeting = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/greeting/${id}`);
      if (response.status === 200) {
        notification.success({
          message: "Greeting deleted successfully!",
        });
        fetchGreeting();
        setLoading(false);
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: "Failed to delete greeting" });
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
