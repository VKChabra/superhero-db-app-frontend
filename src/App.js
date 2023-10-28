import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SuperheroList from "./components/SuperheroList";
import SuperheroForm from "./components/SuperheroForm";
import SuperheroDetails from "./components/SuperheroDetails";
import Navigation from "./components/Navigation";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<SuperheroList />} />
          <Route path="/create" element={<SuperheroForm />} />
          <Route path="/superhero/:id" element={<SuperheroDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
