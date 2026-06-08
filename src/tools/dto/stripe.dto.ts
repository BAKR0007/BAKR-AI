import { z } from 'zod';

// مخصص للتحقق من جلسة الدفع
export const CreateCheckoutSessionSchema = z.object({
  priceId: z.string().min(1, "Price ID مطلوب"),
});
export type CreateCheckoutSessionDto = z.infer<typeof CreateCheckoutSessionSchema>;

// مخصص للتحقق من بيانات الـ Webhook
export const WebhookPayloadSchema = z.object({
  signature: z.string().min(1, "Signature مطلوبة"),
  payload: z.any(), 
});
export type WebhookPayloadDto = z.infer<typeof WebhookPayloadSchema>;