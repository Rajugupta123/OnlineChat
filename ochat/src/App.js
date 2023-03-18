import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Join from "./component/Join/Join";
import Chat from "./component/Chat/Chat";
import './App.css';


const App = ()=>{
  return(
    <div>
      <Router>
      <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/chat" element={<Chat />} />
      </Routes>
      </Router>
    </div>
  );
}
export default App;
