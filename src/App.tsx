import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
