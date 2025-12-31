import { useContext } from "react";
import { useLocation } from "react-router-dom";
import Menubar from "./Menubar";
import AppContext from "../context/AppContext";
import Sidebar from "./Sidebar";
import { SIDE_BAR_DATA } from "../assets/assets";

const Dashboard = ({children}) => {
    const location = useLocation();
    const { user } = useContext(AppContext);
    // Find the active menu based on current path
    const activeMenuItem = SIDE_BAR_DATA.find(item => item.path === location.pathname);
    const activeMenu = activeMenuItem?.label || "";

    return (
        <div>
            <Menubar/>
            <div className="flex">
                <div className="max-[1080px]:hidden">
                    {user ? <Sidebar activeMenu={activeMenu}/> : null}
                </div>
                <div className="grow mx-5">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;