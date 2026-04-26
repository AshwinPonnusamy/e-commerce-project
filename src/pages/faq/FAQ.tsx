import React, { useState } from "react";
import { ChevronDown, HelpCircle, Truck, CreditCard, RefreshCcw, ShieldCheck } from "lucide-react";

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqCategories = [
    {
      title: "Shipping & Delivery",
      icon: <Truck size={20} />,
      questions: [
        {
          q: "How long does shipping take?",
          a: "Standard shipping typically takes 3-5 business days. Express delivery is available for select pincodes and usually arrives within 24-48 hours."
        },
        {
          q: "Do you offer free shipping?",
          a: "Yes! We offer free standard shipping on all orders over ₹1,000. For orders below this threshold, a flat shipping fee of ₹150 applies."
        }
      ]
    },
    {
      title: "Payments & Security",
      icon: <CreditCard size={20} />,
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit/debit cards, UPI (Google Pay, PhonePe, Paytm), and Net Banking. Cash on Delivery is also available for most locations."
        },
        {
          q: "Is my payment information secure?",
          a: "Absolutely. We use industry-standard SSL encryption and secure payment gateways (Razorpay) to ensure your data is 100% protected."
        }
      ]
    },
    {
      title: "Returns & Refunds",
      icon: <RefreshCcw size={20} />,
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a hassle-free 7-day return policy for most items. The product must be unused and in its original packaging with all tags intact."
        },
        {
          q: "How long do refunds take?",
          a: "Once we receive and inspect the returned item, your refund will be processed within 5-7 business days to your original payment method."
        }
      ]
    },
    {
      title: "Product & Quality",
      icon: <ShieldCheck size={20} />,
      questions: [
        {
          q: "Are the products authentic?",
          a: "Every product on OMNISTORE is 100% authentic. We source directly from brands and authorized distributors to ensure the highest quality."
        },
        {
          q: "Do you provide a warranty?",
          a: "Most electronic products and gadgets come with a standard 1-year manufacturer warranty. Specific warranty details can be found on individual product pages."
        }
      ]
    }
  ];

  const allQuestions = faqCategories.flatMap(cat => cat.questions);

  return (
    <div className="min-h-screen bg-[#FDFDFF] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <HelpCircle size={14} />
            Support Center
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase mb-6">
            Frequently Asked <span className="text-violet-600">Questions</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
            Everything you need to know about OMNISTORE. Can't find the answer? Our support team is always here to help.
          </p>
        </div>

        {/* Categories & Questions */}
        <div className="space-y-16">
          {faqCategories.map((category, catIdx) => (
            <div key={catIdx}>
              <div className="flex items-center gap-3 mb-8 ml-2">
                <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-lg shadow-violet-600/20">
                  {category.icon}
                </div>
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">{category.title}</h2>
              </div>

              <div className="grid gap-4">
                {category.questions.map((item, qIdx) => {
                  const globalIdx = allQuestions.findIndex(q => q.q === item.q);
                  const isOpen = activeIndex === globalIdx;
                  
                  return (
                    <div 
                      key={qIdx}
                      className={`group border rounded-2xl transition-all duration-500 ${
                        isOpen ? 'bg-white border-violet-100 shadow-xl shadow-violet-600/5' : 'bg-transparent border-gray-100 hover:border-violet-200'
                      }`}
                    >
                      <button
                        onClick={() => setActiveIndex(isOpen ? null : globalIdx)}
                        className="w-full flex items-center justify-between px-6 py-5 text-left"
                      >
                        <span className={`text-base font-bold tracking-tight transition-colors ${isOpen ? 'text-violet-600' : 'text-gray-900'}`}>
                          {item.q}
                        </span>
                        <div className={`p-2 rounded-full transition-all duration-500 ${isOpen ? 'bg-violet-600 text-white rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                          <ChevronDown size={18} />
                        </div>
                      </button>
                      
                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-6 pt-2 text-gray-500 font-medium text-sm leading-relaxed border-t border-violet-50/50">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-24 p-10 md:p-16 bg-[#1A1A2E] rounded-3xl text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="relative z-10">
            <h3 className="text-3xl font-black text-white tracking-tighter uppercase mb-4">Still have questions?</h3>
            <p className="text-gray-400 text-sm font-medium mb-10 max-w-md mx-auto">
              Our support team is active 24/7 to ensure your OMNISTORE experience is nothing short of exceptional.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-10 py-4 bg-violet-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-700 transition-all shadow-xl shadow-violet-600/20">
                Chat With Us
              </button>
              <button className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                Email Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
