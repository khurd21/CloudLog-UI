import './App.css';

import Menu from './Menu';
import Logo from './Logo';

function App() {
  return (
    <div className="app-container">
      <header>
        <Menu />
      </header>
      <main>
        <Logo />
      </main>
      <footer>
        <p>&copy; 2025 Cloud Log</p>
      </footer>
    </div>
  );
}

export default App;
