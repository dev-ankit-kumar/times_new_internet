import { NextResponse } from 'next/server';
import cards from '@/data/cards.json';

export async function POST(req: Request) {
  const body = await req.json();
  const { profile } = body;

  // ✅ Mock recommendation response
  const mockResponse = `
Based on your profile:
- Income: ${profile.income}
- Spending: ${profile.spending}
- Preferred Benefits: ${profile.benefits}
- Credit Score: ${profile.credit_score}

🔍 Recommended Credit Cards:
1. 🏦 HDFC Millennia – Great for cashback on Amazon/Flipkart.
2. 💳 SBI SimplyCLICK – Best for online shoppers, 10x reward points.
3. 🛒 ICICI Amazon Pay – No fee, high cashback for Prime users.

💡 Estimated annual cashback: ₹6,000–₹9,000 based on your inputs.
  `;

  return NextResponse.json({
    response: mockResponse,
  });
}
