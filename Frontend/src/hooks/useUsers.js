import { useState, useEffect } from "react";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Ambil semua user dari database
  const fetchUsers = async () => {
    try {
      setLoading(true);
      let meRes = await fetch("http://localhost:3001/api/user/all", {
        credentials: "include",
      });

      if (!meRes.ok || meRes.status === 401) {
        const refreshRes = await fetch(
          "http://localhost:3001/api/user/refresh",
          {
            credentials: "include",
          },
        );

        if (!refreshRes.ok) {
          window.location.href = "/login";
          return;
        }
      }

      meRes = await fetch("http://localhost:3001/api/user/all", {
        credentials: "include",
      });

      if (!meRes.ok) {
        window.location.href = "/login";
        return;
      }

      const data = await meRes.json();
      setUsers(data.users); // pastikan backend kirim { users: [...] }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Ambil saat pertama render
  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Tambah user
  const addUser = async (userData) => {
    const res = await fetch("http://localhost:3001/api/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Gagal menambahkan user");
    }
    if (!data.success)
      throw new Error(data.message || "Gagal menambahkan user");
    await fetchUsers(); // 🔥 fetch ulang setelah add
  };

  // 🔹 Update user
  const updateUser = async (id, userData) => {
    const res = await fetch(`http://localhost:3001/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    if (!res.ok) throw new Error("Gagal update user");

    await fetchUsers(); // 🔥 fetch ulang
  };

  // 🔹 Delete user
  const deleteUser = async (id) => {
    const res = await fetch(`http://localhost:3001/api/user/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Gagal hapus user");

    await fetchUsers(); // 🔥 fetch ulang
  };

  return { users, loading, addUser, updateUser, deleteUser };
}
