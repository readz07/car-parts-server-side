import React from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading/Loading';
import SocialSignIn from '../SocialSignIn/SocialSignIn';
const SingUp = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth,{sendEmailVerification:true});

    //update profile initailize
    const [updateProfile, updating, updateProfileError] = useUpdateProfile(auth);
    //react-router form validation
    const { register, handleSubmit, formState: { errors } } = useForm();
    //handle form submit
    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({ displayName: data.name})
        console.log(data);
    }

    let errorMsg;
    if (error || updateProfileError) {
        errorMsg =
            <div>
                <p>Error: {error.message}</p>
            </div>

    }
    if (loading || updating) {
        return <Loading></Loading>;
    }
    if (user) {
        return (
            <div>
                <p>Registered User: {user.email}</p>
            </div>
        );
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div class="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Type Name Here" class="input input-bordered" {...register("name", {
                                required: { value: true, message: "Name is required" }
                            })} />

                            <label class="label">
                                {errors.email?.type === 'required' && <span class="label-text text-red-500">{errors.name?.message}</span>}                                
                            </label>
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Type Email Here" class="input input-bordered"
                                {...register("email", {
                                    required: { value: true, message: "Email is required" },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Please provied a valid email address'
                                    }
                                })}

                            />
                            <label class="label">
                                {errors.email?.type === 'required' && <span class="label-text text-red-500">{errors.email?.message}</span>}
                                {errors.email?.type === 'pattern' && <span class="label-text text-red-500">{errors.email?.message}</span>}

                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Type Password" class="input input-bordered"
                                {...register("password", {
                                    required: { value: true, message: "Password is required" },
                                    minLength: {value:8, message:"Password must be more than 8 characters"}
                                    
                                })}
                            />
                            <label class="label">
                                {errors.password?.type === 'required' && <span class="label-text text-red-500">{errors.password?.message}</span>}                               
                                {errors.password?.type === 'minLength' && <span class="label-text text-red-500">{errors.password?.message}</span>}                               
                            </label>
                            <label class="label">
                                Are You Already A Member?<Link to="/signin" class="text-blue-600 link link-hover">Sign In Here</Link>
                            </label>
                        </div>
                    
                    <p className='text-red-500'>{errorMsg}</p>
                    <div class="form-control mt-6">
                        <button type='submit' class="btn btn-primary">Sign Up</button>
                    </div>
                    </form>
                    <div class="divider">OR</div>
                    <SocialSignIn/>
                </div>
            </div>
            
        </div>
    );
};

export default SingUp;