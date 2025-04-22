import React, { useEffect, useState } from 'react'
import { getCart, makePayment } from '../services/cartApi'
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHED_KEY_STRIPE);

function Cartpage() {

    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        getCart().then((res) => {
            console.log(res);
            setCartItems(res?.data?.courses)

        }).catch((err) => {
            console.log(err);

        })
    }, [])


    const makePaymentFunction = async () => {
        const body = {
            products: cartItems
        }

        const response = await makePayment(body)
        console.log(response.data.sessionId, "stripe");

        const session = response.data.sessionId

        const stripe = await stripePromise

        if (stripe) {
            const result = await stripe.redirectToCheckout({
                sessionId: session
            })

            if (result.error) {
                console.log(result.error.message);

            }
        } else {
            console.log('Stripe failed to load');
        }
    }

    return (
        <div className="space-y-3">
            {
                cartItems?.map((item) => (
                    <div className=" bg-gray-100 shadow-xl flex items-center w-full justify-between p-5 text-black">
                        <figure>
                            <img
                                src={item?.courseId?.image}
                                alt="Shoes" className='h-[100px]' />
                        </figure>
                        <div className="">
                            <p>PRICE:{item?.price}</p>
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Remove</button>
                        </div>
                    </div>
                ))
            }

            <button className='btn btn-success' onClick={makePaymentFunction} >Checkout</button>
        </div>
    )
}

export default Cartpage
