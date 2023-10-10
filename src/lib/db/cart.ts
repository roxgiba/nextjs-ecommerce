import  {prisma} from "./prisma";
import { cookies } from "next/dist/client/components/headers";
import { Cart, CartItem, Prisma } from "@prisma/client";


export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: {include : {product:true}}}
}>

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include : { product: true}
}>

export type ShoppingCart = CartWithProducts & {
  size: number,
  subtotal: number,
}

export async function getCart() : Promise<ShoppingCart | null>{
  const localCartId = cookies().get("localCardId")?.value
  const cart = localCartId ?
  await prisma.cart.findUnique({
    where: {id: localCartId},
    include: { items: {include : {product:true}}}
  }) 
  : null;

  if(!cart){
    return null;
  }

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
  }
}

export async function createCart(): Promise<ShoppingCart>{
  const newCart = await prisma.cart.create({
    data:{}
  })


  // Note: Needs encryption + secure settings in real production app
  cookies().set("localCardId", newCart.id);

  return{
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
}


}