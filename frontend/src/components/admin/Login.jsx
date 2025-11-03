import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStote } from '../../store/useAuth'; // adjust path if needed

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoggingIn } = useAuthStote();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert('Please fill in all fields');
    await login({email,password});
  };

  return (
    <div className="w-full h-[70vh] flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-neutral mt-4"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>

        <p className="mt-2">
          Don't have an account?{' '}
          <Link to="/signup">
            <span className="text-blue-500 cursor-pointer underline">Signup</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;