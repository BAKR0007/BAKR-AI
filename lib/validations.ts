import { z } from "zod";

// مخطط التحقق من بيانات التسجيل
export const registerSchema = z.object({
  name: z.string()
    .trim() // إزالة المسافات الزائدة من البداية والنهاية
    .min(2, "الاسم يجب أن يتكون من حرفين على الأقل"),
    
  email: z.string()
    .trim() // إزالة المسافات الزائدة
    .email("صيغة البريد الإلكتروني غير صحيحة"),
    
  password: z.string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، ورقم"),
});

// مخطط التحقق من بيانات تسجيل الدخول
export const loginSchema = z.object({
  email: z.string()
    .trim()
    .email("صيغة البريد الإلكتروني غير صحيحة"),
    
  password: z.string()
    .min(1, "كلمة المرور مطلوبة"),
});