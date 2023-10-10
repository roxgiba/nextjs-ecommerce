import { ShoppingCart } from '@/lib/db/cart'
import React from 'react'

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

function ShoppingCartButton({cart} : ShoppingCartButtonProps) {
  return (
    <div className='dropdown dropdown-end'>
      
    </div>
  )
}

export default ShoppingCartButton