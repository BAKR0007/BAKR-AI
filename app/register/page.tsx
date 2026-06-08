"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 👇 تم التعديل هنا لتحديد نوع الحدث بدقة
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "حدث خطأ أثناء إنشاء الحساب.");
        setLoading(false);
        return;
      }

      // توجيه المستخدم لصفحة الدخول بعد نجاح التسجيل
      router.push("/login");

    } catch (error) {
      console.error("حدث خطأ:", error);
      setError("تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleRegister} className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">إنشاء حساب جديد</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 rounded text-sm text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-300">الاسم الكامل</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2.5 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="مثال: Admin"
            required 
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-300">البريد الإلكتروني</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2.5 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="admin@example.com"
            required 
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-300">كلمة المرور</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2.5 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="••••••••"
            required 
            disabled={loading}
            minLength={8}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full p-2.5 rounded font-bold transition-all flex justify-center items-center mb-4 ${
            loading 
              ? "bg-blue-600/50 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {loading ? "جاري التسجيل..." : "إنشاء الحساب"}
        </button>

        <div className="text-center text-sm text-gray-400">
          لديك حساب بالفعل؟{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            تسجيل الدخول
          </Link>
        </div>
      </form>
    </div>
  );
}