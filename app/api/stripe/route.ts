// Source site to get stripe API endpoint
// Resource: https://stripe.com ===============

import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(request: any) {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("missing process.env.STRIPE_SECRET_KEY")
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: "2023-10-16"})
    const prices = await stripe.prices.list({
        limit: 4,
    });
   
    prices.data.map
    //console.log("Price ID: "+ prices.data.id );

    return NextResponse.json(prices.data.reverse())
}