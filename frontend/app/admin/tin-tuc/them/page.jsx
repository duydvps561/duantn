'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import Layout from '@/app/components/admin/Layout';
import './ThemTinTuc.css'
const ThemTinTuc = () => {
  const [formData, setFormData] = useState({
    title: '',
    describe: '',
    content: '',
    loai: 'Tin tức', // Default value
    trangthai: 'Hiện' // Default value
  });
  const [image, setImage] = useState(null);
  const router = useRouter();
  const editorVnRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('describe', formData.describe);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('loai', formData.loai);
      formDataToSend.append('trangthai', formData.trangthai);
      formDataToSend.append('image', image);

      const response = await axios.post('http://localhost:3000/tintuc/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        router.push('/admin/tin-tuc');
      }
    } catch (error) {
      console.error('Error adding tin tuc:', error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <h1 className="title">Thêm Tin Tức</h1>
        <form onSubmit={handleSubmit} className="row newpayper" encType="multipart/form-data">
          <div className="form-group col-6">
            <label className="label">Tiêu đề</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="input new-tap"
            />
          </div>

          <div className="form-group col-6">
            <label className="label">Mô tả</label>
            <input
              type="text"
              name="describe"
              value={formData.describe}
              onChange={handleInputChange}
              required
              className="input new-tap"
            />
          </div>

          <div className="form-group col-12">
            <label className="label">Nội dung</label>
            <Editor
              apiKey="sxuecqw6ie1p3ksawpdq4piz7jvlucsub11a6z83r8atnksh"
              onInit={(evt, editor) => { editorVnRef.current = editor; }}
              value={formData.content}
              init={{
                height: 400,
                menubar: true,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                  'emoticons textcolor colorpicker hr visualchars'
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
          </div>

          <div className="form-group col-4">
            <label className="label">Hình ảnh</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
              className="input new-tap"
            />
          </div>

          <div className="form-group col-4">
            <label className="label">Loại</label>
            <select
              name="loai"
              value={formData.loai}
              onChange={handleInputChange}
              className="select new-tap"
            >
              <option value="Tin tức">Tin tức</option>
              <option value="Sự kiện">Sự kiện</option>
              <option value="Quà tặng">Quà tặng</option>
            </select>
          </div>

          <div className="form-group col-4">
            <label className="label">Trạng thái</label>
            <select
              name="trangthai"
              value={formData.trangthai}
              onChange={handleInputChange}
              className="select new-tap"
            >
              <option value="Ẩn">Ẩn</option>
              <option value="Hiện">Hiện</option>
            </select>
          </div>

          <button type="submit" className="btn submit-button">Thêm</button>
        </form>
      </div>
    </Layout>
  );
};

export default ThemTinTuc;
