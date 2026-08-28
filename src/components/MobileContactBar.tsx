import { MessageSquareText, Phone } from "lucide-react";

export default function MobileContactBar() {
  const textMessage = encodeURIComponent(
    "Hi! I'm messaging from the Jay's Web Design Services website and I'm interested in more information."
  );
  const textLink = `sms:+18302905856?&body=${textMessage}`;

  return (
    <>
      <a
        href={textLink}
        aria-label="Message Jay's Web Design Services for a faster reply"
        className="hidden md:flex fixed bottom-6 right-6 z-[90] items-center gap-3 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white px-6 py-4 rounded-full font-bold shadow-[0_12px_40px_rgba(37,99,235,0.45)] transition-all"
      >
        <MessageSquareText size={22} />
        <span className="flex flex-col leading-tight">
          <span>Message Us Instantly</span>
          <span className="text-[11px] font-medium text-blue-100">Text for a faster reply</span>
        </span>
      </a>

      <div className="h-16 md:hidden" aria-hidden="true" />
      <div className="fixed bottom-0 left-0 right-0 z-[90] md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.3)]">
        <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
          <a
            href="tel:8302905856"
            aria-label="Call Jay's Web Design Services"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white py-3 rounded-xl font-bold transition-all"
          >
            <Phone size={19} />
            Call Now
          </a>
          <a
            href={textLink}
            aria-label="Message Jay's Web Design Services for a faster reply"
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 active:scale-[0.98] text-black py-3 rounded-xl font-bold transition-all"
          >
            <MessageSquareText size={19} />
            Message Us
          </a>
        </div>
      </div>
    </>
  );
}
