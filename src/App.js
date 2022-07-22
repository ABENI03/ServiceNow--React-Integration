import Home from "./Components/Home";
import IncidentDetail from "./Components/incidentDetail";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NewIncident from "./Components/NewIncident";

function App() {
    return (
        <div className="App">

            <Router>

                <Routes>
                    <Route exact path="/" element={< Home />}></Route>
                    <Route path="/new" element={< NewIncident />}></Route>
                    <Route path="/:sys_id" element={< IncidentDetail />}></Route>

                </Routes>

            </Router>
        </div>
    );
}

export default App;
