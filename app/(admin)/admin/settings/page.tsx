// app/admin/settings/page.tsx

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">إعدادات المنصة</h1>
        <p className="text-muted-foreground">
          إدارة إعدادات النظام والتكوينات العامة للمنصة.
        </p>
      </div>
      
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <p>محتوى نموذج الإعدادات سيتم إضافته هنا...</p>
      </div>
    </div>
  );
}