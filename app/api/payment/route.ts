// Source site of the code concept in accepting payment using stripe
// Resource: https://stripe.com/docs/checkout/quickstart ===============

import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST (request) {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    let data = await request.json();
    let priceId = data.priceId
    let days = data.days

    const session = await stripe.checkout.sessions.create({
        line_items: [ {
            price: priceId,
            quantity: days
        }
        ],
      mode: 'payment',
      success_url: 'http://localhost:3000/book',
      cancel_url: 'http://localhost:3000/book'
    })

    return NextResponse.json(session.url)
}