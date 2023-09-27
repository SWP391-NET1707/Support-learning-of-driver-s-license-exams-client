
import './App.css';

import { About, Navbar } from './components';
import { Footer } from './containers';
import 'bootstrap/dist/css/bootstrap.min.css';

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
