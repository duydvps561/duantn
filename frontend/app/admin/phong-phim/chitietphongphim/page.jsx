// "use client";
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Layout from "@/app/components/admin/Layout";
// import { useRouter, useSearchParams } from 'next/navigation';
// import Swal from 'sweetalert2';
// import styles from './ChiTietPhongPhim.module.css';
// import * as Yup from 'yup';

// const ChiTietPhongPhimPage = () => {
//   const [phongChieuDetail, setPhongChieuDetail] = useState(null);
//   const [loaiphongList, setLoaiphongList] = useState([]);
//   const [selectedGhes, setSelectedGhes] = useState([]);
//   const [loaigheList, setLoaigheList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedLoaigheId, setSelectedLoaigheId] = useState('');
//   const [newGheInfo, setNewGheInfo] = useState({});
//   const [errors, setErrors] = useState({});

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const phongChieuId = searchParams.get('id');

//   const seatSchema = Yup.object().shape({
//     hang: Yup.string().required('Hàng không được bỏ trống'),
//     cot: Yup.string().required('Cột không được bỏ trống')
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [phongchieuRes, loaigheRes, loaiphongRes] = await Promise.all([
//           axios.get(`http://localhost:3000/phongchieu/ghe/${phongChieuId}`),
//           axios.get('http://localhost:3000/loaighe'),
//           axios.get('http://localhost:3000/loaiphong')
//         ]);
//         setPhongChieuDetail(phongchieuRes.data);
//         setLoaigheList(loaigheRes.data);
//         setLoaiphongList(loaiphongRes.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Lỗi khi tải dữ liệu');
//         setLoading(false);
//       }
//     };

//     if (phongChieuId) {
//       fetchData();
//     }
//   }, [phongChieuId]);

//   const handleSeatSelect = (ghe) => {
//     if (selectedGhes.some(selectedGhe => selectedGhe._id === ghe._id)) {
//       setSelectedGhes(selectedGhes.filter(selectedGhe => selectedGhe._id !== ghe._id));
//       const { [ghe._id]: _, ...rest } = newGheInfo; 
//       setNewGheInfo(rest);
//     } else {
//       setSelectedGhes([...selectedGhes, ghe]);
//       setNewGheInfo(prev => ({
//         ...prev,
//         [ghe._id]: { hang: ghe.hang, cot: ghe.cot }
//       }));
//     }
//   };

//   const handleSelectAllSeats = () => {
//     if (selectedGhes.length === phongChieuDetail.ghe.length) {
//       setSelectedGhes([]);
//       setNewGheInfo({});
//     } else {
//       setSelectedGhes(phongChieuDetail.ghe);
//       const allNewGheInfo = phongChieuDetail.ghe.reduce((acc, ghe) => {
//         acc[ghe._id] = { hang: ghe.hang, cot: ghe.cot };
//         return acc;
//       }, {});
//       setNewGheInfo(allNewGheInfo);
//     }
//   };

//   const handleInputChange = (gheId, field, value) => {
//     setNewGheInfo(prev => ({
//       ...prev,
//       [gheId]: {
//         ...prev[gheId],
//         [field]: value,
//       },
//     }));
//   };

//   const handleUpdateGhe = async () => {
//     let isValid = true;
//     const newErrors = {};

//     for (const ghe of selectedGhes) {
//       try {
//         await seatSchema.validate(newGheInfo[ghe._id], { abortEarly: false });
//       } catch (validationErrors) {
//         isValid = false;
//         newErrors[ghe._id] = validationErrors.inner.reduce((acc, err) => {
//           acc[err.path] = err.message;
//           return acc;
//         }, {});
//       }
//     }

//     setErrors(newErrors);

//     if (isValid) {
//       const updatePromises = selectedGhes.map(async (ghe) => {
//         const updatedGhe = { 
//           ...ghe, 
//           hang: newGheInfo[ghe._id]?.hang || ghe.hang, 
//           cot: newGheInfo[ghe._id]?.cot || ghe.cot, 
//           loaighe_id: selectedLoaigheId || ghe.loaighe_id._id 
//         };
//         try {
//           await axios.put(`http://localhost:3000/phongchieu/ghe/update/${ghe._id}`, updatedGhe);
//         } catch (error) {
//           console.error('Error updating seat:', error);
//           Swal.fire('Cập nhật ghế thất bại', '', 'error');
//         }
//       });

//       await Promise.all(updatePromises);
//       Swal.fire('Cập nhật thành công!', '', 'success').then(() => {
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       });
//     } else {
//       Swal.fire('Vui lòng kiểm tra lại thông tin ghế', '', 'error');
//     }
//   };

