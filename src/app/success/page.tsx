import Image from 'next/image'
import Link from 'next/link'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { redirect } from 'next/navigation'

interface SuccessProps{
    searchParams:Promise<{
        session_id?:string
    }>
}

export default async function Success({searchParams}:SuccessProps){
    const resolvedParams = await searchParams
    const sessionID = resolvedParams.session_id
    if(!sessionID){
        return redirect('/')
    }

    async function FetchDataSessionIdSuccess(){
       
        
        if(!sessionID){
            return
        }
        
        const response = await stripe.checkout.sessions.retrieve(sessionID,{
            expand:['line_items','line_items.data.price.product']
        })
    
        return response
    }

    const newResponse = await FetchDataSessionIdSuccess()
    console.log(newResponse)
    
        return(
            <main className="w-full flex justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-16">
                    <h3 className='text-5xl text-[#e1e1e6]'>Compra efetuada!</h3>
                    <div className='flex gap-2'>
                        {newResponse?.line_items?.data.map((item)=>{
                            const productImage = item.price?.product as Stripe.Product
                            return(
                                <div className="flex justify-center items-center pb-1 pt-4 px-1 w-[10rem] h-[9rem] bg-gradient-to-b from-[#1fa184] to-[#7465d4] rounded-full" key={item.id}>
                                    <Image alt='' src={productImage.images[0]} width={200} height={200}/>
                                </div>
                            )
                        })}
                    </div>
                    <span className='w-96 text-center text-xl text-[#c4c4cc]'>Uhuul! <strong>{newResponse?.customer_details?.name}, </strong>sua compra de { newResponse?.line_items?.data.length&&newResponse?.line_items?.data.length>1?`${newResponse?.line_items?.data.length} camisetas`:`${newResponse?.line_items?.data.length} camiseta`} já está a caminho da sua casa</span>
                    <Link href="/" className='text-[#00b37e] text-2xl'>Voltar ao catálogo</Link>
                </div>
            </main>
        )
    }

    
        
