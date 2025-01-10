'use client'

import Image from 'next/image'
import IgniteSymbol from '../assets/Ignite simbol.png'
import emptyBag from '@/app/assets/empty_bag.png'
import fullBag from '@/app/assets/full_bag.png'
import axios from 'axios'
import { useContext } from 'react'
import { ContextIgniteShop } from '../_context/Context'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from '@/components/ui/button'


export default function Nav(){

    
    
const {listOfProducts,setListOfProducts,keyProductsStripe} = useContext(ContextIgniteShop)

function RemoveProductShoppingCart(id:string){
    const filteredArray = listOfProducts.filter((object)=>object.id!==id)
    setListOfProducts(filteredArray)
}

function SumTotalValueListOfProducts(){
    const totalValue = listOfProducts.reduce((accumulator,product)=>{
        if(product.price!=undefined){
            return accumulator+=product.price
        }else{
            return accumulator
        }
    },0)

    return totalValue.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})
}


async function PostCheckoutSession(){
    try{
        const response = await axios.post('/api',{
            key:keyProductsStripe
        })

        const {checkoutURL} = response.data
        window.location.href = checkoutURL
    }catch(e){
        alert(`Falha na requisição ${e}`)
    }
}

    return(
        <>
            <nav className="w-[85%] mt-6 flex justify-between">
                <section className="flex gap-4 w-36">
                    <Image src={IgniteSymbol} alt=""/>
                    <div className="flex flex-col">
                        <span className='text-3xl font-semibold'>Ignite</span>
                        <span className='text-xl'>shop</span>
                    </div>
                </section>
                {listOfProducts.length>0?( 
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Image src={fullBag} alt=''/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='h-screen flex flex-col justify-between w-[45rem] bg-[#202024] border border-[#202024] py-24 px-20' align='start'>
                            <section className='flex flex-col gap-6'>
                                <DropdownMenuLabel className='text-[#e1e1e6] text-3xl'>Sacola de compras</DropdownMenuLabel>
                                
                                                           {listOfProducts.map((item)=>{
                                    return(
                                        <DropdownMenuItem className='flex gap-8 hover:bg-none rounded-lg' key={item.id}>
                                        <div className="flex justify-center items-center rounded-2xl pb-1 px-1 w-40 h-40 bg-gradient-to-b from-[#1fa184] to-[#7465d4]">
                                            <Image src={item.image}alt='' width={100} height={100}/>
                                        </div>
                                        <div className='h-full flex flex-col pt-4 gap-4'>
                                            <span className='text-[#c4c4cc] text-2xl'>{item.name}</span>
                                            <span className='text-[#e1e1e6] text-2xl font-semibold'>{item.price?.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>
                                            <span className='text-[#00b37e] text-2xl font-semibold cursor-pointer' onClick={()=>RemoveProductShoppingCart(item.id)}>Remover</span>
                                        </div>
                                    </DropdownMenuItem>
                                    )
                                                           })}
                            </section>
                            <section className='flex flex-col gap-20 mb-24'>
                                <main className='flex flex-col gap-4'>
                                    <div className='flex justify-between'>
                                        <span className='text-[#e1e1e6] text-2xl'>Quantidade</span>
                                        <span className='text-[#e1e1e6] text-2xl'>{listOfProducts.length} item(s)</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-[#c9c9ce] text-3xl font-semibold'>Valor Total</span>
                                        <span className='text-[#e1e1e6] text-3xl font-semibold'>{SumTotalValueListOfProducts()}</span>
                                    </div>
                                </main>
                                <Button variant='greenIrland' className='w-full h-20 text-2xl font-semibold rounded-lg' onClick={()=>PostCheckoutSession()}>Finalizar compra</Button>
                            </section>
                        </DropdownMenuContent>
                </DropdownMenu>):(<Image src={emptyBag} alt=''/>)}
            </nav>
        </>
    )
}
        
        
              





