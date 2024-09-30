import { Modal, notification } from "antd";
import PropTypes from "prop-types";
import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  const loginUser = async (data) => {
    try {
      const res = await customAxios.post("/users/login", data);
      console.log(res.data);
      if (res.status === 200) {
        if (res.data.role === "admin") {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          notification.success({ message: "Login Successful" });
          navigate("/");
        } else {
          Modal.error({
            title: "Error",
            content: (
              <p className="font-mono text-lg mb-3">
                You are not authorized to access this Site.
              </p>
            ),
            onOk: () => navigate("/login"),
          });
        }
      }
    } catch (error) {
      notification.error({ message: "Error while logging in." });
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("userInfo");
    // Trigger the redirect immediately on logout
    navigate("/login");
  };

  // This effect listens for changes in localStorage and redirects to login if userInfo is removed
  useEffect(() => {
    const handleStorageChange = () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Check on mount if userInfo is missing
    if (!userInfo) {
      navigate("/login");
    }

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate, userInfo]);

  return (
    <AuthContext.Provider value={{ loginUser, userInfo, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
