// import React from "react";
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="h-screen w-64 bg-gray-800 text-white">
//       <div className="p-4">
//         <h2 className="text-xl font-bold">Dashboard</h2>
//       </div>
//       <nav className="mt-8">
//         <ul>
//           <li>
//             <NavLink
//               to="/"
//               end
//               className={({ isActive }) =>
//                 `block py-2.5 px-4 rounded transition duration-200 ${
//                   isActive ? "bg-gray-700" : "hover:bg-gray-700"
//                 }`
//               }
//             >
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/upload"
//               className={({ isActive }) =>
//                 `block py-2.5 px-4 rounded transition duration-200 ${
//                   isActive ? "bg-gray-700" : "hover:bg-gray-700"
//                 }`
//               }
//             >
//               Upload Product
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/products"
//               className={({ isActive }) =>
//                 `block py-2.5 px-4 rounded transition duration-200 ${
//                   isActive ? "bg-gray-700" : "hover:bg-gray-700"
//                 }`
//               }
//             >
//               Products
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/analytics"
//               className={({ isActive }) =>
//                 `block py-2.5 px-4 rounded transition duration-200 ${
//                   isActive ? "bg-gray-700" : "hover:bg-gray-700"
//                 }`
//               }
//             >
//               Analytics
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>
      <nav className="mt-8">
        <ul>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/groups-series-subseries"
              end
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              Groups, Series and Subseries
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              Products Upload
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/specifications"
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              Specifications
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mockup-zone"
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              Mockup Zone
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recent-work"
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              Recent Work
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/greeting"
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              Greeting
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/academy"
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              Academy
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user-mangement"
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              User Mangement
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              Contacts
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
