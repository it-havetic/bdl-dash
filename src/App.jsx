import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BlogSubmission from "./components/BlogSubmission";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Testimonium from "./components/Testimonium";
import Products from "./pages/Products";

import AuthContextProvider from "./context/AuthContext";
import { GreetingContextProvider } from "./context/GreetingContext";
import MockupZoneContextProvider from "./context/MockupZoneContex";
import ProductContextProvider from "./context/ProductContext";
import { RecentWorksContextProvider } from "./context/RecentWorksContext";
import SpecificationContextProvider from "./context/SpecificationContext";
import Greeting from "./pages/Greeting";
import GroupSeriesSubSeriesPage from "./pages/GroupSeriesSubSeriesPage";
import Login from "./pages/Login";
import MockupZone from "./pages/MockupZone";
import RecentWorks from "./pages/RecentWorks";
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
            <Route path="/testimonium" element={<Testimonium />} />
            <Route path="/blog-submission" element={<BlogSubmission />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
