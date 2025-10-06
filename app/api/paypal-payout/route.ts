import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { paypalEmail } = await request.json()

    if (!paypalEmail) {
      return NextResponse.json({ error: "PayPal email is required" }, { status: 400 })
    }

    // PayPal API credentials from environment variables
    const clientId = process.env.PAYPAL_CLIENT_ID
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET
    const mode = process.env.PAYPAL_MODE || "sandbox" // 'sandbox' or 'live'

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        {
          error:
            "PayPal credentials not configured. Please add PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET to environment variables.",
        },
        { status: 500 },
      )
    }

    const baseURL = mode === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

    // Step 1: Get Access Token
    const authResponse = await fetch(`${baseURL}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    })

    if (!authResponse.ok) {
      const errorData = await authResponse.json()
      console.error("[v0] PayPal auth error:", errorData)
      return NextResponse.json({ error: "Failed to authenticate with PayPal" }, { status: 500 })
    }

    const authData = await authResponse.json()
    const accessToken = authData.access_token

    // Step 2: Create Payout
    const payoutData = {
      sender_batch_header: {
        sender_batch_id: `batch_${Date.now()}`,
        email_subject: "You have received a payment from Amazon Jobs",
        email_message: "Congratulations! You have received a verification payment.",
      },
      items: [
        {
          recipient_type: "EMAIL",
          amount: {
            value: "0.01",
            currency: "USD",
          },
          receiver: paypalEmail,
          note: "Amazon Jobs verification payment",
          sender_item_id: `item_${Date.now()}`,
        },
      ],
    }

    const payoutResponse = await fetch(`${baseURL}/v1/payments/payouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payoutData),
    })

    if (!payoutResponse.ok) {
      const errorData = await payoutResponse.json()
      console.error("[v0] PayPal payout error:", errorData)
      return NextResponse.json(
        { error: errorData.message || "Failed to process payout" },
        { status: payoutResponse.status },
      )
    }

    const payoutResult = await payoutResponse.json()
    console.log("[v0] PayPal payout success:", payoutResult)

    return NextResponse.json({
      success: true,
      message: "Payment sent successfully!",
      batchId: payoutResult.batch_header.payout_batch_id,
    })
  } catch (error) {
    console.error("[v0] PayPal payout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
