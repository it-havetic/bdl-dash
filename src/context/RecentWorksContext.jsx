//create Recent works Context
import { notification } from "antd";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import axios from "../axios";

export const RecentWorksContext = createContext();

export const RecentWorksContextProvider = ({ children }) => {
  const [recentWorks, setRecentWorks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRecentWorks();
  }, []);

  /**
   * Fetches recent works from the server
   * @returns {Promise<void>}
   */
  const getRecentWorks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/recent-works");
      if (response.status === 200) {
        setLoading(false);
        setRecentWorks(response.data);
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: error.message });
    }
  };

  /**
   * Creates a new recent work
   * @param {object} data - Object with the new recent work data
   * @param {object} config - Request configuration object
   * @returns {Promise<void>}
   */
  const createRecentWork = async (data, config) => {
    setLoading(true);
    try {
      const response = await axios.post("/recent-works", data, config);
      if (response.status === 201) {
        getRecentWorks();
        notification.success({ message: "Recent work created successfully!" });
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates a recent work
   * Makes a PATCH request to the server to update a recent work.
   * @param {string} id - The id of the recent work to update.
   * @param {object} data - Object with the new recent work data.
   * @param {object} config - Request configuration object.
   * @returns {Promise} - A promise of the request.
   */
  const updateRecentWork = async (id, data, config) => {
    setLoading(true);
    try {
      const response = await axios.patch(`/recent-works/${id}`, data, config);
      if (response.status === 200) {
        getRecentWorks();
        notification.success({ message: "Recent work updated successfully!" });
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deletes a recent work.
   * Makes a DELETE request to the server to delete a recent work.
   * @param {string} id - The id of the recent work to delete.
   * @returns {Promise} - A promise of the request.
   */
  const deleteRecentWork = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/recent-works/${id}`);
      if (response.status === 200) {
        getRecentWorks();
        notification.success({ message: "Recent work deleted successfully!" });
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <RecentWorksContext.Provider
      value={{
        recentWorks,
        setRecentWorks,
        createRecentWork,
        updateRecentWork,
        deleteRecentWork,
        loading,
      }}
    >
      {children}
    </RecentWorksContext.Provider>
  );
};

export default RecentWorksContext;

RecentWorksContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
