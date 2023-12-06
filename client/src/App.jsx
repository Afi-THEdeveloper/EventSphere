import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./utils/AppRoutes";

function App() {
  return (
    <div>
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;