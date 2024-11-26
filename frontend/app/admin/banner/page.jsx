"use client"
import Layout from "@/app/components/admin/Layout";
import './style.module.css'
import useSWR from "swr";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Swal from 'sweetalert2';
export default function Banner() {
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: banners, error: bannerError, mutate } = useSWR(`http://localhost:3000/banner`, fetcher);

    const [formData, setFormData] = useState({
        name: '',
        image: null,
        type: 'defaultType',
        hidden: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, image, type, hidden } = formData;
        const data = new FormData();
        data.append('name', name);
        data.append('image', image);
        data.append('type', type);
        data.append('hidden', hidden);

        try {
            const response = await fetch('http://localhost:3000/banner/add', {
                method: 'POST',
                body: data,
            });
            if (response.ok) {
                alert("Banner added successfully!");
                mutate();
                setFormData({ name: '', image: null, type: 'defaultType', hidden: false });
            } else {
                const errorMessage = await response.text();
                alert(`Error adding banner: ${errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            alert("Error adding banner");
        }
    };

    const toggleHidden = async (id, currentStatus) => {
        try {
            const response = await fetch(`http://localhost:3000/banner/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hidden: !currentStatus }),
            });
            if (response.ok) {    
                alert("Banner status updated successfully!");
                console.log(currentStatus);
                mutate(); // Refresh the banner data
            } else {
                const errorMessage = await response.text();
                alert(`Failed to update banner status: ${errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            alert("Error updating banner status");
        }
    };
    const deleteBanner = async (id) => {
        if (confirm("Bạn có chắc chắn muốn xóa banner này?")) {
            try {
                const response = await fetch(`http://localhost:3000/banner/delete/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert("Banner deleted successfully!");
                    mutate(); // Refresh the banner data
                } else {
                    const errorMessage = await response.text();
                    alert(`Failed to delete banner: ${errorMessage}`);
                }
            } catch (error) {
                console.error(error);
                alert("Error deleting banner");
            }
        }
    };

    if (bannerError) {
        return <div>Error loading banner data</div>;
    }
    if (!banners) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <div className="text-center m-3">
                <h3 className="uppercase">Thiết lập tùy chỉnh website</h3>
            </div>
            <div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label className="text-dark" htmlFor="name">Mời nhập tên</label><br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    /><br />
                    <label className="text-dark" htmlFor="image">Chọn ảnh</label><br />
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    /><br />
                    <label className="text-dark" htmlFor="type">Chọn loại</label><br />
                    <select 
                        id="type" 
                        name="type" 
                        value={formData.type} 
                        onChange={handleInputChange}
                    >
                        <option value="defaultType">Loại Mặc định</option>
                        <option value="A">Banner Chính</option>
                        <option value="B">Banner Phụ</option>
                    </select><br />
                    <label>
                        <input
                            type="checkbox"
                            name="hidden"
                            checked={formData.hidden}
                            onChange={handleInputChange}
                        />
                        <span className="text-dark"> Ẩn Banner</span>
                    </label><br />
                    <br />
                    <button className="btn btn-success" type="submit">Lưu</button>
                </form>
            </div>
            <div>
                <h3 className="text-center">Danh sách Banner</h3>
            </div>
            <div className="container mt-3">
                <table className="table table-striped">
                    <thead className="thead-list">
                        <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">NAME</th>
                            <th className="text-center">ẢNH</th>
                            <th className="text-center">LOẠI</th>
                            <th className="text-center">TRẠNG THÁI</th>
                            <th className="text-center">THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            banners.map((item, index) => (
                                <tr key={item.id} className="align-middle">
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{item.name}</td>
                                    <td className="d-flex justify-content-center">
                                        <Image 
                                            src={`http://localhost:3000/img/banner/${item.img}`}
                                            alt={item.name}
                                            width={80}
                                            height={60}
                                            className="d-block rounded"
                                        />
                                    </td>
                                    <td className="text-center">
                                        {item.type === 'A' ? 'Banner Chính' : 'Banner Phụ'}
                                    </td>
                                    <td className="text-center">
                                        {item.hidden ? 'Ẩn' : 'Hiện'}
                                    </td>
                                    <td className="text-center">
                                        <div>
                                            <Link href={`/admin/banner/edit?id=${item._id}`} className="btn btn-success">
                                                Sửa
                                            </Link>
                                            <button 
                                                className="btn btn-warning ms-2"
                                                onClick={() => toggleHidden(item._id, item.hidden)}
                                            >
                                                {item.hidden ? 'Hiện' : 'Ẩn'}
                                            </button>
                                            <button 
                                                className="btn btn-danger ms-2"
                                                onClick={() => deleteBanner(item._id)}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}