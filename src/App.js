
import './App.css';

import {  Navbar } from './components';
import { Footer } from './containers';
import { Home } from './pages'
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/bootstrap.scss';

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
        <Home />
      </div>
        <Footer />
    </div>
  );
}

export default App;
