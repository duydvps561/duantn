
import './ticket.css'
export default function Ticket() {
    return (
        <>
            <div className="container">
                <h2 className="t-title">Giá vé</h2>
                <p className="apply-date">(áp dụng từ ngày 01/06/2024)</p>
                <div className="t-section-1">
                    <h2 className="table-title">1. GIÁ VÉ XEM PHIM 2D</h2>
                    <table class="ticket-table">
                        <thead>
                            <tr>
                                <th ></th>
                                <th colSpan={3} className="t-time" >Từ thứ 2 đến thứ 5<br></br>
                                    From Monday to Thursday</th>
                                <th colSpan={3} className="t-time" >Thứ 6, 7, CN và ngày Lễ <br></br>
                                    Friday, Saturday, Sunday & public holiday</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row" className="t-time">Thời gian</td>
                                <th scope="col" className="t-time">Ghế thường
                                    Standard</th>
                                <th scope="col" className="vip">Ghế VIP
                                    VIP</th>
                                <th scope="col" className="cuple">Ghế đôi
                                    Sweetbox</th>
                                <th scope="col" className="t-time">Ghế thường
                                    Standard</th>
                                <th scope="col" className="vip">Ghế VIP
                                    VIP</th>
                                <th scope="col" className="cuple">Ghế đôi
                                    Sweetbox</th>
                            </tr>
                            <tr>
                                <td scope="row" className="t-row">Trước 12h<br></br>
                                    Before 12PM</td>
                                <th scope="col" className="standard">55.000đ</th>
                                <th scope="col" className="vip">65.000đ</th>
                                <th scope="col" className="cuple">140.000đ</th>
                                <th scope="col" className="standard">70.000đ</th>
                                <th scope="col" className="vip">80.000đ</th>
                                <th scope="col" className="cuple">170.000đ</th>
                            </tr>
                            <tr>
                                <td scope="row" className="t-row">Từ 12:00 đến trước 17:00 <br></br>
                                    From 5PM to before 11:00PM</td>
                                <th scope="col" className="standard">70.000đ</th>
                                <th scope="col" className="vip">75.000đ</th>
                                <th scope="col" className="cuple">160.000đ</th>
                                <th scope="col" className="standard">80.000đ</th>
                                <th scope="col" className="vip">85.000đ</th>
                                <th scope="col" className="cuple">180.000đ</th>
                            </tr>
                            <tr>
                                <td scope="row" className="t-row">Từ 17:00 đến trước 23:00<br></br>
                                    From 5PM to before 11:00PM</td>
                                <th scope="col" className="standard">80.000đ</th>
                                <th scope="col" className="vip">85.000đ</th>
                                <th scope="col" className="cuple">180.000đ</th>
                                <th scope="col" className="standard">90.000đ</th>
                                <th scope="col" className="vip">95.000đ</th>
                                <th scope="col" className="cuple">200.000đ</th>
                            </tr>
                            <tr>
                                <td scope="row" className="t-row">Từ 12:00 đến trước 17:00<br></br>
                                    From 5PM to before 11:00PM</td>
                                <th scope="col" className="standard">65.000đ</th>
                                <th scope="col" className="vip">70.000đ</th>
                                <th scope="col" className="cuple">150.000đ</th>
                                <th scope="col" className="standard">75.000đ</th>
                                <th scope="col" className="vip">80.000đ</th>
                                <th scope="col" className="cuple">170.000đ</th>
                            </tr>
                        </tbody>
                    </table>
                    <p className="notice">* Đối với phim có thời lượng từ 150 phút trở lên: phụ thu 10.000 VNĐ / vé</p>
                </div>
                <div className="t-section-2">
                    <h2 className="table-title">2. GIÁ VÉ XEM PHIM 3D</h2>
                    <table class="ticket-table">
                        <thead>
                            <tr>
                                <th ></th>
                                <th colSpan={3} className="t-time" >Từ thứ 2 đến thứ 5<br></br>
                                    From Monday to Thursday</th>
                                <th colSpan={3} className="t-time" >Thứ 6, 7, CN và ngày Lễ <br></br>
                                    Friday, Saturday, Sunday & public holiday</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row" className="t-time">Thời gian</td>
                                <th scope="col" className="t-time">Ghế thường
                                    Standard</th>
                                <th scope="col" className="vip">Ghế VIP
                                    VIP</th>
                                <th scope="col" className="cuple">Ghế đôi
                                    Sweetbox</th>
                                <th scope="col" className="t-time">Ghế thường
                                    Standard</th>
                                <th scope="col" className="vip">Ghế VIP
                                    VIP</th>
                                <th scope="col" className="cuple">Ghế đôi
                                    Sweetbox</th>
                            </tr>
                            <tr>
                                <td scope="row" className="t-row">Trước 12h<br></br>
                                    Before 12PM</td>
                                <th scope="col" className="standard">60.000đ</th>
                                <th scope="col" className="vip">80.000đ</th>
                                <th scope="col" className="cuple">160.000đ</th>
                                <th scope="col" className="standard">80.000đ</th>
                                <th scope="col" className="vip">100.000đ</th>
                                <th scope="col" className="cuple">200.000đ</th>
                            </tr>
                            <tr>
                                <td scope="row" className="t-row">Từ 12:00 đến trước 17:00 <br></br>
                                    From 5PM to before 11:00PM</td>
                                <th scope="col" className="standard">80.000đ</th>
                                <th scope="col" className="vip">90.000đ</th>
                                <th scope="col" className="cuple">180.000đ</th>
                                <th scope="col" className="standard">100.000đ</th>
                                <th scope="col" className="vip">110.000đ</th>
                                <th scope="col" className="cuple">220.000đ</th>
                            </tr>
                            <tr>
                                <td scope="row" className="t-row">Từ 17:00 đến trước 23:00<br></br>
                                    From 5PM to before 11:00PM</td>
                                <th scope="col" className="standard">100.000đ</th>
                                <th scope="col" className="vip">110.000đ</th>
                                <th scope="col" className="cuple">220.000đ</th>
                                <th scope="col" className="standard">130.000đ</th>
                                <th scope="col" className="vip">140.000đ</th>
                                <th scope="col" className="cuple">280.000đ</th>
                            </tr>
                            <tr>
                                <td scope="row" className="t-row">Từ 12:00 đến trước 17:00<br></br>
                                    From 5PM to before 11:00PM</td>
                                <th scope="col" className="standard">100.000đ</th>
                                <th scope="col" className="vip">110.000đ</th>
                                <th scope="col" className="cuple">220.000đ</th>
                                <th scope="col" className="standard">120.000đ</th>
                                <th scope="col" className="vip">130.000đ</th>
                                <th scope="col" className="cuple">260.000đ</th>
                            </tr>
                        </tbody>
                    </table>
                    <p className="notice">* Đối với phim có thời lượng từ 150 phút trở lên: phụ thu 10.000 VNĐ / vé</p>
                </div>
                <div className="t-section-3">
                    <div className="ticket-detail">
                        <div className="d-1">
                            <p>* Giá vé đối với các đối tượng khán giả ưu tiên (khi trực tiếp sử dụng dịch vụ xem phim tại rạp chiếu phim):</p>
                            <span>- Giảm 20% giá vé theo qui định đối với: Trẻ em (người dưới 16 tuổi), người cao tuổi (công dân Việt Nam từ đủ 60 tuổi trở lên), người có công với cách mạng, người có hoàn cảnh đặc biệt khó khăn.
                                <br />
                                - Giảm 50% giá vé theo qui định đối với: Người khuyết tật nặng.
                                <br />
                                - Giảm giá vé 100% đối với: Người khuyết tật đặc biệt nặng, trẻ em dưới 0.7m đi kèm với người lớn.
                            </span>
                        </div>
                        <div className="d-2">
                            <h5>Điều kiện:</h5>
                            <span>- Chỉ áp dụng khi mua vé tại quầy (không áp dụng khi mua online).
                                <br />
                                - Các đối tượng khán giả trên phải xuất trình giấy tờ chứng minh khi mua vé xem phim và trước khi vào phòng chiếu. Cụ thể:
                                <br />
                                + Trẻ em (trường hợp trẻ em từ 14-16 tuổi), người cao tuổi: xuất trình "Căn cước công dân".
                                <br />
                                + Người có công với cách mạng: xuất trình giấy xác nhận theo quy định.
                                <br />
                                + Người có hoàn cảnh đặc biệt khó khăn: xuất trình "Giấy chứng nhận hộ nghèo".
                                <br />
                                + Người khuyết tật: xuất trình "Giấy xác nhận khuyết tật".
                            </span>
                        </div>
                        <p>* Ưu đãi cho học sinh, sinh viên từ 22 tuổi trở xuống: Đồng giá 55.000đ /vé 2D cho tất cả các suất chiếu phim từ Thứ 2 đến Thứ 6 (chỉ áp dụng cho hình thức mua vé trực tiếp tại quầy, không áp dụng với ghế đôi; Mỗi thẻ được mua 1 vé/ngày và vui lòng xuất trình thẻ U22 kèm thẻ HSSV khi mua vé).</p>
                        <p>* Khán giả nghiêm túc thực hiện xem phim đúng độ tuổi theo phân loại phim: P, K, T13, T16, T18, C. (Trường hợp vi phạm sẽ xử phạt theo Quy định tại Nghị định 128/2022/NĐ-CP ngày 30/12/2022).</p>
                        <p>* Không bán vé cho trẻ em dưới 13 tuổi đối với các suất chiếu phim kết thúc sau 22h00 và không bán vé cho trẻ em dưới 16 tuổi đối với các suất chiếu phim kết thúc sau 23h00.</p>
                        <div className="d-3">
                            <h5>* Áp dụng giá vé ngày Lễ, Tết cho các ngày:</h5>
                            <span>
                                - Các ngày nghỉ Lễ, Tết theo quy định của nhà nước: Tết Nguyên Đán, Tết Dương Lịch, ngày Giỗ Tổ Hùng Vương 10/3 AL, ngày 30/4, 1/5, 2/9.
                                <br />
                                - Các ngày: 14/2, 8/3, 24/12.
                                <br />
                                - Các ngày: Nghỉ bù do nghỉ Lễ, Tết trùng vào thứ 7, Chủ Nhật.
                            </span>
                        </div>
                        <p>* Không áp dụng các chế độ ưu đãi, các chương trình khuyến mại khác vào các ngày 20/10, 20/11, Halloween 31/10, các ngày Lễ, Tết, suất chiếu sớm và suất chiếu đặc biệt.</p>
                        <p>* Mua vé xem phim tập thẻ, hợp đồng khoán gọn: Phòng chiếu phim - (024) 35148647.</p>
                        <p>* Thuê phòng tổ chức Hội nghị, làm văn phòng, quảng cáo và các dịch vụ khác: Phòng Dịch vụ - (024) 35142856</p>
                        <p>ĐỀ NGHỊ QUÝ KHÁN GIẢ LƯU Ý KHI MUA VÉ XEM PHIM (ĐẶC BIỆT KHI MUA VÉ ONLINE). TTCPQG KHÔNG CHẤP NHẬN HOÀN TIỀN HOẶC ĐỔI VÉ ĐÃ THANH TOÁN THÀNH CÔNG KHI MUA VÉ ONLINE VÀ VÉ MUA SAI QUY ĐỊNH TẠI QUẦY VÉ.</p>
                        <div className="d-4">
                        <span>Rất mong Quý khán giả phối hợp thực hiện.
                            <br />
                            Xin trân trọng cảm ơn!
                        </span>
                        </div>
                        <div className="detail-en">
                        <div className="d-1">
                            <p>* Ticket pricing policy for priority audiences watching movies at the cinema:</p>
                            <span>- Discount 20% on ticket price for: Children and teenagers (under 16 years old), elderly people (Vietnamese citizens aged from 60 years old), revolutionary contributors, people with difficult living conditions.
                                <br />
                                - Discount 50% on ticket price as regulations for: People with severe disabilities.
                                <br />
                                - Discount 100% on ticket price for: People with particularly severe disabilities; Children under 0.7m accompanied by adults.
                            </span>
                        </div>
                        <div className="d-2">
                            <h5>Condition:</h5>
                            <span>- Only applicable when buying tickets at the counter (not applicable for online tickets).
                                <br />
                                - The above-mentioned audiences must present Identification Documents when buying movie tickets and before entering the screening room. Particularly:
                                <br />
                                + Teenagers (14-16 years old), elderly people: must present "ID card".
                                <br />
                                + Revolutionary contributors: must present a certificate as prescribed.
                                <br />
                                + People with difficult living conditions: must present "Certificate of Poor Household".
                                <br />
                                + People with disabilities: must present "Certificate of Disability".
                            </span>
                        </div>
                        <p>* Special promotion for student who is 22 years old and under: From Monday to Friday 55.000 đ/2D ticket for all slot times (only apply for direct purchase at the ticket stall, one student card can buy one ticket/day, student should show their U22 and student cards to get this priority).</p>
                        <p>* Strict implementation of audience classification according to their ages: P, K, T13, T16, T18, C. (Violation will be sanctioned according to the provisions of Decree 128/2022/ND-CP dated on December 30, 2022).</p>
                        <p>* Tickets for movies ending after 22:00 are not sold to teenagers under 13 years old and tickets for movies ending after 23:00 are not sold to teenagers under 16 years old.</p>
                        <div className="d-3">
                            <h5>* Holiday price is applied on:</h5>
                            <span>
                                - The public holidays as prescribed by state: New year, Lunar new year, Hung's King festival (March 10th - lunar calender), April 30th, May 1st, September 2nd.
                                <br />
                                - Days: Valentine, Women's Day, Noel.
                                <br />
                                - Compensatory days off due to holidays coinciding with Saturday and Sunday.
                            </span>
                        </div>
                        <p>* Do not apply preferential programs and different promotional ones in the day 20/10, 20/11, Halloween 31/10, holidays, sneak show and special show.</p>
                        <p>VALUED AUDIENCES PLEASE TAKE INTO CONSIDERATION WHEN BUYING MOVIE TICKETS (ESPECIALLY FOR ONLINE TICKETS). THE NATIONAL CINEMA CENTER DOES NOT ACCEPT REFUNDS OR EXCHANGES OF SUCCESSFULLY PAID TICKETS (ONLINE TICKETS AND INCORRECTLY PURCHASED TICKETS AT THE COUNTER)</p>
                        <span>Thank you for your valued cooperation.
                            <br />
                            Best Regards!
                        </span>
                        <p>----------------------------------------------------------</p>
                        <p>* Mua vé xem phim tập thẻ, hợp đồng khoán gọn: Phòng chiếu phim - (024) 35148647.</p>
                        <p>* Thuê phòng tổ chức Hội nghị, làm văn phòng, quảng cáo và các dịch vụ khác: Phòng Dịch vụ - (024) 35142856</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
