import { notification } from "antd";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import axios from "../axios";

export const MockupZoneContext = createContext();

export const MockupZoneContextProvider = ({ children }) => {
  const [mockupZone, setMockupZone] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMockupZone();
  }, []);

  /**
   * Creates a new mockup zone.
   *
   * Makes a POST request to the server to create a new mockup zone.
   *
   * @param {object} data - Object with the new mockup zone data.
   * @param {object} config - Request configuration object.
   * @returns {Promise} - A promise of the request.
   */
  const createMockupZone = async (data, config) => {
    setLoading(true);
    try {
      const response = await axios.post("/mockup-zones", data, config);
      if (response.status === 201) {
        setMockupZone([...mockupZone, response.data]);
        notification.success({ message: "MockupZone created successfully!" });
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: "Failed to create MockupZone" });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches the mockup zones from the server.
   *
   * Makes a GET request to the server to fetch the mockup zones.
   *
   * @returns {Promise} - A promise of the request.
   */
  const fetchMockupZone = async () => {
    try {
      const response = await axios.get("/mockup-zones");
      if (response.status === 200) {
        setMockupZone(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  /**
   * Deletes a mockup zone.
   *
   * Makes a DELETE request to the server to delete a mockup zone.
   *
   * @param {string} id - The id of the mockup zone to delete.
   * @returns {Promise} - A promise of the request.
   */
  const deleteMockupZone = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/mockup-zones/${id}`);
      if (response.status === 200) {
        fetchMockupZone();
        notification.success({ message: "MockupZone deleted successfully!" });
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: "Failed to delete MockupZone" });
    } finally {
      setLoading(false);
    }
  };
  /**
   * Updates a mockup zone.
   *
   * Makes a PATCH request to the server to update a mockup zone.
   *
   * @param {string} id - The id of the mockup zone to update.
   * @param {Object} data - The data to be updated.
   * @param {Object} config - The config of the request.
   * @returns {Promise} - A promise of the request.
   */
  const updateMockupZone = async (id, data, config) => {
    setLoading(true);
    try {
      const response = await axios.patch(`/mockup-zones/${id}`, data, config);
      if (response.status === 200) {
        fetchMockupZone();
        notification.success({ message: "MockupZone updated successfully!" });
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: "Failed to update MockupZone" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MockupZoneContext.Provider
      value={{
        mockupZone,
        setMockupZone,
        createMockupZone,
        loading,
        deleteMockupZone,
        updateMockupZone,
      }}
    >
      {children}
    </MockupZoneContext.Provider>
  );
};
export default MockupZoneContextProvider;

MockupZoneContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
