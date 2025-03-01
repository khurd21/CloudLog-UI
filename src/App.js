import './App.css';

import Menu from './Menu';
import { AuthProvider } from './AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
      <AuthProvider>
        <div className="app-container">
          <header>
            <Menu />
          </header>
          <main />
          <footer>
            <p>&copy; 2025 Cloud Log</p>
          </footer>
        </div>
      </AuthProvider>
  );
}

export default App;
