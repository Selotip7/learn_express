import { useState, useEffect } from "react";
import { Sidebar } from "./components/layout";
import { Toast } from "./components/ui";
import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  UsersPage,
  LogoutPage,
} from "./pages";
import { useToast } from "./hooks/useToast";

const SIDEBAR_PAGES = [
  "dashboard",
  "users",
  "analytics",
  "reports",
  "settings",
];

function ComingSoon() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "white",
            marginBottom: 8,
          }}
        >
          Segera Hadir
        </h2>
        <p style={{ color: "var(--muted)" }}>
          Fitur ini sedang dalam pengembangan
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(null); // ⬅ jangan default login
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { message, showToast } = useToast();

  // 🔥 AUTH CHECK SAAT APP LOAD
useEffect(() => {
  const checkAuth = async () => {
    try {
      let meRes = await fetch(
        "http://localhost:3001/api/user/me",
        {
          credentials: "include",
        }
      );
      
      
      if (!meRes.ok||meRes.status==401) {
        const refreshRes = await fetch(
          "http://localhost:3001/api/user/refresh",
          {
            credentials: "include",
          },
        );
        
            if (!refreshRes.ok) {
      
              setUser(null);
              setPage("login");
              return;
            }
        
      }

      meRes = await fetch("http://localhost:3001/api/user/me", {
        credentials: "include",
      });
      

      const userData = await meRes.json();

      setUser(userData);
      setPage("dashboard");

    } catch (err) {
      console.error("Auth error:", err);
      setUser(null);
      setPage("login");
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []);

  // ⛔ Jangan render sebelum auth check selesai
  if (loading) return null;

  const hasSidebar = SIDEBAR_PAGES.includes(page);

  return (
    <>
      <Toast message={message} />

      {hasSidebar ? (
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar page={page} setPage={setPage} user={user} />

          {page === "dashboard" && (
            <DashboardPage
              setPage={setPage}
              user={user}
              showToast={showToast}
            />
          )}

          {page === "users" && (
            <UsersPage setPage={setPage} showToast={showToast} />
          )}

          {["analytics", "reports", "settings"].includes(page) && (
            <ComingSoon />
          )}
        </div>
      ) : (
        <>
          {page === "login" && (
            <LoginPage
              setPage={setPage}
              setUser={setUser}
              showToast={showToast}
            />
          )}

          {page === "register" && (
            <RegisterPage setPage={setPage} showToast={showToast} />
          )}

          {page === "logout" && <LogoutPage setPage={setPage} user={user} />}
        </>
      )}
    </>
  );
}
