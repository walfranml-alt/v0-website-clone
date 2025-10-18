import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { paypalEmail } = await request.json()

    console.log("[v0] PayPal payout request received for:", paypalEmail)

    if (!paypalEmail) {
      return NextResponse.json({ error: "PayPal email is required" }, { status: 400 })
    }

    // PayPal API credentials from environment variables
    const clientId = process.env.PAYPAL_CLIENT_ID
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET
    const mode = process.env.PAYPAL_MODE || "sandbox" // 'sandbox' or 'live'

    console.log("[v0] PayPal mode:", mode)
    console.log("[v0] Client ID exists:", !!clientId)
    console.log("[v0] Client Secret exists:", !!clientSecret)

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
    console.log("[v0] Using PayPal API URL:", baseURL)

    // Step 1: Get Access Token
    console.log("[v0] Requesting PayPal access token...")
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
      console.error("[v0] PayPal auth error:", JSON.stringify(errorData, null, 2))
      return NextResponse.json(
        {
          error: "Failed to authenticate with PayPal",
          details: errorData.error_description || errorData.message || "Authentication failed",
          paypalError: errorData,
        },
        { status: 500 },
      )
    }

    const authData = await authResponse.json()
    const accessToken = authData.access_token
    console.log("[v0] Access token obtained successfully")

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

    console.log("[v0] Sending payout request:", JSON.stringify(payoutData, null, 2))

    const payoutResponse = await fetch(`${baseURL}/v1/payments/payouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payoutData),
    })

    const payoutResult = await payoutResponse.json()
    console.log("[v0] PayPal payout response:", JSON.stringify(payoutResult, null, 2))

    if (!payoutResponse.ok) {
      console.error("[v0] PayPal payout error - Status:", payoutResponse.status)
      console.error("[v0] PayPal payout error - Response:", JSON.stringify(payoutResult, null, 2))

      return NextResponse.json(
        {
          error: payoutResult.message || "Failed to process payout",
          details: payoutResult.details?.[0]?.issue || payoutResult.error_description || "Unknown error",
          paypalError: payoutResult,
          mode: mode,
          hint:
            mode === "sandbox"
              ? "Make sure you're using a PayPal Sandbox test account email"
              : "Check if your PayPal account has payout permissions",
        },
        { status: payoutResponse.status },
      )
    }

    console.log("[v0] PayPal payout success! Batch ID:", payoutResult.batch_header?.payout_batch_id)

    return NextResponse.json({
      success: true,
      message: "Payment sent successfully!",
      batchId: payoutResult.batch_header?.payout_batch_id,
      mode: mode,
    })
  } catch (error) {
    console.error("[v0] PayPal payout exception:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
