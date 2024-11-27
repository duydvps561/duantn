"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';


const ReservationForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3000/lienhe/add', formData);
            if (response.status === 201) {
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Chúng tôi đã nhận được góp ý của quý khách.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                reset();
            }
        } catch (error) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Đã xảy ra lỗi khi gửi dữ liệu.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error('Error submitting form data', error);
        }
    };

    return (
        <div className='container-fluid'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 address'>
                        <h2>ADDRESS</h2>
                        <div>
                            <Link href=""> 264 Đ. Nam Kỳ Khởi Nghĩa, Phường 8, Quận 3, Hồ Chí Minh, Việt Nam</Link>
                        </div>
                        <br />
                        <div><span>Email:</span><a href="mailto:Canalisnightclub@gmail.com"> Canalisnightclub@gmail.com</a></div> <br />
                        <div><span>Phone:</span> <a href="tel:+849387654321">0938 765 4321</a></div> <br />
                        <div><img src="/img/logo/facebook.png" alt="" /><a href="https://www.facebook.com/canalisclub.vn/">https://www.facebook.com/canalisclub.vn/</a></div> <br />
                        <div><img src="/img/logo/instagram.png" alt="Instagram" /><a href="https://www.instagram.com/canalisnightclub">https://www.instagram.com/canalisnightclub</a></div>
                    </div>
                    <div className='col-md-6 get-in-touch'>
                        <h2>GET IN TOUCH</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                type="text"
                                placeholder="Name"
                                {...register('name', { required: true })}
                            />
                            {errors.name && <span>Name is required</span>} <br />
                            <input
                                type="email"
                                placeholder="Email"
                                {...register('email', { required: true })}
                            />
                            {errors.email && <span>Email is required</span>} <br />
                            <input
                                type="tel"
                                placeholder="Phone"
                                {...register('phone', { required: true })}
                            />
                            {errors.phone && <span>Phone number is required</span>} <br />
                            <textarea
                                placeholder="Contact"
                                {...register('contact', { required: true })}
                            ></textarea>
                            {errors.contact && <span>Contact message is required</span>} <br />
                            <button type="submit">SEND NOW</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationForm;