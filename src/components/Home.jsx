// import React, { useState } from "react";

// const Home = () => {
//   const [productName, setProductName] = useState("");
//   const [productDescription, setProductDescription] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productImage, setProductImage] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log({
//       productName,
//       productDescription,
//       productPrice,
//       productImage,
//     });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto p-6 bg-white shadow-md rounded"
//     >
//       <h2 className="text-2xl mb-4">Upload Product</h2>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">
//           Product Name
//         </label>
//         <input
//           type="text"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">
//           Product Description
//         </label>
//         <textarea
//           value={productDescription}
//           onChange={(e) => setProductDescription(e.target.value)}
//           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//           required
//         ></textarea>
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">
//           Product Price
//         </label>
//         <input
//           type="number"
//           value={productPrice}
//           onChange={(e) => setProductPrice(e.target.value)}
//           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">
//           Product Image
//         </label>
//         <input
//           type="file"
//           onChange={(e) => setProductImage(e.target.files[0])}
//           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
//       >
//         Upload Product
//       </button>
//     </form>
//   );
// };

// export default Home;

import React from "react";

const Home = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Home</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
};

export default Home;
