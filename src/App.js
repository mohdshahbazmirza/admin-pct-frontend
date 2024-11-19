import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ActivityForm from "./ActivityForm";
import EditActivityForm from "./ActivityEdit";
import ActivityList from "./AllActivity";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/activities" element={<ActivityForm />} />
        <Route path="/list" element={<ActivityList />} />
        <Route path="/edit-activity/:id" element={<EditActivityForm />} />
      </Routes>
    </Router>
  );
};

export default App;
