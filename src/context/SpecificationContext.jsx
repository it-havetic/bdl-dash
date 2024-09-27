import { notification } from "antd";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import axios from "../axios";

export const SpecificationContext = createContext();

const SpecificationContextProvider = ({ children }) => {
  const [specifications, setSpecifications] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSpecification();
  }, []);

  const getSpecification = () => {
    try {
      const response = axios.get(`/specifications`);
      if (response.status === 200) {
        setSpecifications(response.data);
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: "Failed to fetch specifications" });
    }
  };

  const createSpecification = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`/specifications`, data);
      if (response.status === 201) {
        getSpecification();
        notification.success({
          message: "Specification created successfully!",
        });
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const updateSpecification = async (id, data) => {
    setLoading(true);
    try {
      const response = await axios.patch(`/specifications/${id}`, data);
      if (response.status === 200) {
        getSpecification();
        notification.success({
          message: "Specification updated successfully!",
        });
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const deleteSpecification = async (id) => {
    try {
      const response = await axios.delete(`/specifications/${id}`);
      if (response.status === 200) {
        getSpecification();
        notification.success({
          message: "Specification deleted successfully!",
        });
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: error.message });
    }
  };

  return (
    <SpecificationContext.Provider
      value={{
        specifications,
        loading,
        createSpecification,
        updateSpecification,
        deleteSpecification,
      }}
    >
      {children}
    </SpecificationContext.Provider>
  );
};

export default SpecificationContextProvider;

SpecificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};