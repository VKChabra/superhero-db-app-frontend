import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SuperheroList from "./components/SuperheroList";
import SuperheroForm from "./components/SuperheroForm";
import SuperheroDetails from "./components/SuperheroDetails";
import Navigation from "./components/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/superheroes" element={<SuperheroList />} />
          <Route path="/create" element={<SuperheroForm />} />
          <Route path="/superhero/:id" element={<SuperheroDetails />} />
          <Route path="*" element={<SuperheroList />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
