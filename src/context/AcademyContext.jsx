import { notification } from "antd";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import axios from "../axios";

export const AcademyContext = createContext();

const AcademyContextProvider = ({ children }) => {
  const [academy, setAcademy] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAcademy();
  }, []);
  const getAcademy = async () => {
    try {
      const response = await axios.get(`/academys`);
      if (response.status === 200) {
        setAcademy(response.data);
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: error.message });
    }
  };

  const createAcademy = async (values, config) => {
    setLoading(true);
    try {
      const response = await axios.post(`/academys`, values, config);
      if (response.status === 201) {
        notification.success({ message: "Academy created successfully" });
        getAcademy();
        setLoading(false);
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: error.message });
    }
  };

  const updateAcademy = async (id, values, config) => {
    setLoading(true);
    try {
      const response = await axios.patch(`/academys/${id}`, values, config);
      if (response.status === 200) {
        getAcademy();
        notification.success({ message: "Academy updated successfully" });
        setLoading(false);
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: error.message });
    }
  };

  const deleteAcademy = async (id) => {
    try {
      const response = await axios.delete(`/academys/${id}`);
      if (response.status === 200) {
        getAcademy();
        notification.success({ message: "Academy deleted successfully" });
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: error.message });
    }
  };

  return (
    <AcademyContext.Provider
      value={{
        academy,
        loading,
        getAcademy,
        createAcademy,
        updateAcademy,
        deleteAcademy,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export default AcademyContextProvider;

AcademyContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
