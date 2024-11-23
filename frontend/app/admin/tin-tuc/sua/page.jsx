'use client';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import Layout from '@/app/components/admin/Layout';
import { useRouter, useSearchParams } from 'next/navigation';
import './SuaTinTuc.css';

const SuaTinTuc = () => {
  const [formData, setFormData] = useState({
    title: '',
    describe: '',
    content: '',
    loai: 'Tin tức',
    trangthai: 'Hiện',
  });
  const [currentImage, setCurrentImage] = useState('');
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
        setCurrentImage(`http://localhost:3000/img/tintuc/${response.data.image}`);
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
    } else {
      // Reset hình ảnh khi không chọn
      setImage(null);
      setImagePreview('');
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
      <div className="container-fluid">
        <h1 className="text-center my-4">Sửa Tin Tức</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="row newpayper g-3">
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Describe</label>
            <input
              type="text"
              name="describe"
              className="form-control"
              value={formData.describe}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Content</label>
            {isContentLoaded && (
              <Editor
                apiKey="sxuecqw6ie1p3ksawpdq4piz7jvlucsub11a6z83r8atnksh"
                onInit={(evt, editor) => {
                  editorVnRef.current = editor;
                }}
                value={formData.content}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'emoticons textcolor colorpicker hr visualchars',
                  ],
                  toolbar:
                    'undo redo | formatselect | fontsizeselect | fontselect | bold italic underline strikethrough | ' +
                    'forecolor backcolor | alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | blockquote hr | emoticons removeformat | fullscreen preview',
                  font_formats:
                    'Arial=arial,helvetica,sans-serif;' +
                    'Comic Sans MS=comic sans ms,sans-serif;' +
                    'Courier New=courier new,courier;' +
                    'Georgia=georgia,palatino;' +
                    'Tahoma=tahoma,arial,helvetica,sans-serif;' +
                    'Verdana=verdana,geneva;' +
                    'Times New Roman=times new roman,times;',
                  fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt',
                }}
                onEditorChange={handleEditorChange}
              />
            )}
          </div>
          <div className="col-md-4">
            <label className="form-label">Hình Ảnh Hiện Tại</label>
            <div className="mb-2">
              {currentImage && <img src={currentImage} alt="Hình hiện tại" className="img-fluid" />}
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Hình Mới</label>
            <div className="mb-2">
              {imagePreview ? (
                <img src={imagePreview} alt="Hình mới" className="img-fluid" />
              ) : (
                <p className="text-muted">Chưa có hình mới được chọn</p>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Loại</label>
            <select
              name="loai"
              className="form-select"
              value={formData.loai}
              onChange={handleInputChange}
            >
              <option value="Tin tức">Tin tức</option>
              <option value="Sự kiện">Sự kiện</option>
              <option value="Quà tặng">Quà tặng</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Trạng Thái</label>
            <select
              name="trangthai"
              className="form-select"
              value={formData.trangthai}
              onChange={handleInputChange}
            >
              <option value="Ẩn">Ẩn</option>
              <option value="Hiện">Hiện</option>
            </select>
          </div>
            <button type="submit" className="submit-button">Cập Nhật</button>
        </form>
      </div>
    </Layout>
  );
};

export default SuaTinTuc;
