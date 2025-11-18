"use client";
import { User } from "@/models/user.interface";
import { fetchUserData, getCookies, signOut } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  checkAuthStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await getCookies();
      if (token) {
        setIsLoading(true);
        try {
          const user = await fetchUserData(token);
          if (!user) {
            setIsLoading(false);
            console.error("No user data returned");
            return;
          }
          setUser(user);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setIsLoading(false);
        }
      }
    };

    checkAuthStatus();
  }, []);

  const checkAuthStatus = useCallback(async () => {
    const token = await getCookies();
    if (token) {
      try {
        setIsLoading(true);
        const profile = await fetchUserData(token);
        setUser(profile);
      } catch (error) {
        setUser(null);
        signOut();
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut();
    setUser(null);
    setIsLoading(false);
    checkAuthStatus();
    router.push("/login");
    return;
  }, [checkAuthStatus, router]);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, checkAuthStatus, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
