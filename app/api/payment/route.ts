// Source site of the code concept in accepting payment using stripe
// Resource: https://stripe.com/docs/checkout/quickstart ===============

import Stripe from "stripe";
import { NextResponse } from "next/server";
// import { Session } from "inspector";

export async function POST (request: any) {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {});

    let data = await request.json();
    let priceId = data.priceId
    let days = data.days
    let bookId = data.bookId

    const session = await stripe.checkout.sessions.create({
        line_items: [ {
            price: priceId,
            quantity: days
        }
        ],
      mode: 'payment',
      success_url: `http://localhost:3000/book?checkout=success&bookId=${bookId}`,
      cancel_url: 'http://localhost:3000/book?checkout=cancelled',
  
    });

    if(session.success_url) {
        session.success_url = session.success_url + session.id;
    }
    
    const url = session.url;

    return NextResponse.json({ url, id: session.id})
}