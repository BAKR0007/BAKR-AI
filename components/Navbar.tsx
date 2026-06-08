import Image from 'next/image';

export default function Navbar() {
  return (
    <nav>
      {/* استدعاء الشعار من المجلد public مباشرة */}
      <Image 
        src="/logo.png" 
        alt="BAKR AI Logo" 
        width={100} 
        height={100} 
        priority 
      />
      
      {/* ... باقي عناصر القائمة ... */}
    </nav>
  );
}