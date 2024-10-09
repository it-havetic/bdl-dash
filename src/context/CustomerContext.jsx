import { createContext, useEffect, useState } from "react";

import { notification } from "antd";
import PropTypes from "prop-types";
import axios from "../axios";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCustomers();
  }, []);

  const getAllCustomers = async () => {
    try {
      const res = await axios.get("/customers");

      if (res.status === 200) {
        setCustomer(res.data);
        console.log(res.data);
      }
    } catch (error) {
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    }
  };

  const createCustomer = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post("/customers", values);
      if (res.status === 201) {
        notification.success({
          duration: 2,
          message: "Customer created successfully!",
        });
        getAllCustomers();
        setLoading(false);
      }
    } catch (error) {
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    }
  };

  const updateCustomer = async (id, values) => {
    try {
      const res = await axios.patch(`/customers/${id}`, values);
      if (res.status === 200) {
        notification.success({
          duration: 2,
          message: "Customer updated successfully!",
        });
        getAllCustomers();
      }
    } catch (error) {
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const res = await axios.delete(`/customers/${id}`);
      if (res.status === 200) {
        notification.success({
          duration: 2,
          message: "Customer deleted successfully!",
        });
        getAllCustomers();
      }
    } catch (error) {
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
        loading,
        createCustomer,
        updateCustomer,
        deleteCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
export default CustomerContext;

CustomerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
