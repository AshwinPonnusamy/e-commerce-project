import http from 'http';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51R9PdkIv5wX47CdTN3wFIctM2VZT0UySBg2fmihFvGnVq3QCOqkhAiCbCPJ2lMnskSOwzCzHtWR59itafFkbQYRP00FVVQF6JB', {
    apiVersion: '2025-03-31.basil',
    typescript: true,
});

const YOUR_DOMAIN = 'http://localhost:5173';

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/create-checkout-session') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const { amount, itemName } = JSON.parse(body);

                if (!amount || !itemName) {
                    throw new Error('Missing required fields: amount or itemName');
                }

                console.log('Processing payment for:', { amount, itemName });

                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price_data: {
                                currency: 'inr',
                                product_data: { name: itemName },
                                unit_amount: amount,
                            },
                            quantity: 1,
                        },
                    ],
                    mode: 'payment',
                    success_url: `${YOUR_DOMAIN}/layout/orderDetails/payment-status/success`,
                    cancel_url: `${YOUR_DOMAIN}/layout/orderDetails/payment-status/failed`,
                    

                });

                console.log('Stripe session created:', session.url);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ url: session.url }));
            } catch (error) {
                console.error('Stripe Error:', (error as Error).stack);

                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: (error as Error).message }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(4242, () => {
    console.log('🚀 Server running at http://localhost:4242');
});
