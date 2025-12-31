import { useContext, useState } from "react"
import Input from "../components/input.jsx"
import {assets} from "../assets/assets.js"
import { Link, useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { LoaderCircle } from "lucide-react";
import { validateEmail } from "../util/validation.js";
import AppContext from "../context/AppContext.jsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {setUser} = useContext(AppContext);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        //basic validation
        if(!validateEmail(email)){
            setError("Please enter valid email address");
            setIsLoading(false);
            return;
        }

        if(!password.trim()){
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }

        setError("");

        //Login Api call
        try{
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password,
            });
            const {token, user} = response.data;
            if(token){
                localStorage.setItem("token", token);
                // Ensure user object has the expected structure
                const userData = {
                    ...user,
                    fullName: user?.fullName || user?.name || user?.fullname || '',
                    email: user?.email || '',
                    profileImageUrl: user?.profileImageUrl || user?.profileImage || user?.imageUrl || ''
                };
                console.log('User data received:', userData);
                setUser(userData);
                navigate("/dashboard");
            }
        }catch(error){
            setError("Invalid email or password");
        } finally{
            setIsLoading(false);
        }

    }
    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Background image with blur */}
            <div 
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: `url(${assets.login_bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(4px)'
                }}
            ></div>
            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Welcome Back
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Please Enter your details to login
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Address"
                                placeholder="Enter your email"
                                type="email"
                            />

                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label="Password"
                                    placeholder="Enter the password"
                                    type="password"
                                />
                    

                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button disabled = {isLoading} className={`w-full bg-blue-600 text-white py-3 text-lg font-medium rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed':''}`} type="submit">
                            {isLoading ? (
                                <>
                                <LoaderCircle className = "animate-spin w-5 h-5"/>
                                Logging in...
                                </>
                            ):("LOGIN")}
                        </button>
                        <p className="text-sm text-slate-800 text-center mt-6">
                            Don't have an account?
                            <Link to="/signup" className="font-medium text-blue-600 underline hover:text-blue-700 transition-colors">
                                Signup
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login