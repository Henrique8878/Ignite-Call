"use client"

import Image from 'next/image'
import ButtonBuy from '@/app/components/button'
import { useContext } from 'react';
import { ContextIgniteShop } from '@/app/_context/Context';

interface ProductProps{
    product:{
        id:string,
        name:string,
        image:string,
        price?:number,
        description:string | null,
        default_price:string
    }
}

export function Product({product}:ProductProps){
    const {setListOfProducts} = useContext(ContextIgniteShop)

    const newProduct = {
        id:product.id,
        name:product.name,
        price:product.price,
        image:product.image
    }

    function UpdateShoppingCart(){
        setListOfProducts((prev)=>[...prev,newProduct])
        console.log("Enviou")
    }
    return(
        <>
            <div className="flex justify-center items-center rounded-md pb-1 px-1 w-[40rem] h-[39rem] bg-gradient-to-b from-[#1fa184] to-[#7465d4]">
                <Image src={product.image} alt={product.name} width={700} height={400} />
            </div>
            <div className='flex flex-col justify-between mt-8'>
                <section className='flex flex-col gap-16'>
                    <div className='flex flex-col gap-8'>
                        <h1 className='text-6xl'>{product.name}</h1>
                        <span className='text-4xl text-[#00b37e] '>{product.price?.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>
                    </div>
                    <div className='flex flex-col gap-10'>
                        <span className='text-2xl'>{product.description}</span>
                    </div>
                </section>
                <ButtonBuy ProductID={product.default_price} PriceID={product.id} UpdateShoppingCart={UpdateShoppingCart}/>
            </div>
        </>    
    )
}