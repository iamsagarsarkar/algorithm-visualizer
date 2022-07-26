import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

import PathfinderVisualizer from './PathfinderVisualizer/PathfinderVisualizer';
import SearchingVisualizer from './SearchingVisualizer/SearchingVisualizer';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <div className="content">
        <Routes>
        <Route exact path="/algorithm-visualizer" element={<SortingVisualizer/>} />
        <Route path="/SearchingVisualizer" element={<SearchingVisualizer/>} />
        <Route  path="/PathfinderVisualizer" element={<PathfinderVisualizer/>}/>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
