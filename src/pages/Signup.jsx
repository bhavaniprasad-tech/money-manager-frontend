import { useState } from "react"
import Input from "../components/input.jsx"
import {assets} from "../assets/assets.js"
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../util/uploadProfileImage.js";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImageUrl = ""
        setIsLoading(true);


        //basic validation
        if(!fullName.trim()){
            setError("Please enter your fullname");
            setIsLoading(false);
            return;
        }

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

        //signup api call
        try{
            //upload image if it is present
            if(profilePhoto){
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl || "";
            }
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            });
            if(response.status === 201){
                toast.success("Profile creates successfully .");
                navigate("/login");
            }
        }
        catch(err){
            console.log('Something went wrong', err);
            setError(err.message);
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
                        Create An Account
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Start tracking Your spendings by joining with us
                    </p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex justify-center mb-6">
                            <ProfilePhotoSelector image = {profilePhoto} setImage = {setProfilePhoto}/>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            <Input
                                value={fullName}
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                    if(error) setError(null);
                                }}
                                label="Full Name"
                                placeholder="Enter full Name"
                                type="text"
                            />
                            <Input
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if(error) setError(null);
                                }}
                                label="Email Address"
                                placeholder="Enter your email"
                                type="email"
                            />

                            <div className="col-span-2">
                                <Input
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if(error) setError(null);
                                    }}
                                    label="Password"
                                    placeholder="Enter the password"
                                    type="password"
                                />
                            </div>


                        </div>

                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button disabled={isLoading} className={`w-full bg-blue-600 text-white py-3 text-lg font-medium rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed':''}`} type="submit">
                            {isLoading ? (
                                <>
                                <LoaderCircle className="animate-spin w-5 h-5"/>
                                Signing Up...
                                </>
                            ) : (
                                "SIGN UP"
                            )}
                        </button>
                        <p className="text-sm text-slate-800 text-center mt-6">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-blue-600 underline hover:text-blue-700 transition-colors">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup