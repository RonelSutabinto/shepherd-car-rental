// Source site of the code concept in accepting payment using stripe
// Resource: https://stripe.com/docs/checkout/quickstart ===============

import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST (request: any) {

    // Checking if the Stripe secret key is available in the environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("missing process.env.STRIPE_SECRET_KEY")
    }

    // Creating a new instance of the Stripe object and specifying the API version
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: "2023-10-16"});

    // Parsing the JSON data from the request body
    let data = await request.json();
    let priceId = data.priceId
    let days = data.days
    let bookId = data.bookId

    console.log("Request object", data.pathname)
    
    // Creating a Stripe checkout session with specific parameters
    const session = await stripe.checkout.sessions.create({
        line_items: [ {
            price: priceId,
            quantity: days
        }
        ],
      mode: 'payment',
      success_url: `${data.pathname}?checkout=success&bookId=${bookId}`,
      cancel_url: `${data.pathname}?checkout=cancelled`,
  
    });

    if(session.success_url) {
        session.success_url = session.success_url + session.id;
    }
    
    const url = session.url;

    return NextResponse.json({ url, id: session.id})
}