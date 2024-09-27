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
      notification.error({ message: "Failed to fetch products" });
    }
  };

  const createProduct = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/products", data);
      if (response.status === 201) {
        setProducts([...products, response.data]);
        notification.success({ message: "Product created successfully!" });
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: "Failed to create product" });
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
        notification.success({ message: "Product deleted successfully!" });
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: "Failed to delete product" });
    }
  };

  const updateProduct = async (id, data) => {
    try {
      const response = await axios.patch(`/products/${id}`, data);
      if (response.status === 200) {
        fetchProducts();
        notification.success({ message: "Product updated successfully!" });
      }
    } catch (error) {
      console.error(error.message);
      notification.error({ message: "Failed to update product" });
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
