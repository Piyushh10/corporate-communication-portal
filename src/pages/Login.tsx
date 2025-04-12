
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/30 to-background p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">SecureComm Portal</h1>
          <p className="text-lg text-muted-foreground">
            Secure, reliable corporate communication for your team.
          </p>
          <ul className="space-y-2 mt-6">
            <li className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-sm">✓</span>
              </div>
              <span>End-to-end encrypted messaging</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-sm">✓</span>
              </div>
              <span>Secure file sharing</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-sm">✓</span>
              </div>
              <span>Compliance with corporate policies</span>
            </li>
          </ul>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
