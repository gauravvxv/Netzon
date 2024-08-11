import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Movies from "./pages/Movies"
import { ThemeProvider } from './theme/themeContext';

function App() {

  
  return (
    <div className="App">
      <ThemeProvider>
    <Navbar/>
      </ThemeProvider>
    </div>
  );
}

export default App;
