import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const AddMyReview = () => {
    const handleReview = event => {
        event.preventDefault();

        const review = {
            rating: event.target.rating.value,
            image: event.target.image.value,
            description: event.target.description.value,

        }




        axios.post('https://cryptic-springs-54649.herokuapp.com/reviews', review)
            .then(response => {
                const { data } = response;
                if (data.insertedId) {
                    toast('Product has been added')
                    event.target.reset()
                }
            })

    }

    return (
        <div className="grid grid-1 place-items-center mb-12">
            <div className="card lg:w-1/2 sm:w-3/4 md:w-3/4 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Add Your Review Here</h2>
                    <form onSubmit={handleReview}>
                        <div className="form-control my-3">
                            
                            <select
                                name="rating"
                                className="select select-bordered w-full max-w-lg"
                                required
                            >
                                <option disabled selected>
                                    Give a rating
                                </option>
                                <option defaultValue="1">1</option>
                                <option defaultValue="2">2</option>
                                <option defaultValue="3">3</option>
                                <option defaultValue="4">4</option>
                                <option defaultValue="5">5</option>
                            </select>
                        </div>
                        <div className="form-control my-3">
                            <label className="label">
                                <span className="label-text">Insert Square Image</span>
                            </label>
                            <input type="text" required name="image" placeholder="Image Link" className="input w-full max-w-xs input-bordered input-md" />
                        </div>
                        <div className="form-control my-3">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea required className="textarea input w-full max-w-xs input-bordered" name="description" placeholder="Description"></textarea>
                        </div>



                        <div className="card-actions justify-end">
                            <button type='submit' className="btn btn-primary">Add Now</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMyReview;