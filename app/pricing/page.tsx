const plans = [
  { name: "Starter", price: "$49/mo", features: ["3 Jobs", "100 Candidates", "20 AI credits"] },
  { name: "Growth", price: "$99/mo", features: ["10 Jobs", "1000 Candidates", "200 AI credits"] },
  { name: "Pro", price: "$199/mo", features: ["Unlimited Jobs", "Unlimited Candidates", "1000 AI credits"] },
];

export default function PricingPage() {
  return (
    <main className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
      <p className="text-gray-400 mb-8">Upgrade HireIQ as your recruitment grows.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <p className="text-3xl font-bold my-4">{plan.price}</p>

            <ul className="space-y-2 mb-6">
              {plan.features.map((feature) => (
                <li key={feature}>✅ {feature}</li>
              ))}
            </ul>

            <button className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl py-3 font-semibold">
              Upgrade Soon
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}