import { MessageSquareText, Phone } from "lucide-react";

export default function MobileContactBar() {
  return (
    <>
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
            href="sms:18302905856"
            aria-label="Text Jay's Web Design Services"
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 active:scale-[0.98] text-black py-3 rounded-xl font-bold transition-all"
          >
            <MessageSquareText size={19} />
            Text Now
          </a>
        </div>
      </div>
    </>
  );
}
