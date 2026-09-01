"use client";

import { useEffect, useRef, useState, createContext, useContext, ReactNode } from "react";
import { User, Profile } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { isFeatureEnabled } from "@/lib/features";
import { getSesion, subscribeToRoleChange } from "@/lib/role";

export interface UserContextValue {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  error: Error | null;
  isGuest: boolean;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isGuest, setIsGuest] = useState(true);
  const sessionGenerationRef = useRef(0);
  const sessionCacheRef = useRef<{ user: User | null; timestamp: number } | null>(null);

  const isSupabaseEnabled = isFeatureEnabled("supabase.enabled");

  useEffect(() => {
    if (!isSupabaseEnabled) {
      const applyMock = () => {
        const sesion = getSesion();
        const role = sesion?.role ?? "alumno";

        if (sesion) {
          setIsGuest(false);
          const mockUser: User = {
            id: sesion.alumnoId?.toString() ?? "local",
            email: role === "profesor" ? "docente@local.com" : "alumno@local.com",
          };
          const mockProfile: Profile = {
            id: sesion.alumnoId?.toString() ?? "local",
            role,
            nombre: sesion.nombre ?? (role === "profesor" ? "Docente" : "Alumno"),
            apellido: sesion.apellido ?? "",
            legajo: sesion.legajo ?? "",
            carrera: "",
            comision: "",
            created_at: new Date().toISOString(),
          };
          setUser(mockUser);
          setProfile(mockProfile);
        } else {
          setIsGuest(true);
          const mockUser: User = {
            id: "guest",
            email: "alumno@local.com",
          };
          const mockProfile: Profile = {
            id: "guest",
            role: "alumno",
            nombre: "Invitado",
            apellido: "",
            legajo: "",
            carrera: "",
            comision: "",
            created_at: new Date().toISOString(),
          };
          setUser(mockUser);
          setProfile(mockProfile);
        }
        setLoading(false);
      };

      applyMock();

      const unsubscribe = subscribeToRoleChange(() => {
        applyMock();
      });

      return unsubscribe;
    }

    const supabase = createClient();

    let ignore = false;

    async function fetchUser() {
      try {
        // Verificar caché (5 minutos)
        const now = Date.now();
        if (sessionCacheRef.current &&
            (now - sessionCacheRef.current.timestamp) < 5 * 60 * 1000) {
          setUser(sessionCacheRef.current.user);
          setLoading(false);
          return;
        }

        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) throw authError;

        if (authUser) {
          const userData = { id: authUser.id, email: authUser.email };
          sessionCacheRef.current = { user: userData, timestamp: now };
          setUser(userData);

          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", authUser.id)
            .single();

          if (profileError) throw profileError;

          if (!ignore) {
            setProfile(profileData as Profile);
          }
        } else {
          if (!ignore) {
            setUser(null);
            setProfile(null);
          }
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const generation = ++sessionGenerationRef.current;

      if (session?.user) {
        const userData = { id: session.user.id, email: session.user.email };
        sessionCacheRef.current = { user: userData, timestamp: Date.now() };
        setUser(userData);
        supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()
          .then(({ data, error }) => {
            if (sessionGenerationRef.current !== generation) return;
            if (error) {
              setProfile(null);
            } else {
              setProfile(data as Profile);
            }
          });
      } else {
        sessionCacheRef.current = null;
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      ignore = true;
      sessionGenerationRef.current += 1;
      subscription.unsubscribe();
    };
  }, [isSupabaseEnabled]);

  return (
    <UserContext.Provider value={{ user, profile, loading, error, isGuest }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
