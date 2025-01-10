'use client'

import React, {createContext,ReactNode,useState} from 'react'
interface PropsListProducts{
    
      id:string,
      name:string,
      price:number | undefined,
      image:string  
}

  type ListProducts = PropsListProducts[]

  interface KeyProductsCheckoutStripe{
    price:string,
    quantity:number
  }

  type typeKeyProductsCheckoutStripe = KeyProductsCheckoutStripe[]

  interface PropsContext{
    haveProduct:boolean,
    listOfProducts:ListProducts,
    setListOfProducts:React.Dispatch<React.SetStateAction<ListProducts>>
    totalPrice:number,
    setTotalPrice:React.Dispatch<React.SetStateAction<number>>,
    quantityProducts:number,
    setQuantityProducts:React.Dispatch<React.SetStateAction<number>>,
    keyProductsStripe:typeKeyProductsCheckoutStripe,
    setKeyProductsStripe:React.Dispatch<React.SetStateAction<typeKeyProductsCheckoutStripe>>
  }
  
    

  interface PropsChildrenContext{
    children:ReactNode
  }

export const ContextIgniteShop = createContext({} as PropsContext)
export function Context({children}:PropsChildrenContext){
    const [haveProduct] = useState(true)
    const [listOfProducts,setListOfProducts] = useState<ListProducts>([])
    const [quantityProducts,setQuantityProducts] = useState(0)
    const [totalPrice,setTotalPrice] = useState(0)
    const [keyProductsStripe,setKeyProductsStripe] = useState<typeKeyProductsCheckoutStripe>([])
   

return(
    <ContextIgniteShop.Provider value={{haveProduct,listOfProducts,setListOfProducts,totalPrice,setTotalPrice,quantityProducts,setQuantityProducts,keyProductsStripe,setKeyProductsStripe}}>
        {children}
    </ContextIgniteShop.Provider>
)
}
