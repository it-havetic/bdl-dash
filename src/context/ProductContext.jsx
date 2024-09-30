import { notification } from "antd";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import axios from "../axios";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/products");
      if (response.status === 200) {
        setProducts(response.data);
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

  const createProduct = async (data, config) => {
    setLoading(true);
    try {
      const response = await axios.post("/products", data, config);
      if (response.status === 201) {
        setProducts([...products, response.data]);
        notification.success({
          duration: 2,
          message: "Product created successfully!",
        });
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

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`/products/${id}`);
      if (response.status === 200) {
        fetchProducts();
        setProducts(products.filter((product) => product._id !== id));
        notification.success({
          duration: 2,
          message: "Product deleted successfully!",
        });
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

  const updateProduct = async (id, data) => {
    try {
      const response = await axios.patch(`/products/${id}`, data);
      if (response.status === 200) {
        fetchProducts();
        notification.success({
          duration: 2,
          message: "Product updated successfully!",
        });
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
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        fetchProducts,
        deleteProduct,
        updateProduct,
        createProduct,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;

ProductContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
