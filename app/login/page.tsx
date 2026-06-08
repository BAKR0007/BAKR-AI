"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// 1. مكون نموذج تسجيل الدخول (مفصول داخلياً لتجنب خطأ Hydration)
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // التقاط مسار العودة (إذا كان المستخدم قادماً من مسار محمي سيعود إليه، وإلا سيذهب لـ /dashboard)
  const fallbackUrl = searchParams.get("from") || "/dashboard";

  // 👇 تم التعديل هنا لتحديد نوع الحدث بدقة
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); 
    setLoading(true); 

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "تأكد من البريد الإلكتروني وكلمة المرور.");
        setLoading(false);
        return;
      }

      // التوجيه الديناميكي بدلاً من التوجيه الثابت
      router.push(fallbackUrl); 
      router.refresh(); 

    } catch (error) {
      console.error("حدث خطأ:", error);
      setError("تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">تسجيل الدخول</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 rounded text-sm text-center">
          {error}
        </div>
      )}

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
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className={`w-full p-2.5 rounded font-bold transition-all flex justify-center items-center ${
          loading 
            ? "bg-blue-600/50 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        {loading ? "جاري التحقق..." : "دخول"}
      </button>
    </form>
  );
}

// 2. المكون الرئيسي للصفحة
export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      {/* التغليف بـ Suspense لحل مشكلة استخدام useSearchParams في بيئة الخادم */}
      <Suspense fallback={<div className="text-blue-400 font-bold text-lg">جاري التحميل...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}