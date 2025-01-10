

import { stripe } from "@/lib/stripe";
import Stripe from 'stripe'
import { unstable_cache } from 'next/cache';
import { Product } from './_product-content/product';


interface ProductId{
    id:string
}



const getPageProductId = unstable_cache(
    async({id}:ProductId)=>{
        const response = await stripe.products.retrieve(id,{
            expand:['default_price']
        })
        const price = response.default_price as Stripe.Price 
        const products = {
            id:response.id,
            name:response.name,
            image:response.images[0],
            price:price.unit_amount?price.unit_amount/100:0,
            default_price:price.id,
            description:response.description
        }
    
        return products
    },
    ['products'],
    {revalidate:3600,tags:['post']}
)



export default async function PageProduct({ params }: { params: Promise<{ id:string }> }){
    const resolverParams = await params
    const product = await getPageProductId({id:resolverParams.id})
    
   
    return(
       
       <section className="w-[85%] grid grid-cols-2">
            <Product product={{id:product.id,name:product.name,price:product.price,default_price:product.default_price,description:product.description,image:product.image}}/>
       </section>
    )
}
                            
                           
    

 


                            


