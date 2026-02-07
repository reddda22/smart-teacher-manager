import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const login = async () => {
    const email = prompt("اكتب الإيميل");
    const password = prompt("اكتب الباسورد");
    await supabase.auth.signInWithPassword({ email, password });
    location.reload();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    location.reload();
  };

  return (
    <div style={{ padding: 30, fontFamily: "Tahoma" }}>
      <h1>📘 برنامج إدارة الدروس الذكي</h1>

      {!user ? (
        <button onClick={login}>تسجيل الدخول</button>
      ) : (
        <>
          <p>👋 أهلاً يا أستاذ</p>
          <button onClick={logout}>تسجيل الخروج</button>

          <hr />

          <h2>المجموعات</h2>
          <p>قريبًا: إضافة مجموعات وطلاب وحصص</p>
        </>
      )}
    </div>
  );
}
