// Source site to get stripe API endpoint
// Resource: https://stripe.com ===============

import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(request: any) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const prices = await stripe.prices.list({
        limit: 4,
    });
   
    prices.data.map
    console.log("Price ID: "+ prices.data.id );

    return NextResponse.json(prices.data.reverse())
}