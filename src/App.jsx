import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BlogSubmission from "./components/BlogSubmission";
import Greeting from "./components/Greeting";
import Home from "./components/Home";
import Layout from "./components/Layout";
import RecentWork from "./components/RecentWork";
import Testimonium from "./components/Testimonium";
import Products from "./pages/Products";

import AuthContextProvider from "./context/AuthContext";
import MockupZoneContextProvider from "./context/MockupZoneContex";
import ProductContextProvider from "./context/ProductContext";
import SpecificationContextProvider from "./context/SpecificationContext";
import GroupSeriesSubSeriesPage from "./pages/GroupSeriesSubSeriesPage";
import Login from "./pages/Login";
import MockupZone from "./pages/MockupZone";
import Specification from "./pages/Specification";

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
            <Route path="/recent-work" element={<RecentWork />} />
            <Route path="/greeting" element={<Greeting />} />
            <Route path="/testimonium" element={<Testimonium />} />
            <Route path="/blog-submission" element={<BlogSubmission />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
