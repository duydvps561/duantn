'use client';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import Layout from '@/app/components/admin/Layout';
import { useRouter, useSearchParams } from 'next/navigation';

const SuaTinTuc = () => {
  const [formData, setFormData] = useState({
    title: '',
    describe: '',
    content: '',
    loai: 'Tin tức', // Set default to 'Tin tức'
    trangthai: 'Hiện' // Set default to 'Hiện'
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const editorVnRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tinTucId = searchParams.get('id');

  useEffect(() => {
    const fetchTinTuc = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tintuc/${tinTucId}`);
        setFormData({
          title: response.data.title,
          describe: response.data.describe,
          content: response.data.content,
          loai: response.data.loai,
          trangthai: response.data.trangthai,
        });
        setImagePreview(`http://localhost:3000/img/${response.data.image}`);
        setIsContentLoaded(true);
      } catch (error) {
        console.error('Error fetching tin tức data:', error);
      }
    };

    if (tinTucId) {
      fetchTinTuc();
    }
  }, [tinTucId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditorChange = (content) => {
    setFormData({
      ...formData,
      content,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('describe', formData.describe);
    formDataToSend.append('content', formData.content);
    formDataToSend.append('loai', formData.loai);
    formDataToSend.append('trangthai', formData.trangthai);
    if (image) {
      formDataToSend.append('image', image);
    }

    try {
      await axios.put(`http://localhost:3000/tintuc/update/${tinTucId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Cập nhật tin tức thành công!');
      router.push('/admin/tin-tuc');
    } catch (error) {
      console.error('Error updating tin tức:', error);
    }
  };

  return (
    <Layout>
      <h1>Sửa Tin Tức</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Describe</label>
          <input
            type="text"
            name="describe"
            value={formData.describe}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Content</label>
          {isContentLoaded && (
            <Editor
              apiKey="sxuecqw6ie1p3ksawpdq4piz7jvlucsub11a6z83r8atnksh"
              onInit={(evt, editor) => { editorVnRef.current = editor; }}
              value={formData.content}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help'
              }}
              onEditorChange={handleEditorChange}
            />
          )}
        </div>
        <div>
          <label>Hình Ảnh Hiện Tại</label>
          <div>
            {imagePreview && (
              <img src={imagePreview} alt="Hình Ảnh Hiện Tại" style={{ width: '200px', height: 'auto' }} />
            )}
          </div>
        </div>
        <div>
          <label>Thay Đổi Hình Ảnh</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <label>Loại</label>
          <select name="loai" value={formData.loai} onChange={handleInputChange}>
            <option value="Tin tức">Tin tức</option>
            <option value="Sự kiện">Sự kiện</option>
            <option value="Quà tặng">Quà tặng</option>
          </select>
        </div>
        <div>
          <label>Trạng Thái</label>
          <select name="trangthai" value={formData.trangthai} onChange={handleInputChange}>
            <option value="Ẩn">Ẩn</option>
            <option value="Hiện">Hiện</option>
          </select>
        </div>
        <button type="submit">Cập Nhật</button>
      </form>
    </Layout>
  );
};

export default SuaTinTuc;
