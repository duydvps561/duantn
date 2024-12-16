"use client";
import Layout from "@/app/components/admin/Layout";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams

export default function Edit() {
    const router = useRouter();
    const searchParams = useSearchParams(); // Get search params
    const id = searchParams.get('id'); // Extract the id from search params

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: banner, error } = useSWR(id ? `https://backend-duan-9qb7.onrender.com/banner/${id}` : null, fetcher);
    
    const [formData, setFormData] = useState({
        name: '',
        image: null,
        type: 'defaultType',
        hidden: false,
    });

    useEffect(() => {
        if (banner) {
            setFormData({
                name: banner.name,
                image: null, // Keep this null to avoid overriding the existing image
                type: banner.type,
                hidden: banner.hidden,
            });
        }
    }, [banner]);

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
        if (image) data.append('image', image); // Only append if a new image is provided
        data.append('type', type);
        data.append('hidden', hidden);

        try {
            const response = await fetch(`http://localhost:3000/banner/update/${id}`, {
                method: 'PATCH',
                body: data,
            });
            if (response.ok) {
                alert("Banner updated successfully!");
                router.push('/admin/banner'); // Redirect to the banner list
            } else {
                const errorMessage = await response.text();
                alert(`Error updating banner: ${errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            alert("Error updating banner");
        }
    };

    if (error) {
        return <div>Error loading banner data</div>;
    }
    if (!banner) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <div className="text-center m-3">
                <h3 className="uppercase">Chỉnh sửa Banner</h3>
            </div>
            <div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label className="text-dark" htmlFor="name">Tên</label><br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    /><br />
                    <label className="text-dark" htmlFor="image">Chọn ảnh (Bỏ qua nếu không thay đổi)</label><br />
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
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
                    <button className="btn btn-success" type="submit">Cập nhật</button>
                </form>
            </div>
        </Layout>
    );
}