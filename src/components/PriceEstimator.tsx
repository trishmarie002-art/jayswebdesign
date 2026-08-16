import { useMemo, useState, type FormEvent } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Calculator, CheckCircle2, Loader2, Send, Sparkles } from "lucide-react";
import { saveLead } from "../services/leadService";

type PackageId = "one" | "three" | "five" | "ten" | "store" | "logo";

const packages = [
  { id: "one" as const, name: "1-Page Website", noSeo: 150, withSeo: 180, detail: "A focused landing page for one service or offer." },
  { id: "three" as const, name: "3-Page Website", noSeo: 250, withSeo: 350, detail: "A compact business website with room for key information." },
  { id: "five" as const, name: "5-Page Website", noSeo: 440, withSeo: 500, detail: "A complete small-business website for services and leads." },
  { id: "ten" as const, name: "10-Page Website", noSeo: 650, withSeo: 750, detail: "A larger website for multiple services or locations." },
  { id: "store" as const, name: "E-Commerce Store", fixedPrice: 800, detail: "An online store with up to 100 products." },
  { id: "logo" as const, name: "Logo Design Only", fixedPrice: 150, detail: "Professional standalone logo design without a website." },
];

export default function PriceEstimator() {
  const [selected, setSelected] = useState<PackageId>("five");
  const [includeSeo, setIncludeSeo] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [state, handleFormspreeSubmit] = useForm("mqegywzr");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
  });

  const selectedPackage = packages.find((item) => item.id === selected)!;
  const supportsSeo = "withSeo" in selectedPackage;
  const includesFreeLogo = selected !== "logo";
  const supportsMaintenance = selected !== "logo";
  const oneTimePrice = useMemo(() => {
    if ("fixedPrice" in selectedPackage) return selectedPackage.fixedPrice;
    return includeSeo ? selectedPackage.withSeo : selectedPackage.noSeo;
  }, [includeSeo, selectedPackage]);

  const estimateSummary = [
    selectedPackage.name,
    supportsSeo ? (includeSeo ? "Basic SEO included" : "Without SEO") : null,
    includesFreeLogo ? "Free logo design if needed" : null,
    supportsMaintenance
      ? (maintenance ? "Monthly maintenance: $60/month" : "No monthly maintenance selected")
      : "Monthly maintenance: Not applicable",
    `Estimated one-time price: $${oneTimePrice}`,
  ].filter(Boolean).join(" | ");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await saveLead({
        name: formData.name,
        phone: formData.phone,
        businessName: formData.businessName,
        websiteType: selectedPackage.name,
        email: formData.email,
        projectDescription: estimateSummary,
        source: "price_estimator",
      });
    } catch (error) {
      console.error("Estimator lead save failed but continuing with Formspree:", error);
    }
    await handleFormspreeSubmit(event);
  };

  return (
    <section id="estimate" className="py-20 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Instant Price Estimator</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-black mt-3 mb-6 font-display tracking-tight">
            Build Your Website Estimate
          </h2>
          <p className="text-gray-600 text-lg">
            Choose a package and options to see your estimated starting price instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_0.8fr] gap-8 items-start">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {packages.map((item) => {
              const active = selected === item.id;
              const startingPrice = "fixedPrice" in item ? item.fixedPrice : item.noSeo;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelected(item.id);
                    if (item.id === "logo") setMaintenance(false);
                    setShowForm(false);
                  }}
                  className={`text-left p-6 rounded-3xl border-2 transition-all ${
                    active
                      ? "bg-black text-white border-blue-600 shadow-xl shadow-blue-600/10"
                      : "bg-white text-black border-gray-100 hover:border-blue-300 hover:shadow-lg"
                  }`}
                >
                  <div className="flex justify-between gap-3 items-start">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    {active && <CheckCircle2 className="text-blue-500 flex-shrink-0" size={24} />}
                  </div>
                  <p className={`text-sm mt-3 leading-relaxed ${active ? "text-gray-300" : "text-gray-500"}`}>
                    {item.detail}
                  </p>
                  <p className="text-2xl font-extrabold mt-5">
                    {"fixedPrice" in item ? "$" : "From $"}{startingPrice}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-7 md:p-9 lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Calculator size={25} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-gray-400">Your Estimate</p>
                <h3 className="text-xl font-bold text-black">{selectedPackage.name}</h3>
              </div>
            </div>

            {supportsSeo && (
              <div className="mb-5">
                <p className="text-sm font-bold text-black mb-3">SEO option</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIncludeSeo(false)}
                    className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all ${!includeSeo ? "bg-black text-white border-black" : "bg-gray-50 text-gray-600 border-gray-200"}`}
                  >
                    Without SEO
                  </button>
                  <button
                    type="button"
                    onClick={() => setIncludeSeo(true)}
                    className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all ${includeSeo ? "bg-blue-600 text-white border-blue-600" : "bg-gray-50 text-gray-600 border-gray-200"}`}
                  >
                    With SEO
                  </button>
                </div>
              </div>
            )}

            {includesFreeLogo && (
              <div className="flex items-center gap-3 bg-blue-50 text-blue-800 rounded-2xl p-4 mb-5">
                <Sparkles className="text-blue-600 flex-shrink-0" size={21} />
                <p className="text-sm font-bold">Free logo design included if needed</p>
              </div>
            )}

            {supportsMaintenance && (
              <label className="flex items-center justify-between gap-4 border border-gray-200 rounded-2xl p-4 cursor-pointer">
                <div>
                  <p className="font-bold text-black">Monthly Maintenance</p>
                  <p className="text-sm text-gray-500">$60 per month</p>
                </div>
                <input
                  type="checkbox"
                  checked={maintenance}
                  onChange={(event) => setMaintenance(event.target.checked)}
                  className="w-5 h-5 accent-blue-600"
                />
              </label>
            )}

            <div className="mt-7 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-end gap-4">
                <div>
                  <p className="text-sm text-gray-500">Estimated one-time price</p>
                  <p className="text-4xl font-extrabold text-black">${oneTimePrice}</p>
                </div>
                {supportsMaintenance && maintenance && <p className="text-blue-600 font-bold">+ $60/month</p>}
              </div>
              <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                Starting estimate only. Final pricing depends on project requirements, content, integrations, and requested custom features.
              </p>
            </div>

            {!showForm && !state.succeeded && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="w-full btn-primary btn-glow py-4 rounded-xl font-bold mt-7"
              >
                Request This Estimate
              </button>
            )}

            {showForm && !state.succeeded && (
              <form onSubmit={handleSubmit} className="mt-7 pt-7 border-t border-gray-100 space-y-4">
                <input type="hidden" name="estimate" value={estimateSummary} />
                <input type="hidden" name="website_package" value={selectedPackage.name} />
                <input type="hidden" name="seo_option" value={supportsSeo ? (includeSeo ? "Basic SEO included" : "Without SEO") : "Not applicable"} />
                <input type="hidden" name="logo_design" value={includesFreeLogo ? "Free logo design if needed" : "Logo design only"} />
                <input type="hidden" name="monthly_maintenance" value={supportsMaintenance ? (maintenance ? "$60 per month" : "Not selected") : "Not applicable"} />
                <input type="hidden" name="estimated_one_time_price" value={`$${oneTimePrice}`} />
                <input type="hidden" name="submission_source" value="Website Price Estimator" />
                <h4 className="text-lg font-bold text-black">Where should we send your estimate?</h4>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 outline-none"
                />
                <input
                  required
                  name="businessName"
                  type="text"
                  placeholder="Business name"
                  value={formData.businessName}
                  onChange={(event) => setFormData({ ...formData, businessName: event.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 outline-none"
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 outline-none"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-600 text-xs" />
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 outline-none"
                />
                <button
                  disabled={state.submitting}
                  type="submit"
                  className="w-full btn-primary btn-glow py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  {state.submitting ? <Loader2 className="animate-spin" size={21} /> : <><Send size={19} /> Send My Estimate</>}
                </button>
              </form>
            )}

            {state.succeeded && (
              <div className="mt-7 bg-green-50 border border-green-200 text-green-800 rounded-2xl p-5 flex gap-3">
                <CheckCircle2 className="flex-shrink-0" />
                <div>
                  <p className="font-bold">Estimate request received!</p>
                  <p className="text-sm mt-1">Jay will contact you to confirm the project details and final price.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
