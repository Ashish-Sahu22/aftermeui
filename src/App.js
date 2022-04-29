import './App.css';
import Routing from './components/Routing/Routing';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


toast.configure()
function App() {
  return (
    <div className="App">
      <Routing/>
    </div>
  );
}

export default App;