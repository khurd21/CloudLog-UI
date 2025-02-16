import './App.css';

import Menu from './Menu';
import { AuthProvider } from './AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId='379391495680-d39d06qan1mtla0fihgn981dtiqrj826.apps.googleusercontent.com'>
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
    </GoogleOAuthProvider>
  );
}

export default App;
