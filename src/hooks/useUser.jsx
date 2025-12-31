import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";

// Fetch user info if not already in context/localStorage
export const useUser = () => {
    const { user, setUser, clearUser } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) return;

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO);
                if (isMounted && response.data?.user) {
                    const u = response.data.user;
                    setUser({
                        ...u,
                        fullName: u?.fullName || u?.name || "",
                        email: u?.email || "",
                        profileImageUrl: u?.profileImageUrl || u?.profileImage || u?.imageUrl || "",
                    });
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
                if (isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }
        };

        fetchUserInfo();

        return () => {
            isMounted = false;
        };
    }, [user, setUser, clearUser, navigate]);
};