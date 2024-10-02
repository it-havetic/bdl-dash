import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Products from "./pages/Products";

import AcademyContextProvider from "./context/AcademyContext";
import AuthContextProvider from "./context/AuthContext";
import CompanyProfileContextProvider from "./context/CompanyProfileContext";
import { GreetingContextProvider } from "./context/GreetingContext";
import MockupZoneContextProvider from "./context/MockupZoneContex";
import ProductContextProvider from "./context/ProductContext";
import { RecentWorksContextProvider } from "./context/RecentWorksContext";
import SpecificationContextProvider from "./context/SpecificationContext";
import Academy from "./pages/Academy";
import CompanyProfile from "./pages/CompanyProfile";
import Contacts from "./pages/Contacts";
import Greeting from "./pages/Greeting";
import GroupSeriesSubSeriesPage from "./pages/GroupSeriesSubSeriesPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MockupZone from "./pages/MockupZone";
import RecentWorks from "./pages/RecentWorks";
import Specification from "./pages/Specification";
import UserManagement from "./pages/UserManagement";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          {/* Separate the login route outside of the Layout */}
          <Route path="/login" element={<Login />} />

          {/* Wrap all the other routes inside the Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/groups-series-subseries"
              element={<GroupSeriesSubSeriesPage />}
            />
            <Route
              path="/products"
              element={
                <ProductContextProvider>
                  <Products />
                </ProductContextProvider>
              }
            />
            <Route
              path="/specifications"
              element={
                <SpecificationContextProvider>
                  <Specification />
                </SpecificationContextProvider>
              }
            />
            <Route
              path="/mockup-zone"
              element={
                <MockupZoneContextProvider>
                  <MockupZone />
                </MockupZoneContextProvider>
              }
            />
            <Route
              path="/recent-work"
              element={
                <RecentWorksContextProvider>
                  <RecentWorks />
                </RecentWorksContextProvider>
              }
            />
            <Route
              path="/greeting"
              element={
                <GreetingContextProvider>
                  <Greeting />
                </GreetingContextProvider>
              }
            />
            {/* <Route path="/testimonium" element={<Testimonium />} /> */}
            <Route
              path="/academy"
              element={
                <AcademyContextProvider>
                  <Academy />
                </AcademyContextProvider>
              }
            />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/user-mangement" element={<UserManagement />} />
            <Route
              path="/profile"
              element={
                <CompanyProfileContextProvider>
                  <CompanyProfile />
                </CompanyProfileContextProvider>
              }
            />
          </Route>
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
