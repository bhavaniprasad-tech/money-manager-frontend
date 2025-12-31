import { User } from "lucide-react";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import { SIDE_BAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({activeMenu = ""}) => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();
    
    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20 overflow-y-auto">
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {user?.profileImageUrl && user.profileImageUrl.trim() ? (
                    <img 
                        src={user.profileImageUrl} 
                        alt="profile" 
                        className="w-20 h-20 rounded-full object-cover border-2 border-purple-200"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling?.classList.remove('hidden');
                        }}
                    />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center border-2 border-purple-200">
                        {(user?.fullName || user?.name) ? (
                            <span className="text-2xl font-medium text-purple-700">
                                {(user.fullName || user.name).charAt(0).toUpperCase()}
                            </span>
                        ) : (
                            <User className="w-10 h-10 text-purple-500" />
                        )}
                    </div>
                )}
                <h5 className="text-gray-950 font-medium leading-6">{user?.fullName || user?.name || "User"}</h5>
            </div>
            
            <div className="space-y-2">
                {SIDE_BAR_DATA.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <button
                        onClick={() => navigate(item.path)}
                            key={`menu_${index}`}
                            className={`cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-2 transition-colors ${
                                activeMenu === item.label 
                                    ? 'text-white bg-purple-800 hover:bg-purple-900' 
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            <IconComponent className="w-5 h-5" />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default Sidebar;