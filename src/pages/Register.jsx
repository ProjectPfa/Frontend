import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
   const [values, setValues] = useState({
       username: '',
       email: '',
       password: ''
   });
   const [errors, setErrors] = useState({});
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const validateForm = () => {
       let tempErrors = {};
       if (!values.username) tempErrors.username = 'Username is required';
       if (!values.email) tempErrors.email = 'Email is required';
       else if (!/\S+@\S+\.\S+/.test(values.email)) tempErrors.email = 'Email is invalid';
       if (!values.password) tempErrors.password = 'Password is required';
       else if (values.password.length < 6) tempErrors.password = 'Password must be at least 6 characters';
       setErrors(tempErrors);
       return Object.keys(tempErrors).length === 0;
   };

   const handleChanges = (e) => {
       setValues({ ...values, [e.target.name]: e.target.value });
       if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
   };

   const handleSumbit = async (e) => {
       e.preventDefault();
       if (!validateForm()) return;
       setLoading(true);
       try {
           const response = await axios.post('http://localhost:3000/auth/register', values);
           if (response.status === 201) {
               navigate('/login');
           }
       } catch (err) {
           setErrors({ submit: 'Registration failed. Please try again.' });
       } finally {
           setLoading(false);
       }
   };

 // ... (garder le code existant jusqu'au return)

return (
    <div className="min-h-screen flex items-center justify-center p-4"
         style={{
             backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('https://i.pinimg.com/736x/7a/c6/cf/7ac6cf31bd5b48045274a50f66609c9b.jpg')`,
             backgroundSize: 'cover',
             backgroundPosition: 'center'
         }}>
        <div className="bg-[#1a1a2e]/70 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all hover:scale-105 border border-[#30305a]">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-violet-300">Join us today</p>
            </div>
 
            <form onSubmit={handleSumbit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-violet-200">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        onChange={handleChanges}
                        className="mt-1 w-full px-4 py-3 rounded-lg bg-[#16213e]/80 border border-[#30305a] text-white
                                 placeholder-violet-300/50 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    />
                    {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
                </div>
 
                <div>
                    <label className="text-sm font-medium text-violet-200">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleChanges}
                        className="mt-1 w-full px-4 py-3 rounded-lg bg-[#16213e]/80 border border-[#30305a] text-white
                                 placeholder-violet-300/50 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>
 
                <div>
                    <label className="text-sm font-medium text-violet-200">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChanges}
                        className="mt-1 w-full px-4 py-3 rounded-lg bg-[#16213e]/80 border border-[#30305a] text-white
                                 placeholder-violet-300/50 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                </div>
 
                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-violet-800 to-indigo-900 text-white py-3 rounded-lg font-medium
                             hover:from-violet-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-[1.02]
                             shadow-lg border border-violet-700/50 mt-2"
                >
                    {loading ? 'Creating account...' : 'Create Account'}
                </button>
            </form>
 
            <div className="mt-6 text-center">
                <p className="text-violet-300">
                    Already have an account?{' '}
                    <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    </div>
   );
};

export default Register;