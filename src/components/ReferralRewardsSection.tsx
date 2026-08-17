import { ArrowRight, Gift } from "lucide-react";
import { Link } from "react-router-dom";

const rewards = [
  { name: "1-Page Website", amount: 20 },
  { name: "3-Page Website", amount: 40 },
  { name: "5-Page Website", amount: 60 },
  { name: "10-Page Website", amount: 80 },
  { name: "E-Commerce Store", amount: 100 },
  { name: "Logo Design Only", amount: 20 },
];

export default function ReferralRewardsSection() {
  return (
    <section id="referral-rewards" className="py-20 md:py-24 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
          <div>
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-xl shadow-blue-600/20">
              <Gift size={31} />
            </div>
            <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Referral Rewards</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 leading-tight">
              Refer a Business. Earn a Visa Gift Card.
            </h2>
            <p className="text-gray-400 text-lg mt-6 leading-relaxed">
              Send a new website or logo-design customer to Jay's Web Design Services. When their qualifying package is paid in full, you receive the corresponding Visa gift-card reward.
            </p>
            <p className="text-gray-500 text-sm mt-4">
              Website rewards stay the same whether the customer selects the package with or without SEO.
            </p>
            <p className="text-gray-400 text-sm mt-3">
              Anyone can participate, self-referrals are accepted, rewards may be split, and there is no limit to how many qualifying customers you can refer.
            </p>
            <Link
              to="/referral-rewards"
              className="inline-flex items-center gap-2 btn-primary btn-glow px-8 py-4 rounded-xl font-bold mt-8"
            >
              Submit a Referral
              <ArrowRight size={19} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <Link
                key={reward.name}
                to="/referral-rewards"
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-2xl p-5 flex items-center justify-between gap-4 transition-all group"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-blue-400">Visa Gift Card</p>
                  <h3 className="text-lg font-bold mt-2">{reward.name}</h3>
                </div>
                <div className="bg-blue-600 group-hover:bg-blue-500 rounded-xl px-4 py-3 text-xl font-extrabold transition-colors">
                  ${reward.amount}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
