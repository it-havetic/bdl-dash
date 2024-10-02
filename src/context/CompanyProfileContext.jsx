import { notification } from "antd";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import axios from "../axios";

export const CompanyProfileContext = createContext();

const CompanyProfileContextProvider = ({ children }) => {
  const [companyProfile, setCompanyProfile] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCompanyProfile();
  }, []);

  const getAllCompanyProfile = async () => {
    try {
      const response = await axios.get("/profiles");
      if (response.status === 200) {
        setCompanyProfile();
        setCompanyProfile(response.data);
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

  const createCompanyProfile = async (data, config) => {
    setLoading(true);
    try {
      const response = await axios.post("/profiles", data, config);
      if (response.status === 201) {
        notification.success({
          duration: 2,
          message: "Company Profile created successfully",
        });
        getAllCompanyProfile();
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

  const updateCompanyProfile = async (id, data, config) => {
    setLoading(true);
    try {
      const response = await axios.patch(`/profiles/${id}`, data, config);
      if (response.status === 200) {
        notification.success({
          duration: 2,
          message: "Company Profile updated successfully",
        });
        getAllCompanyProfile();
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

  const deleteCompanyProfile = async (id) => {
    try {
      const response = await axios.delete(`/profiles/${id}`);
      if (response.status === 200) {
        notification.success({
          duration: 2,
          message: "Company Profile deleted successfully",
        });
        getAllCompanyProfile();
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
    <CompanyProfileContext.Provider
      value={{
        companyProfile,
        loading,
        createCompanyProfile,
        updateCompanyProfile,
        deleteCompanyProfile,
        getAllCompanyProfile,
      }}
    >
      {children}
    </CompanyProfileContext.Provider>
  );
};

export default CompanyProfileContextProvider;

CompanyProfileContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
