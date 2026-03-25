import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
const AuthContext = createContext();

// Create a custom hook for easy access
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means logged out
  const navigate = useNavigate();

  // Mock Login Function
  const login = (e) => {
    if (e) e.preventDefault();
    
    // Simulate setting user data from an API
    setUser({
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: 'Patient',
      avatar: 'https://i.pravatar.cc/150?u=patient'
    });
    
    // COOL ADDITION: Redirect to Home instead of Dashboard
    navigate('/'); 
  };

  // Mock Logout Function
  const logout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};