//   const handleDeleteGhes = async () => {
//     if (selectedGhes.length === 0) return;

//     try {
//       const deletePromises = selectedGhes.map(ghe =>
//         axios.delete(`http://localhost:3000/phongchieu/ghe/delete/${ghe._id}`)
//       );

//       await Promise.all(deletePromises);

//       Swal.fire('Đã xóa ghế thành công!', '', 'success').then(() => {
//         setSelectedGhes([]); 
//         window.location.reload();
//       });
//     } catch (error) {
//       console.error('Error deleting seats:', error);
//       Swal.fire('Xóa ghế thất bại', '', 'error');
//     }
//   };

//   if (loading) return <p>Đang tải dữ liệu...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <Layout>
//       <div className='container'>
//         <h2>Chi tiết phòng chiếu: {phongChieuDetail.phongchieu.tenphong}</h2>
//         <h3>Loại phòng: {phongChieuDetail.phongchieu.loaiphong_id?.loaiphong || 'Không xác định'}</h3>
//         <div className='row'>
//           <div className='col-md-9'>
//             <h3>Danh sách ghế</h3>
//             <button className="btn btn-primary mb-3" onClick={handleSelectAllSeats}>
//               {selectedGhes.length === phongChieuDetail.ghe.length ? "Bỏ chọn tất cả" : "Chọn tất cả"}
//             </button>
//             <table className={`table ${styles.table}`}>
//               <thead>
//                 <tr>
//                   <th>Chọn</th>
//                   <th>Hàng</th>
//                   <th>Cột</th>
//                   <th>Loại ghế</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {phongChieuDetail.ghe.map(ghe => (
//                   <tr key={ghe._id}>
//                     <td>
//                       <input 
//                         type="checkbox" 
//                         checked={selectedGhes.some(selectedGhe => selectedGhe._id === ghe._id)}
//                         onChange={() => handleSeatSelect(ghe)}
//                       />
//                     </td>
//                     <td><span>{ghe.hang}</span></td>
//                     <td><span>{ghe.cot}</span></td>
//                     <td><span>{ghe.loaighe_id?.loaighe || 'Không có loại'}</span></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className='col-md-3'>
//             <h3>Chọn loại ghế để cập nhật:</h3>
//             <select className="form-select" value={selectedLoaigheId} onChange={(e) => setSelectedLoaigheId(e.target.value)}>
//               <option value="">Chọn loại ghế</option>
//               {loaigheList.map(loaighe => (
//                 <option key={loaighe._id} value={loaighe._id}>{loaighe.loaighe}</option>
//               ))}
//             </select>
//               <div className='mt-3 mb-3'>
//               <button onClick={handleUpdateGhe} className="btn btn-primary me-4">Cập nhật ghế</button>
//               <button onClick={handleDeleteGhes} className="btn btn-danger me-2">Xóa ghế</button>
//               </div>
//             <h4>Thay đổi hàng và cột:</h4>
//             {selectedGhes.map(ghe => (
//               <div key={ghe._id} className="mb-3">
//                 <input 
//                   type="text" 
//                   value={newGheInfo[ghe._id]?.hang || ''} 
//                   onChange={(e) => handleInputChange(ghe._id, 'hang', e.target.value)} 
//                   className={`form-control ${errors[ghe._id]?.hang ? 'is-invalid' : ''}`} 
//                   placeholder="Hàng" 
//                 />
//                 <input 
//                   type="text" 
//                   value={newGheInfo[ghe._id]?.cot || ''} 
//                   onChange={(e) => handleInputChange(ghe._id, 'cot', e.target.value)} 
//                   className={`form-control ${errors[ghe._id]?.cot ? 'is-invalid' : ''}`} 
//                   placeholder="Cột" 
//                 />
//                 {errors[ghe._id]?.hang && <div className="invalid-feedback">{errors[ghe._id].hang}</div>}
//                 {errors[ghe._id]?.cot && <div className="invalid-feedback">{errors[ghe._id].cot}</div>}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ChiTietPhongPhimPage;
"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import styles from './ChiTietPhongPhim.module.css';
import * as Yup from 'yup';

