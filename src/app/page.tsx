import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { stripe } from '@/lib/stripe';
import { unstable_cache } from 'next/cache';
import Stripe from 'stripe'
import Link from 'next/link'


const fetchProducts = unstable_cache(
  async()=>{
    const response = await stripe.products.list({
      expand:['data.default_price']
    });
    const products = response.data.map(product => {
      const price = product.default_price as Stripe.Price;
      return {
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: price?.unit_amount ? price.unit_amount / 100 : 0, // Converte de centavos para dólares
      };
    });
  
    return products;
  },
  ['products'],
  {revalidate:3600,tags:['posts']}
)

export default async function Home() {
  const products = await fetchProducts();

  return (
    <Carousel className='w-[150rem]'>
      <CarouselContent className='flex gap-20'>
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
            <CarouselItem  className="basis-1/2">
              <div className="flex flex-col rounded-md pb-1 px-1 w-[54rem] h-[50rem] bg-gradient-to-b from-[#1fa184] to-[#7465d4]">
                <section className="flex justify-center items-center h-[85%] border border-green-500">
                  <Image src={product.image} alt={product.name} width={600} height={400} />
                </section>
                <div className="flex justify-between items-center rounded-md px-6 h-[15%] bg-[#282735]">
                  <span className="font-semibold text-2xl">{product.name}</span>
                  <span className="font-medium text-[#00b37e] text-2xl">
                    {product.price.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
                  </span>
                </div>
              </div>
            </CarouselItem>
          </Link>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
