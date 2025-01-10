
import { stripe } from '@/lib/stripe' 
import { NextResponse,NextRequest} from 'next/server'
export async function POST(request:NextRequest) {
    
    const body = await request.json()
    const {key} = body
    const SuccesURL=`${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const CancelURL=`${process.env.NEXT_URL}/`
    const checkoutSessions = await stripe.checkout.sessions.create({
        success_url:SuccesURL,
        cancel_url:CancelURL,
        mode:'payment',
        line_items:key
    })

   return NextResponse.json({
    checkoutURL:checkoutSessions.url
   })
   
}
   
  