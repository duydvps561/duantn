'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; 
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import Layout from '@/app/components/admin/Layout';

const ThemTinTuc = () => {
  const [formData, setFormData] = useState({
    title: '',
    describe: '',
    content: '',
    loai: 0,
    trangthai: 1
  });
  const [image, setImage] = useState(null); 
  const router = useRouter(); 
  const editorVnRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleEditorChange = (content) => {
    setFormData({
      ...formData,
      content
    });
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
            <div>
      <h1>Thêm Tin Tức</h1>
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
          <Editor
                apiKey="sxuecqw6ie1p3ksawpdq4piz7jvlucsub11a6z83r8atnksh"
                onInit={(evt, editor) => { editorVnRef.current = editor; }}
                initialValue={formData.content}
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
                onEditorChange={(content) => handleEditorChange(content, editorVnRef.current, 'content')}
              />
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange} // Handle file upload
            required
          />
        </div>
        <div>
          <label>Loại</label>
          <input
            type="number"
            name="loai"
            value={formData.loai}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Trạng Thái</label>
          <input
            type="number"
            name="trangthai"
            value={formData.trangthai}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Thêm</button>
      </form>
    </div>
    </Layout>
  );
};

export default ThemTinTuc;
