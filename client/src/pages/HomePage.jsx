import React, { useEffect, useState } from 'react'
import { getCourses } from '../services/courseApi'
import { addTocart } from '../services/cartApi'
import { toast } from 'sonner'

function HomePage() {
    const [courses, setCourse] = useState([])

    useEffect(() => {
        getCourses().then((res) => {
            console.log(res?.data)
            setCourse(res?.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])


    const handleAddTocart = (id) => {
        addTocart(id).then((res) => {
            console.log(res)
            toast.success("product added to cart")
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.error)

        })
    }

    return (
        <div className='flex gap-3'>
            {
                courses.map((course) => (
                    <div key={course?._id} className="card bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img
                                src={course.image}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{course?.title}</h2>
                            <p>{course?.description}</p>
                            <p>price:{course?.price}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={() => handleAddTocart(course._id)}>Add To cart</button>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default HomePage
