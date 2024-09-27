// import React, { useState } from "react";

// const ProductUploadForm = () => {
//   const [formData, setFormData] = useState({
//     productItemCode: "",
//     productImages: "",
//     productSellingPrice: "",
//     productSNote: "",
//     productCatagory: "",
//     productTypeOne: "",
//     productTypeTwo: "",
//     productIpList: "",
//     productUnitList: "",
//     productIn_Volt: "",
//     productOut_Volt: "",
//     productWatts: "",
//     productAH_MAH: "",
//     productPF: "",
//     productCct: "",
//     productBeamAngle: "",
//     productReflectorType: "",
//     productDimming: "",
//     productCapacity: "",
//     productDIMLHW: "",
//     productCutOff: "",
//     productB_Finish: "",
//     productBRatedW: "",
//     ProductTA: "",
//     productTa: "",
//     productTHD: "",
//     productPaking: "",
//     productMF_LABLE: "",
//     productMaxvolt: "",
//     productWeight: "",
//     productVol_CBM: "",
//     productFOB_UP1: "",
//     productFOB_UP2: "",
//     productFOB_UP3: "",
//     productLCTK1: "",
//     productLCTK2: "",
//     productLCTK3: "",
//     productOthers: "",
//   });

//   const [errors, setErrors] = useState({});

//   // List of required fields
//   const requiredFields = [
//     "productItemCode",
//     "productCatagory",
//     "productTypeOne",
//     "productTypeTwo",
//     "productIpList",
//     "productUnitList",
//     "productCct",
//     "productBeamAngle",
//     "productReflectorType",
//     "productDimming",
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     requiredFields.forEach((key) => {
//       if (!formData[key]) {
//         newErrors[key] = "This field is required";
//       }
//     });
//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       setErrors({});
//       // Handle form submission logic here
//       console.log(formData);
//     }
//   };

//   const renderInputField = (key) => {
//     const isNumberField =
//       key === "productSellingPrice" ||
//       key.includes("Volt") ||
//       key.includes("Watts") ||
//       key.includes("AH_MAH") ||
//       key.includes("PF") ||
//       key.includes("Capacity") ||
//       key.includes("DIMLHW") ||
//       key.includes("CutOff") ||
//       key.includes("B_Finish") ||
//       key.includes("BRatedW") ||
//       key.includes("TA") ||
//       key.includes("THD") ||
//       key.includes("Paking") ||
//       key.includes("Maxvolt") ||
//       key.includes("Weight") ||
//       key.includes("Vol_CBM");

//     return (
//       <div className="mb-4" key={key}>
//         <label className="block text-sm font-medium text-gray-700 capitalize">
//           {key.replace(/_/g, " ")}
//         </label>
//         <input
//           type={isNumberField ? "number" : "text"}
//           name={key}
//           value={formData[key]}
//           onChange={handleChange}
//           className={`mt-1 block w-full p-2 border ${
//             errors[key] ? "border-red-500" : "border-gray-300"
//           } rounded-md shadow-sm`}
//         />
//         {errors[key] && (
//           <span className="text-red-500 text-sm">{errors[key]}</span>
//         )}
//       </div>
//     );
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded"
//     >
//       <h2 className="text-2xl mb-4">Product Entry Form</h2>
//       <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-3">
//         {Object.keys(formData).map((key) => renderInputField(key))}
//       </div>
//       <button
//         type="submit"
//         className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default ProductUploadForm;


import React, { useState, useEffect } from "react";

const ProductUploadForm = ({ onSubmit, editingProduct, setEditingProduct }) => {
  const [formData, setFormData] = useState({
    productItemCode: "",
    productImages: "",
    productSellingPrice: "",
    productSNote: "",
    productCatagory: "",
    productTypeOne: "",
    productTypeTwo: "",
    productIpList: "",
    productUnitList: "",
    productIn_Volt: "",
    productOut_Volt: "",
    productWatts: "",
    productAH_MAH: "",
    productPF: "",
    productCct: "",
    productBeamAngle: "",
    productReflectorType: "",
    productDimming: "",
    productCapacity: "",
    productDIMLHW: "",
    productCutOff: "",
    productB_Finish: "",
    productBRatedW: "",
    ProductTA: "",
    productTa: "",
    productTHD: "",
    productPaking: "",
    productMF_LABLE: "",
    productMaxvolt: "",
    productWeight: "",
    productVol_CBM: "",
    productFOB_UP1: "",
    productFOB_UP2: "",
    productFOB_UP3: "",
    productLCTK1: "",
    productLCTK2: "",
    productLCTK3: "",
    productOthers: "",
  });

  const [errors, setErrors] = useState({});

  const requiredFields = [
    "productItemCode",
    "productCatagory",
    "productTypeOne",
    "productTypeTwo",
    "productIpList",
    "productUnitList",
    "productCct",
    "productBeamAngle",
    "productReflectorType",
    "productDimming",
  ];

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData({
        productItemCode: "",
        productImages: "",
        productSellingPrice: "",
        productSNote: "",
        productCatagory: "",
        productTypeOne: "",
        productTypeTwo: "",
        productIpList: "",
        productUnitList: "",
        productIn_Volt: "",
        productOut_Volt: "",
        productWatts: "",
        productAH_MAH: "",
        productPF: "",
        productCct: "",
        productBeamAngle: "",
        productReflectorType: "",
        productDimming: "",
        productCapacity: "",
        productDIMLHW: "",
        productCutOff: "",
        productB_Finish: "",
        productBRatedW: "",
        ProductTA: "",
        productTa: "",
        productTHD: "",
        productPaking: "",
        productMF_LABLE: "",
        productMaxvolt: "",
        productWeight: "",
        productVol_CBM: "",
        productFOB_UP1: "",
        productFOB_UP2: "",
        productFOB_UP3: "",
        productLCTK1: "",
        productLCTK2: "",
        productLCTK3: "",
        productOthers: "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    requiredFields.forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onSubmit(formData);
      setEditingProduct(null); // Reset editing product after submission
    }
  };

  const renderInputField = (key) => {
    const isNumberField =
      key === "productSellingPrice" ||
      key.includes("Volt") ||
      key.includes("Watts") ||
      key.includes("AH_MAH") ||
      key.includes("PF") ||
      key.includes("Capacity") ||
      key.includes("DIMLHW") ||
      key.includes("CutOff") ||
      key.includes("B_Finish") ||
      key.includes("BRatedW") ||
      key.includes("TA") ||
      key.includes("THD") ||
      key.includes("Paking") ||
      key.includes("Maxvolt") ||
      key.includes("Weight") ||
      key.includes("Vol_CBM");

    return (
      <div className="mb-4" key={key}>
        <label className="block text-sm font-medium text-gray-700 capitalize">
          {key.replace(/_/g, " ")}
        </label>
        <input
          type={isNumberField ? "number" : "text"}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          className={`mt-1 block w-full p-2 border ${
            errors[key] ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm`}
        />
        {errors[key] && (
          <span className="text-red-500 text-sm">{errors[key]}</span>
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full mx-auto p-6 bg-white shadow-md rounded"
    >
      <h2 className="text-4xl mb-7 font-bold text-gray-700">
        {editingProduct ? "Edit Product" : "Product Entry Form"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-x-3">
        {Object.keys(formData).map((key) => renderInputField(key))}
      </div>
        <button
          type="submit"
          className="w-full py-4 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
        >
          {editingProduct ? "Update" : "Submit"}
        </button>
    </form>
  );
};

export default ProductUploadForm;

