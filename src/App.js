import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './GlobalState'

// Importing components
import Header from './components/Headers/Header'
import MainPages from './components/Mainpages/Pages'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
