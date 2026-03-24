import { useState } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { CreditCard, Lock, CheckCircle2 } from 'lucide-react';

export default function Payment() {
  const { isDark } = useTheme();
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      setExpiryDate(formatted);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Checkout
          </h1>
          <p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
            Complete your purchase securely
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className={`rounded-lg p-6 ${isDark ? 'bg-neutral-800' : 'bg-white'} shadow-lg`}>
              {/* Security Badge */}
              <div className="flex items-center gap-2 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-700">
                <Lock className="w-5 h-5 text-green-500" />
                <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  Secure payment powered by SSL encryption
                </span>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Payment Method
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setSelectedPayment('card')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedPayment === 'card'
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        : isDark
                        ? 'border-neutral-700 bg-neutral-700/50'
                        : 'border-neutral-200 bg-neutral-50'
                    }`}
                  >
                    <CreditCard className={`w-6 h-6 mx-auto mb-2 ${
                      selectedPayment === 'card' ? 'text-orange-500' : isDark ? 'text-neutral-400' : 'text-neutral-600'
                    }`} />
                    <span className={`text-sm ${
                      selectedPayment === 'card' ? 'text-orange-500 font-semibold' : isDark ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      Card
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedPayment('paypal')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedPayment === 'paypal'
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        : isDark
                        ? 'border-neutral-700 bg-neutral-700/50'
                        : 'border-neutral-200 bg-neutral-50'
                    }`}
                  >
                    <div className={`text-2xl font-bold mx-auto mb-2 ${
                      selectedPayment === 'paypal' ? 'text-orange-500' : isDark ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                      P
                    </div>
                    <span className={`text-sm ${
                      selectedPayment === 'paypal' ? 'text-orange-500 font-semibold' : isDark ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      PayPal
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedPayment('transfer')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedPayment === 'transfer'
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        : isDark
                        ? 'border-neutral-700 bg-neutral-700/50'
                        : 'border-neutral-200 bg-neutral-50'
                    }`}
                  >
                    <div className={`text-2xl font-bold mx-auto mb-2 ${
                      selectedPayment === 'transfer' ? 'text-orange-500' : isDark ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                      $
                    </div>
                    <span className={`text-sm ${
                      selectedPayment === 'transfer' ? 'text-orange-500 font-semibold' : isDark ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      Transfer
                    </span>
                  </button>
                </div>
              </div>

              {/* Card Payment Form */}
              {selectedPayment === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDark
                          ? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-500'
                          : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400'
                      } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDark
                          ? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-500'
                          : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400'
                      } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isDark
                            ? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-500'
                            : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400'
                        } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          if (value.length <= 4) setCvv(value);
                        }}
                        placeholder="123"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isDark
                            ? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-500'
                            : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400'
                        } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PayPal */}
              {selectedPayment === 'paypal' && (
                <div className="py-8 text-center">
                  <p className={`mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    You will be redirected to PayPal to complete your purchase
                  </p>
                  <button className="bg-[#0070ba] text-white px-8 py-3 rounded-lg hover:bg-[#005ea6] transition-colors">
                    Continue with PayPal
                  </button>
                </div>
              )}

              {/* Bank Transfer */}
              {selectedPayment === 'transfer' && (
                <div className={`p-6 rounded-lg ${isDark ? 'bg-neutral-700' : 'bg-neutral-50'}`}>
                  <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Bank Transfer Details
                  </h3>
                  <div className={`space-y-2 text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    <p><span className="font-medium">Bank:</span> JP.BIM Bank</p>
                    <p><span className="font-medium">Account:</span> 1234567890</p>
                    <p><span className="font-medium">SWIFT:</span> JPBIMXXX</p>
                    <p><span className="font-medium">Reference:</span> JPBIM-ORD-12345</p>
                  </div>
                  <p className={`mt-4 text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Please include the reference number in your transfer. Your access will be activated within 24-48 hours after payment confirmation.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`rounded-lg p-6 ${isDark ? 'bg-neutral-800' : 'bg-white'} shadow-lg sticky top-4`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Order Summary
              </h2>

              {/* Course Info */}
              <div className="mb-6">
                <div className={`aspect-video rounded-lg mb-3 ${isDark ? 'bg-neutral-700' : 'bg-neutral-200'}`}>
                  <img
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400"
                    alt="Course"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Complete BIM Professional Certification
                </h3>
                <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  120+ hours • Certificate included
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-700">
                <div className={`flex justify-between text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <span>Course price</span>
                  <span>$299.00</span>
                </div>
                <div className={`flex justify-between text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <span>Discount (20%)</span>
                  <span className="text-green-500">-$59.80</span>
                </div>
                <div className={`flex justify-between text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Total
                </span>
                <span className="text-2xl font-bold text-orange-500">$239.20</span>
              </div>

              {/* Benefits List */}
              <div className="mb-6 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Lifetime access to course content
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Certificate of completion
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Access to community forums
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    30-day money-back guarantee
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
                Complete Purchase
              </button>

              <p className={`text-xs text-center mt-4 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                By completing your purchase, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}