// src/App.js
import React from "react";
import UsersList from "./features/users/UsersList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavigateRoutes from "./NavigateRoutes";
import Layout from "./shared-components/Layout";

function App() {
  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <NavigateRoutes>
                <Layout />
              </NavigateRoutes>
            }
          >
            <Route path="/users" element={<UsersList />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
