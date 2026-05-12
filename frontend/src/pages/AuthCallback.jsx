import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const processed = useRef(false);
  const { setUser } = useAuth();

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;
    const hash = window.location.hash || "";
    const m = hash.match(/session_id=([^&]+)/);
    if (!m) {
      navigate("/login", { replace: true });
      return;
    }
    const session_id = decodeURIComponent(m[1]);
    (async () => {
      try {
        const { data } = await api.post("/auth/session", { session_id });
        // Cookie is set by backend; also store session_token as bearer fallback
        if (data?.session_token) localStorage.setItem("ledgerly_token", data.session_token);
        setUser(data.user);
        navigate("/dashboard", { replace: true });
      } catch (err) {
        console.error(err);
        navigate("/login?error=oauth", { replace: true });
      }
    })();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream" data-testid="auth-callback">
      <div className="text-sm text-[#5C5C5C]">Signing you in…</div>
    </div>
  );
}