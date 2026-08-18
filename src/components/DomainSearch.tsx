import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Globe2, Loader2, Search, ShoppingCart, XCircle } from "lucide-react";

function normalizeDomain(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .replace(/\s+/g, "");
}

type DomainResult = {
  domain: string;
  available: boolean;
};

type PaidOrder = {
  domain: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
};

export default function DomainSearch() {
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<DomainResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [paymentChecking, setPaymentChecking] = useState(false);
  const [paidOrder, setPaidOrder] = useState<PaidOrder | null>(null);
  const [cancelled, setCancelled] = useState(false);
  const [orderForm, setOrderForm] = useState({ firstName: "", lastName: "", email: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("domain_order");
    const sessionId = params.get("session_id");

    if (status === "cancelled") {
      setCancelled(true);
      return;
    }

    if (status !== "success" || !sessionId) return;

    const verifyPayment = async () => {
      setPaymentChecking(true);
      try {
        const response = await fetch(`/api/verify-domain-payment?session_id=${encodeURIComponent(sessionId)}`);
        const data = await response.json();
        if (!response.ok || !data.paid) {
          throw new Error(data?.error || "Payment could not be confirmed yet.");
        }
        setPaidOrder({
          domain: data.domain,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      } catch (verifyError) {
        setError(verifyError instanceof Error ? verifyError.message : "Payment could not be confirmed yet.");
      } finally {
        setPaymentChecking(false);
      }
    };

    verifyPayment();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = normalizeDomain(domain);

    if (!cleaned || !cleaned.includes(".")) {
      setResult(null);
      setError("Enter a full domain name, like mybusiness.com");
      return;
    }

    setError("");
    setResult(null);
    setShowOrder(false);
    setCancelled(false);
    setLoading(true);

    try {
      const response = await fetch(`/api/domain-check?domain=${encodeURIComponent(cleaned)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "We could not check that domain right now.");
      }

      setResult({ domain: data.domain, available: Boolean(data.available) });
    } catch (lookupError) {
      setError(lookupError instanceof Error ? lookupError.message : "We could not check that domain right now.");
    } finally {
      setLoading(false);
    }
  };

  const startCheckout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!result?.available) return;

    setError("");
    setCheckoutLoading(true);

    try {
      const response = await fetch("/api/create-domain-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: result.domain,
          firstName: orderForm.firstName,
          lastName: orderForm.lastName,
          email: orderForm.email,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data?.error || "Unable to start secure checkout.");
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Unable to start secure checkout.");
      setCheckoutLoading(false);
    }
  };

  return (
    <section id="domain-search" className="py-20 md:py-24 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-5">
              <Globe2 size={30} />
            </div>
            <span className="text-blue-400 font-bold tracking-widest uppercase text-sm">Free Domain Search</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-5 font-display tracking-tight">
              Is Your Business Domain Available?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
              Search a domain name before you start your website. If it is available, Jay’s Web Design Services can purchase and register it for you for $40.
            </p>
          </div>

          <div className="bg-white text-black rounded-3xl p-6 md:p-8 shadow-2xl">
            {paymentChecking && (
              <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-800 rounded-2xl p-5 flex items-center gap-3">
                <Loader2 className="animate-spin flex-shrink-0" size={22} />
                <p className="font-bold">Confirming your Stripe payment...</p>
              </div>
            )}

            {paidOrder && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-2xl p-5">
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="flex-shrink-0 mt-0.5" size={24} />
                  <div>
                    <p className="font-extrabold text-lg">Payment confirmed — domain order received!</p>
                    <p className="text-sm mt-1">
                      Your $40 payment for <strong>{paidOrder.domain}</strong> was confirmed securely through Stripe. We’ll reconfirm availability and purchase the domain from a reputable registrar.
                    </p>
                    {paidOrder.email && <p className="text-sm mt-2">Confirmation contact: {paidOrder.email}</p>}
                  </div>
                </div>
              </div>
            )}

            {cancelled && (
              <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-2xl p-5">
                <p className="font-bold">Checkout was cancelled.</p>
                <p className="text-sm mt-1">No payment was completed. You can search again or restart checkout anytime.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <label htmlFor="domain-name" className="block text-sm font-bold text-gray-700">
                Enter a domain name
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="domain-name"
                    type="text"
                    value={domain}
                    onChange={(event) => {
                      setDomain(event.target.value);
                      setError("");
                      setResult(null);
                      setShowOrder(false);
                    }}
                    placeholder="mybusiness.com"
                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary btn-glow px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70"
                >
                  {loading ? <Loader2 size={19} className="animate-spin" /> : <Search size={19} />}
                  {loading ? "Checking..." : "Check Domain"}
                </button>
              </div>

              {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

              {result && (
                <div className={`rounded-2xl border p-5 ${result.available ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
                  <div className="flex items-start gap-3">
                    {result.available ? <CheckCircle2 size={24} className="flex-shrink-0 mt-0.5" /> : <XCircle size={24} className="flex-shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <p className="font-extrabold text-lg">
                        {result.domain} {result.available ? "looks available!" : "is already registered."}
                      </p>
                      <p className="text-sm mt-1 opacity-90">
                        {result.available ? "Purchase our $40 domain registration service below. We re-check availability again immediately before opening Stripe Checkout." : "Try another name or a different extension such as .net, .co, or .us."}
                      </p>
                      {result.available && (
                        <button
                          type="button"
                          onClick={() => setShowOrder(true)}
                          className="mt-4 bg-green-700 text-white px-5 py-3 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-green-800"
                        >
                          <ShoppingCart size={18} /> Purchase This Domain — $40
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500">
                Availability is checked using public registration data. Final availability is confirmed at registration. The $40 charge is for Jay’s Web Design Services’ domain purchase and registration service.
              </p>
            </form>

            {showOrder && result?.available && (
              <form onSubmit={startCheckout} className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                <h3 className="text-xl font-extrabold text-black">Purchase {result.domain} — $40</h3>
                <p className="text-sm text-gray-500">
                  Enter your information, then continue to secure Stripe Checkout. We’ll use this information with your domain order.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    required
                    type="text"
                    placeholder="First name"
                    value={orderForm.firstName}
                    onChange={(event) => setOrderForm({ ...orderForm, firstName: event.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                  />
                  <input
                    required
                    type="text"
                    placeholder="Last name"
                    value={orderForm.lastName}
                    onChange={(event) => setOrderForm({ ...orderForm, lastName: event.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  value={orderForm.email}
                  onChange={(event) => setOrderForm({ ...orderForm, email: event.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={checkoutLoading}
                  className="w-full btn-primary btn-glow py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {checkoutLoading ? <Loader2 size={20} className="animate-spin" /> : <ShoppingCart size={20} />}
                  {checkoutLoading ? "Opening Secure Checkout..." : "Pay $40 Securely with Stripe"}
                </button>
                <p className="text-xs text-gray-500">
                  Card information is entered directly on Stripe’s secure checkout page. Jay’s Web Design Services does not receive or store your card number.
                </p>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="font-bold text-black">Need a website too?</p>
              <p className="text-sm text-gray-500 mt-1">Jay’s Web Design Services can build the website to go with your new domain.</p>
              <a href="#estimate" className="inline-flex mt-4 text-blue-600 font-bold hover:text-blue-700">Get a website estimate →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
