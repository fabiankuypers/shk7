// Backend API endpoint für Payment Intent Creation
// Diese Datei zeigt dir, was du auf deinem Backend implementieren musst

export async function createPaymentIntent(req: any, res: any) {
  const stripe = require('stripe')('sk_live_...'); // Dein Secret Key hier
  
  try {
    const { payment_method_id, email, name, company, amount } = req.body;

    // Für die kostenlose Testphase erstellen wir einen Setup Intent statt Payment Intent
    // Das speichert die Zahlungsmethode für zukünftige Abbuchungen
    const setupIntent = await stripe.setupIntents.create({
      payment_method: payment_method_id,
      customer: await createOrGetCustomer(email, name, company),
      confirm: true,
      usage: 'off_session',
    });

    // Erstelle auch ein Subscription für die zukünftige Abbuchung
    const subscription = await stripe.subscriptions.create({
      customer: setupIntent.customer,
      items: [{ price: 'price_1234567890' }], // Deine Price ID für 9 EUR/Monat
      trial_period_days: 90,
      default_payment_method: payment_method_id,
    });

    res.json({
      success: true,
      setup_intent: setupIntent,
      subscription: subscription,
    });

  } catch (error) {
    console.error('Payment error:', error);
    res.status(400).json({ error: error.message });
  }
}

async function createOrGetCustomer(email: string, name: string, company: string) {
  const stripe = require('stripe')('sk_live_...');
  
  // Prüfe ob Customer bereits existiert
  const existingCustomers = await stripe.customers.list({
    email: email,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0].id;
  }

  // Erstelle neuen Customer
  const customer = await stripe.customers.create({
    email: email,
    name: name,
    metadata: {
      company: company || '',
    },
  });

  return customer.id;
}