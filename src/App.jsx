import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddInstallation from "./pages/AddInstallation";
import Records from "./pages/Records";
import QRScanner from "./pages/QRScanner";
import InstallationDetails from "./pages/InstallationDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/add-installation"
          element={<AddInstallation />}
        />

        <Route
          path="/records"
          element={<Records />}
        />

        <Route
          path="/scanner"
          element={<QRScanner />}
        />

        <Route
          path="/installation/:id"
          element={<InstallationDetails />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;