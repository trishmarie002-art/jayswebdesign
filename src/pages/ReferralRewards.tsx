import { useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useForm, ValidationError } from "@formspree/react";
import { CheckCircle2, Gift, Loader2, Send, Users } from "lucide-react";
import { saveLead } from "../services/leadService";

const rewards = [
  { package: "1-Page Website", reward: 20, description: "With or without basic SEO" },
  { package: "3-Page Website", reward: 40, description: "With or without basic SEO" },
  { package: "5-Page Website", reward: 60, description: "With or without basic SEO" },
  { package: "10-Page Website", reward: 80, description: "With or without basic SEO" },
  { package: "E-Commerce Store", reward: 100, description: "Online store with up to 100 products" },
  { package: "Logo Design Only", reward: 20, description: "Standalone $150 logo package" },
];

export default function ReferralRewards() {
  const [state, handleFormspreeSubmit] = useForm("mqegywzr");
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    referrerPhone: "",
    referredName: "",
    referredBusiness: "",
    referredPhone: "",
    referredEmail: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const details = [
      `Referred by: ${formData.referrerName}`,
      `Referrer phone: ${formData.referrerPhone}`,
      `Referrer email: ${formData.referrerEmail}`,
      `Referred contact: ${formData.referredName}`,
      `Referred email: ${formData.referredEmail || "Not provided"}`,
    ].join(" | ");

    try {
      await saveLead({
        name: formData.referredName,
        phone: formData.referredPhone,
        businessName: formData.referredBusiness,
        websiteType: "Referral - Package not selected yet",
        email: formData.referredEmail,
        projectDescription: details,
        source: "referral_form",
      });
    } catch (error) {
      console.error("Referral save failed but continuing with Formspree:", error);
    }

    await handleFormspreeSubmit(event);
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <Helmet>
        <title>Referral Rewards | Jay's Web Design Services</title>
        <meta name="description" content="Refer a new website or logo-design customer to Jay's Web Design Services and earn a Visa gift card after their qualifying package is paid in full." />
        <link rel="canonical" href="https://jayswebdesignservices.com/referral-rewards" />
      </Helmet>

      <section className="bg-black text-white py-20 md:py-28 text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-600 flex items-center justify-center mb-7 shadow-xl shadow-blue-600/20">
            <Gift size={40} />
          </div>
          <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Share Jay's Web Design</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-4">Refer a Business. Earn a Visa Gift Card.</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-7 leading-relaxed">
            Introduce a new customer to Jay's Web Design Services. When they purchase and pay for a qualifying website or logo package, you receive the corresponding Visa gift-card reward.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Reward Amounts</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black mt-3">Earn More When They Build More</h2>
            <p className="text-gray-600 text-lg mt-5">Website referral rewards remain the same whether the customer chooses the package with or without SEO.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((item) => (
              <div key={item.package} className="bg-white rounded-3xl border border-gray-100 shadow-lg p-7 hover:-translate-y-1 transition-transform">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Visa Gift Card</p>
                    <h3 className="text-xl font-bold text-black mt-2">{item.package}</h3>
                  </div>
                  <div className="bg-black text-white rounded-2xl px-4 py-3 text-2xl font-extrabold">${item.reward}</div>
                </div>
                <p className="text-gray-500 mt-5">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
            <div className="bg-blue-600 text-white rounded-3xl p-8 md:p-10">
              <Users size={38} className="mb-6" />
              <h2 className="text-3xl font-extrabold">How It Works</h2>
              <ol className="mt-8 space-y-6">
                {[
                  "Submit the referral form with your information and the business owner's contact details.",
                  "Jay contacts the referred customer to discuss their website or logo project.",
                  "The customer selects a qualifying package and pays the project balance in full.",
                  "You receive the Visa gift card assigned to the purchased package.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center flex-shrink-0 font-extrabold">{index + 1}</span>
                    <p className="text-blue-50 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-9 pt-7 border-t border-blue-400/40 space-y-3 text-sm text-blue-100">
                <p className="flex gap-2"><CheckCircle2 size={18} className="flex-shrink-0" /> Reward applies to new customers only.</p>
                <p className="flex gap-2"><CheckCircle2 size={18} className="flex-shrink-0" /> One reward is issued per qualifying customer purchase.</p>
                <p className="flex gap-2"><CheckCircle2 size={18} className="flex-shrink-0" /> Reward is issued after the qualifying package is paid in full.</p>
                <p className="flex gap-2"><CheckCircle2 size={18} className="flex-shrink-0" /> Self-referrals and duplicate referrals do not qualify.</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl border border-gray-100 p-8 md:p-10">
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Submit a Referral</span>
              <h2 className="text-3xl font-extrabold text-black mt-3 mb-3">Who can we help?</h2>
              <p className="text-gray-600 mb-8">Please confirm that the referred person has given permission for their contact information to be shared.</p>

              {!state.succeeded ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="submission_source" value="Referral Rewards Page" />
                  <div>
                    <h3 className="font-bold text-black mb-4">Your information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input required name="referrerName" placeholder="Your full name" value={formData.referrerName} onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })} className="md:col-span-2 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
                      <input required type="email" name="referrerEmail" placeholder="Your email" value={formData.referrerEmail} onChange={(e) => setFormData({ ...formData, referrerEmail: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
                      <input required type="tel" name="referrerPhone" placeholder="Your phone" value={formData.referrerPhone} onChange={(e) => setFormData({ ...formData, referrerPhone: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
                    </div>
                  </div>
                  <div className="pt-5 border-t border-gray-200">
                    <h3 className="font-bold text-black mb-4">Referred business information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input required name="referredName" placeholder="Contact's full name" value={formData.referredName} onChange={(e) => setFormData({ ...formData, referredName: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
                      <input required name="referredBusiness" placeholder="Business name" value={formData.referredBusiness} onChange={(e) => setFormData({ ...formData, referredBusiness: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
                      <input required type="tel" name="referredPhone" placeholder="Contact's phone" value={formData.referredPhone} onChange={(e) => setFormData({ ...formData, referredPhone: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
                      <input type="email" name="referredEmail" placeholder="Contact's email (optional)" value={formData.referredEmail} onChange={(e) => setFormData({ ...formData, referredEmail: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
                    </div>
                  </div>
                  <label className="flex gap-3 text-sm text-gray-600 cursor-pointer">
                    <input required type="checkbox" name="permissionConfirmed" value="Yes" className="mt-1 w-4 h-4 accent-blue-600" />
                    I confirm that this person has given permission to share their contact information with Jay's Web Design Services.
                  </label>
                  <ValidationError prefix="Form" errors={state.errors} className="text-red-600 text-sm" />
                  <button disabled={state.submitting} type="submit" className="w-full btn-primary btn-glow py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                    {state.submitting ? <Loader2 className="animate-spin" /> : <><Send size={19} /> Submit Referral</>}
                  </button>
                </form>
              ) : (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-7 flex gap-4">
                  <CheckCircle2 className="flex-shrink-0" size={28} />
                  <div>
                    <h3 className="text-xl font-bold">Referral received!</h3>
                    <p className="mt-2">Jay will review the referral and contact the business owner. Keep an eye on your email or phone for reward updates.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
