import { Link } from 'react-router-dom';
import { Crown, Calendar, CreditCard, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export function DashboardSubscription() {
  const subscription = {
    plan: 'Programa Profesional BIM',
    status: 'active',
    price: '$997,000 COP',
    priceUSD: '$249 USD',
    startDate: '1 Enero 2026',
    renewalDate: '1 Julio 2026',
    daysRemaining: 98,
  };

  const benefits = [
    'Acceso ilimitado a todos los cursos',
    'Acceso a bibliotecas BIM Premium',
    'Certificados de finalización',
    'Soporte prioritario',
    'Contenido exclusivo mensual',
    'Descuentos en eventos y webinars',
  ];

  const paymentHistory = [
    { date: '1 Ene 2026', amount: '$997,000 COP', status: 'Pagado', method: 'Tarjeta •••• 4242' },
    { date: '1 Jul 2025', amount: '$997,000 COP', status: 'Pagado', method: 'Tarjeta •••• 4242' },
    { date: '1 Ene 2025', amount: '$997,000 COP', status: 'Pagado', method: 'Tarjeta •••• 4242' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Mi Suscripción</h1>
        <p className="text-muted-foreground">
          Gestiona tu plan y métodos de pago
        </p>
      </div>

      {/* Current Plan */}
      <div className="mb-8">
        <div className="p-6 rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{subscription.plan}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-1 rounded-full bg-secondary text-white text-xs font-semibold">
                    Activo
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {subscription.daysRemaining} días restantes
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{subscription.price}</div>
              <div className="text-sm text-muted-foreground">{subscription.priceUSD}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Inicio del plan</div>
                <div className="font-medium">{subscription.startDate}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Próxima renovación</div>
                <div className="font-medium">{subscription.renewalDate}</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              Actualizar Plan
            </button>
            <button className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors">
              Cancelar Suscripción
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Benefits */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-xl font-bold mb-4">Beneficios de tu Plan</h3>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Method */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-xl font-bold mb-4">Método de Pago</h3>
          <div className="p-4 rounded-lg border border-border bg-muted/30 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Tarjeta •••• 4242</span>
              </div>
              <span className="text-sm text-muted-foreground">Exp: 12/28</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Visa - Predeterminada
            </div>
          </div>
          <button className="w-full px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium">
            Actualizar Método de Pago
          </button>
        </div>
      </div>

      {/* Payment History */}
      <div className="p-6 rounded-xl border border-border bg-card mb-8">
        <h3 className="text-xl font-bold mb-4">Historial de Pagos</h3>
        <div className="space-y-4">
          {paymentHistory.map((payment, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="font-medium">{payment.amount}</div>
                  <div className="text-sm text-muted-foreground">{payment.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-secondary">{payment.status}</div>
                <div className="text-xs text-muted-foreground">{payment.method}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade CTA */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-primary to-accent text-white text-center">
        <Crown className="h-12 w-12 mx-auto mb-4 opacity-90" />
        <h3 className="text-2xl font-bold mb-2">¿Quieres más beneficios?</h3>
        <p className="mb-6 opacity-90">
          Actualiza al plan Especialista BIM y obtén 12 meses de acceso con descuento
        </p>
        <Link
          to="/#pricing"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition-colors"
        >
          Ver Planes Disponibles
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}