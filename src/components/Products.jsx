import React, { useState } from "react";
import ProductUploadForm from "./ProductUploadForm";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product, idx) =>
      idx === editingProduct.index ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
  };

  const handleEditProduct = (index) => {
    setEditingProduct({ ...products[index], index });
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, idx) => idx !== index);
    setProducts(updatedProducts);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.productItemCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-full h-full overflow-y-scroll mx-auto p-6  shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Products</h1>
      <ProductUploadForm
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
      />
      <h1 className="text-2xl font-bold mb-4 mt-10 text-gray-700">
        Products list
      </h1>
      <input
        type="text"
        placeholder="Search by Item Code"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 w-full border rounded-md "
      />
      <ProductTable
        products={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div>
      
      <table className="min-w-full bg-white mt-4 px-10">
        <thead>
          <tr className="">
            <th className="py-2 pl-2 text-left">Item Code</th>
            <th className="py-2 text-left">Images</th>
            <th className="py-2 text-left">Price</th>
            <th className="py-2 pr-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="py-2 text-left">{product.productItemCode}</td>
              <td className="py-2  text-left">{product.productImages}</td>
              <td className="py-2  text-left">{product.productSellingPrice}</td>
              <td className="py-2  text-right">
                <button
                  className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
                  onClick={() => onEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => onDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
