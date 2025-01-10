"use client";
import { Button } from "@/components/ui/button"
import { useContext } from "react";
import { ContextIgniteShop } from "../_context/Context";
// import axios from 'axios'

interface buttonProps{
    ProductID:string,
    PriceID:string,
    UpdateShoppingCart:()=>void
}

export default function ButtonBuy({UpdateShoppingCart,ProductID,PriceID}:buttonProps){

   
    const {listOfProducts,setKeyProductsStripe} = useContext(ContextIgniteShop)
    const isProduct = listOfProducts.some((item)=>item.id===PriceID)
    
function addnewKeyProductShoppingCart(){
    
    const newKeyProduct = {
        price:ProductID,
        quantity:1
    }
    setKeyProductsStripe((prev)=>[...prev,newKeyProduct])
} 
   
    return(
        <>
        {isProduct?
            (
                <Button variant="greenIrland" className='w-full h-20 text-2xl font-semibold' disabled>
                    Colocar na sacola
                </Button>
                )
            :
            (
                <Button variant="greenIrland" className='w-full h-20 text-2xl font-semibold' onClick={()=>{
                    UpdateShoppingCart()
                    addnewKeyProductShoppingCart()
                    }}>
                    Colocar na sacola
                </Button>
            )
        }
            
        </>
    )
}