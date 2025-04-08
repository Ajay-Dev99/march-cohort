import React, { useEffect, useState } from 'react'
import { getCart } from '../services/cartApi'

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
        </div>
    )
}

export default Cartpage
