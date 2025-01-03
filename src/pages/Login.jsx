import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
   const [values, setValues] = useState({
       email: '',
       password: '',
   });
   const [errors, setErrors] = useState({});
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const validateForm = () => {
       let tempErrors = {};
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
           const response = await axios.post('http://localhost:3000/auth/login', values);
           if (response.status === 201) {
               localStorage.setItem('token', response.data.token);
               navigate('/');
           }
       } catch (err) {
           setErrors({ submit: 'Invalid email or password' });
       } finally {
           setLoading(false);
       }
   };

   return (
       <div className="min-h-screen flex items-center justify-center p-4"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://i.pinimg.com/736x/b9/49/73/b949733841acc58f736eb8d924c440ba.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
           <div className="bg-black/40 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all hover:scale-105 border border-white/10">
               <div className="text-center mb-8">
                   <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                   <p className="text-gray-300">Sign in to continue</p>
               </div>

               <form onSubmit={handleSumbit} className="space-y-6">
                   <div>
                       <label className="text-sm font-medium text-gray-200">Email</label>
                       <input
                           type="email"
                           name="email"
                           placeholder="Enter your email"
                           onChange={handleChanges}
                           className="mt-1 w-full px-4 py-3 rounded-lg bg-black/30 border border-white/20 text-white
                                    placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                       />
                       {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                   </div>

                   <div>
                       <label className="text-sm font-medium text-gray-200">Password</label>
                       <input
                           type="password"
                           name="password"
                           placeholder="Enter your password"
                           onChange={handleChanges}
                           className="mt-1 w-full px-4 py-3 rounded-lg bg-black/30 border border-white/20 text-white
                                    placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                       />
                       {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                   </div>

                   {errors.submit && (
                       <div className="bg-red-900/50 border border-red-800 text-red-300 px-4 py-3 rounded-lg">
                           {errors.submit}
                       </div>
                   )}

                   <button 
                       type="submit"
                       disabled={loading}
                       className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium
                                hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-[1.02]
                                disabled:opacity-70 disabled:cursor-not-allowed"
                   >
                       {loading ? 'Signing in...' : 'Sign in'}
                   </button>
               </form>

               <div className="mt-6 text-center">
                   <p className="text-gray-300">
                       Don't have an account?{' '}
                       <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium">
                           Create account
                       </Link>
                   </p>
               </div>
           </div>
       </div>
   );
};

export default Login;