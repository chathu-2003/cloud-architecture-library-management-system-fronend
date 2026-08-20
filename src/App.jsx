import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Members from "./pages/Members";
import Borrow from "./pages/Borrow";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/books" element={<Books />} />

        <Route path="/members" element={<Members />} />

        <Route path="/borrow" element={<Borrow />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;