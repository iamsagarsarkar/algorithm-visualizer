import {Link} from 'react-router-dom'

const Navbar =()=>{
    return(
       <nav className="navbar">
           <h1>Algoritm Visualizer</h1>
           <div className='links'>
           <Link to="/">SortingVisualizer</Link>
           <Link to="/SearchingVisualizer">SearchingVisualizer</Link>
           <Link to="/PathfinderVisualizer">PathfinderVisualizer</Link>
           </div>
       </nav>
    );
}

export default Navbar;
