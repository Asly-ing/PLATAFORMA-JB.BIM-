import { useState } from 'react';
import { X, CreditCard, Building2, Smartphone, Shield, Lock, CheckCircle2 } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  coursePrice: number;
  onPaymentSuccess?: () => void;
}

type PaymentMethod = 'card' | 'bank' | 'paypal' | 'mercadopago';

export function PaymentModal({ 
  isOpen, 
  onClose, 
  courseTitle, 
  coursePrice,
  onPaymentSuccess 
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  if (!isOpen) return null;

  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      name: 'Tarjeta de Crédito/Débito',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'bank' as PaymentMethod,
      name: 'Transferencia Bancaria',
      icon: Building2,
      description: 'Pago mediante transferencia'
    },
    {
      id: 'paypal' as PaymentMethod,
      name: 'PayPal',
      icon: Smartphone,
      description: 'Paga con tu cuenta PayPal'
    },
    {
      id: 'mercadopago' as PaymentMethod,
      name: 'Mercado Pago',
      icon: Smartphone,
      description: 'Paga con Mercado Pago'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      
      // Call success callback after showing success message
      setTimeout(() => {
        onPaymentSuccess?.();
        onClose();
      }, 2000);
    }, 2000);
  };

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

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-border">
        {paymentComplete ? (
          // Success State
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/20 mb-6">
              <CheckCircle2 className="h-10 w-10 text-secondary" />
            </div>
            <h2 className="text-3xl font-bold mb-2">¡Pago Exitoso!</h2>
            <p className="text-muted-foreground mb-6">
              Tu inscripción a <span className="font-medium text-foreground">{courseTitle}</span> ha sido confirmada
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mb-6 inline-block">
              <p className="text-sm text-muted-foreground mb-1">Total pagado</p>
              <p className="text-2xl font-bold text-primary">${coursePrice.toFixed(2)}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Recibirás un correo de confirmación con los detalles de tu compra
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-background z-10">
              <div>
                <h2 className="text-2xl font-bold">Finalizar compra</h2>
                <p className="text-sm text-muted-foreground mt-1">{courseTitle}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                disabled={isProcessing}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-[1fr_380px]">
              {/* Left Side - Payment Form */}
              <div className="p-6 md:p-8">
                {/* Payment Methods */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-4">Método de pago</h3>
                  <div className="grid gap-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all text-left ${
                            selectedMethod === method.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            selectedMethod === method.id
                              ? 'bg-primary/10'
                              : 'bg-muted'
                          }`}>
                            <Icon className={`h-5 w-5 ${
                              selectedMethod === method.id ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium mb-0.5">{method.name}</p>
                            <p className="text-xs text-muted-foreground">{method.description}</p>
                          </div>
                          <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedMethod === method.id
                              ? 'border-primary'
                              : 'border-muted-foreground'
                          }`}>
                            {selectedMethod === method.id && (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={handleSubmit}>
                  {selectedMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Número de tarjeta
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={cardData.number}
                            onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                          <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Nombre en la tarjeta
                        </label>
                        <input
                          type="text"
                          value={cardData.name}
                          onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                          placeholder="JUAN PÉREZ"
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Vencimiento
                          </label>
                          <input
                            type="text"
                            value={cardData.expiry}
                            onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                            placeholder="MM/AA"
                            maxLength={5}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={cardData.cvv}
                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                            placeholder="123"
                            maxLength={4}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'bank' && (
                    <div className="bg-muted/50 rounded-lg p-6 text-center">
                      <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Transferencia Bancaria</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Los datos bancarios serán enviados a tu correo electrónico después de confirmar la compra.
                      </p>
                      <div className="bg-background rounded-lg p-4 text-left text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Banco:</span>
                          <span className="font-medium">Banco Ejemplo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cuenta:</span>
                          <span className="font-medium">XXXX-XXXX-XXXX-1234</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Titular:</span>
                          <span className="font-medium">JP.BIM Platform SRL</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {(selectedMethod === 'paypal' || selectedMethod === 'mercadopago') && (
                    <div className="bg-muted/50 rounded-lg p-6 text-center">
                      <Smartphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">
                        {selectedMethod === 'paypal' ? 'PayPal' : 'Mercado Pago'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Serás redirigido a {selectedMethod === 'paypal' ? 'PayPal' : 'Mercado Pago'} para completar tu pago de forma segura.
                      </p>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="mt-6 flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <Shield className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">Pago 100% seguro</p>
                      <p className="text-muted-foreground text-xs">
                        Tus datos están protegidos con encriptación SSL de 256 bits. 
                        No almacenamos información de tarjetas de crédito.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-6 px-6 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Procesando pago...
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5" />
                        Pagar ${coursePrice.toFixed(2)}
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Side - Order Summary */}
              <div className="bg-muted/30 p-6 md:p-8 border-l border-border">
                <h3 className="font-semibold mb-4">Resumen de compra</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Curso</span>
                    <span className="font-medium">${coursePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Descuento</span>
                    <span className="font-medium text-secondary">-$0.00</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">${coursePrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-background rounded-lg p-4 mb-6">
                  <h4 className="font-medium mb-3 text-sm">Incluye:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
                      Acceso completo al curso
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
                      Certificado al finalizar
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
                      Acceso de por vida
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
                      Recursos descargables
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
                      Soporte del instructor
                    </li>
                  </ul>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p className="mb-2">
                    Al completar tu compra, aceptas nuestros{' '}
                    <a href="#" className="text-primary hover:underline">Términos de Servicio</a>
                    {' '}y{' '}
                    <a href="#" className="text-primary hover:underline">Política de Privacidad</a>.
                  </p>
                  <p>
                    Garantía de devolución de 30 días si no estás satisfecho con el curso.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
