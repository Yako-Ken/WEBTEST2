import axios from "../api/axios";
import { useAuth } from "../context/AuthProvider";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const res = await axios.get("/auth/refresh", {
        withCredentials: true,
      });

      const newAccessToken = res.data.accessToken || res.data.token;

      if (!newAccessToken) {
        console.warn("No access token returned from refresh. Logging out...");
        setAuth({ accessToken: undefined, user: null });
        return null;
      }

      setAuth({
        accessToken: newAccessToken,
        user: res.data.data?.user ?? null,
      });

      return newAccessToken;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn("Error refreshing token:", message);
      setAuth({ accessToken: undefined, user: null });
      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;