const ChiTietPhongPhimPage = () => {
  const [phongChieuDetail, setPhongChieuDetail] = useState(null);
  const [loaiphongList, setLoaiphongList] = useState([]);
  const [selectedGhes, setSelectedGhes] = useState([]);
  const [loaigheList, setLoaigheList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLoaigheId, setSelectedLoaigheId] = useState('');
  const [newGheInfo, setNewGheInfo] = useState({});
  const [errors, setErrors] = useState({});

  const router = useRouter();
  const searchParams = useSearchParams();
  const phongChieuId = searchParams.get('id');

  const seatSchema = Yup.object().shape({
    hang: Yup.string().required('Hàng không được bỏ trống'),
    cot: Yup.string().required('Cột không được bỏ trống')
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [phongchieuRes, loaigheRes, loaiphongRes] = await Promise.all([
          axios.get(`http://localhost:3000/phongchieu/ghe/${phongChieuId}`),
          axios.get('http://localhost:3000/loaighe'),
          axios.get('http://localhost:3000/loaiphong')
        ]);
        setPhongChieuDetail(phongchieuRes.data);
        setLoaigheList(loaigheRes.data);
        setLoaiphongList(loaiphongRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Lỗi khi tải dữ liệu');
        setLoading(false);
      }
    };

    if (phongChieuId) {
      fetchData();
    }
  }, [phongChieuId]);

  const handleSeatSelect = (ghe) => {
    const isSelected = selectedGhes.some(selectedGhe => selectedGhe._id === ghe._id);

    if (isSelected) {
      setSelectedGhes(selectedGhes.filter(selectedGhe => selectedGhe._id !== ghe._id));
      const { [ghe._id]: _, ...rest } = newGheInfo;
      setNewGheInfo(rest);
    } else {
      setSelectedGhes([...selectedGhes, ghe]);
      setNewGheInfo(prev => ({
        ...prev,
        [ghe._id]: { hang: ghe.hang, cot: ghe.cot }
      }));
    }
  };

  const handleSelectAllSeats = () => {
    if (selectedGhes.length === phongChieuDetail.ghe.length) {
      setSelectedGhes([]);
      setNewGheInfo({});
    } else {
      setSelectedGhes(phongChieuDetail.ghe);
      const allNewGheInfo = phongChieuDetail.ghe.reduce((acc, ghe) => {
        acc[ghe._id] = { hang: ghe.hang, cot: ghe.cot };
        return acc;
      }, {});
      setNewGheInfo(allNewGheInfo);
    }
  };

  const handleInputChange = (gheId, field, value) => {
    setNewGheInfo(prev => ({
      ...prev,
      [gheId]: {
        ...prev[gheId],
        [field]: value,
      },
    }));
  };

  const handleUpdateGhe = async () => {
    let isValid = true;
    const newErrors = {};

    for (const ghe of selectedGhes) {
      try {
        await seatSchema.validate(newGheInfo[ghe._id], { abortEarly: false });
      } catch (validationErrors) {
        isValid = false;
        newErrors[ghe._id] = validationErrors.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
      }
    }

    setErrors(newErrors);

    if (isValid) {
      const updatePromises = selectedGhes.map(async (ghe) => {
        const updatedGhe = {
          ...ghe,
          hang: newGheInfo[ghe._id]?.hang || ghe.hang,
          cot: newGheInfo[ghe._id]?.cot || ghe.cot,
          loaighe_id: selectedLoaigheId || ghe.loaighe_id._id
        };
        try {
          await axios.put(`http://localhost:3000/phongchieu/ghe/update/${ghe._id}`, updatedGhe);
        } catch (error) {
          console.error('Error updating seat:', error);
          Swal.fire('Cập nhật ghế thất bại', '', 'error');
        }
      });

      await Promise.all(updatePromises);
      Swal.fire('Cập nhật thành công!', '', 'success').then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
    } else {
      Swal.fire('Vui lòng kiểm tra lại thông tin ghế', '', 'error');
    }
  };

  const handleDeleteGhes = async () => {
    if (selectedGhes.length === 0) return;

    try {
      const deletePromises = selectedGhes.map(ghe =>
        axios.delete(`http://localhost:3000/phongchieu/ghe/delete/${ghe._id}`)
      );

      await Promise.all(deletePromises);

      Swal.fire('Đã xóa ghế thành công!', '', 'success').then(() => {
        setSelectedGhes([]);
        window.location.reload();
      });
    } catch (error) {
      console.error('Error deleting seats:', error);
      Swal.fire('Xóa ghế thất bại', '', 'error');
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;


  const groupedSeats = phongChieuDetail.ghe.reduce((acc, ghe) => {
    if (!acc[ghe.hang]) {
      acc[ghe.hang] = [];
    }
    acc[ghe.hang].push(ghe);
    return acc;
  }, {});

  const sortedRows = Object.keys(groupedSeats).sort().map(hang => {
    // Sort columns (cot) within each row (hang)
    const sortedGhesInRow = groupedSeats[hang].sort((a, b) => parseInt(a.cot) - parseInt(b.cot));
    return sortedGhesInRow;
  });

  return (
    <Layout>
      <div className="container">
        <h2>Chi tiết phòng chiếu: {phongChieuDetail.phongchieu.tenphong}</h2>
        <div className="row ">
          <div className="col-md-9 ">
            <h3>Sơ đồ ghế</h3>
            <button className="btn btn-primary mb-3" onClick={handleSelectAllSeats}>
              {selectedGhes.length === phongChieuDetail.ghe.length ? "Bỏ chọn tất cả" : "Chọn tất cả"}
            </button>
            <div className={styles.seatingChart}>
              {sortedRows.map((row, rowIndex) => (
                <div key={rowIndex} className="d-flex flex-wrap gap-2">
                  {row.map(ghe => {
                    const loaighe = loaigheList.find(lh => lh._id === ghe.loaighe_id._id);
                    const color = loaighe ? loaighe.mau : '#FFFFFF'; // Default to white if not found
                    return (
                      <div
                        key={ghe._id}
                        className={`${styles.seat} ${selectedGhes.some(selectedGhe => selectedGhe._id === ghe._id) ? styles.selected : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleSeatSelect(ghe)}
                      >
                        <span>{ghe.hang}{ghe.cot}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <h3>Chọn loại ghế để cập nhật:</h3>
            <select className="form-select" value={selectedLoaigheId} onChange={(e) => setSelectedLoaigheId(e.target.value)}>
              <option value="">Chọn loại ghế</option>
              {loaigheList.map(loaighe => (
                <option key={loaighe._id} value={loaighe._id}>
                  {loaighe.loaighe}
                </option>
              ))}
            </select>
            <button className="btn btn-success mt-3" onClick={handleUpdateGhe}>
              Cập nhật ghế
            </button>
            <button className="btn btn-danger mt-3" onClick={handleDeleteGhes}>
              Xóa ghế đã chọn
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChiTietPhongPhimPage;

