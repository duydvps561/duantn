// "use client"; 
// import React from 'react';
// import Layout from "@/app/components/admin/Layout";
// import styles from './QuanLyDoAn.module.css'; // CSS module for styling
// import '../../globals.css'; // Import global styles

// const QuanLyDoAnPage = () => {
//   // Mock data for the food list
//   return (
//     <Layout>
//       <h1>Quản Lý Đồ Ăn</h1>
//       <p>Đây là trang quản lý đồ ăn.</p>

//       {/* Nút Thêm Đồ Ăn */}
//       <div className={styles.addFoodButtonContainer}>
//         <button className={styles.addFoodButton}>Thêm Đồ Ăn</button>
//       </div>

//       {/* Tables Section */}
//       <div className={styles.tablesContainer}>
//         <div className={styles.tableSection}>
//           <h2 className={styles.tableTitle}>Danh Sách Đồ Ăn</h2>
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>STT</th>
//                 <th>Ảnh</th>
//                 <th>Tên</th>
//                 <th>Giá</th>
//                 <th>Loại</th>
//                 <th>Trạng Thái</th>
//                 <th>Thao Tác</th>
//               </tr>
//             </thead>
//             <tbody>
//               {foodItems.map((food, index) => (
//                 <tr key={food.id}>
//                   <td>{index + 1}</td>
//                   <td><img src={food.image} alt={food.name} className={styles.foodImage} /></td>
//                   <td>{food.name}</td>
//                   <td>{food.price}</td>
//                   <td>{food.type}</td>
//                   <td>{food.status}</td>
//                   <td>
//                     <button className={styles.editButton}>Sửa</button>
//                     <button className={styles.deleteButton}>Xóa</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default QuanLyDoAnPage;
"use client"; 
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import styles from './QuanLyDoAn.module.css'; 
import '../../globals.css';
import Link from 'next/link';
const FoodList = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:3000/food'); 
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/food/delete/${id}`); 
      setFoods(foods.filter(food => food._id !== id));
    } catch (error) {
      console.error('Error deleting food item:', error);
    }
  };

  return (
    <Layout>
      <h1>Quản Lý Đồ Ăn</h1>
      <p>Đây là trang quản lý đồ ăn.</p>

      {/* Nút Thêm Đồ Ăn */}
      <div className={styles.addFoodButtonContainer}>
        <Link href="/admin/do-an/them">
          <button className={styles.addFoodButton}>Thêm Đồ Ăn</button>
        </Link>
      </div>

      {/* Tables Section */}
      <div className={styles.tablesContainer}>
        <div className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Danh Sách Đồ Ăn</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Hình</th>
                <th>Giá</th>
                <th>Loại</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food, index) => (
                <tr key={food._id}>
                  <td>{index + 1}</td>
                  <td>{food.tenfood}</td>
                  <td><img src={`http://localhost:3000/img/${food.img}`} alt={food.tenfood} className={styles.foodImage} /></td>
                  <td>{food.gia} VND</td>
                  <td>{food.loai}</td>
                  <td>{food.trangthai === 1 ? 'Còn hàng' : 'Hết hàng'}</td>
                  <td>
                    <Link href={`/admin/do-an/sua?id=${food._id}`}>
                      <button className={styles.editButton}>Sửa</button>
                    </Link>
                    <button 
                      className={styles.deleteButton} 
                      onClick={() => handleDelete(food._id)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default FoodList;