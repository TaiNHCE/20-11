# Gửi cô, từ những ngày áo trắng

Website tĩnh mừng Ngày Nhà giáo Việt Nam 20/11. Mở `index.html` để xem ngay, hoặc mở thư mục trong VS Code và chạy Live Server. Nút **Chạm để mở món quà** mở thiệp và phát nhạc. Khi đang xem album, dùng phím mũi tên, nút điều hướng hoặc vuốt để đổi ảnh.

## Phân tích video

Các mốc dưới đây được lấy bằng cách quan sát khung hình theo khoảng ba giây. Video quay lại màn hình nên thời điểm chuyển cảnh là xấp xỉ.

| Mốc | Chi tiết quan sát được | Cách triển khai |
| --- | --- | --- |
| 0–3 giây | Thiệp hồng đặt giữa, chữ 20/11, hoa quây quanh hình trái tim. Người xem chạm vùng trung tâm. | Thiệp hoa với viền in kép, cạnh bên là hai ảnh lớp và cô. Trên điện thoại, thiệp đứng trước các ảnh. Nút mở kích hoạt lật 3D. |
| 3–12 giây | Bảng xanh viền gỗ ở giữa. Hai ảnh bên trái, một ảnh nghiêng bên phải. Chữ phấn xuất hiện lần lượt. Có quyển sách, máy bay giấy và trái tim. | Bảng ở giữa, ảnh viền giấy, chữ lộ dần theo từng dòng, nét SVG cho hình vẽ phấn. Trên màn hình hẹp, ảnh nằm dưới bảng. |
| 12–18 giây | Thư xanh nhạt ở giữa trang hồng, ảnh và ghi chú vẫn bao quanh. Chữ thư xuất hiện dần. | Tờ thư xanh nhạt trượt ra khỏi phong bì, lời tri ân hiện theo từng đoạn. |
| 18–24 giây | Những ảnh nhỏ xuất hiện theo cụm, bố trí thành số 20/11 trong video. | Sáu ảnh thật được xếp thành collage nghiêng để nhìn rõ ảnh nhóm. Ảnh xuất hiện cách nhau 160 ms. |
| 24–33 giây | Các ảnh thành dải ngang và người xem chạm vào album. | Album ngang có khung phim, ảnh Polaroid, vuốt, chuyển mờ, zoom nhẹ, tạm dừng và mở ảnh lớn. |

Phong bì 3D, nhạc, lời chúc trong từng bông hồng, bất ngờ khi nhấn giữ và màn kết là các chi tiết bổ sung. Nhạc nền là giai điệu piano tổng hợp được tạo cho website này. Ảnh trong album dùng toàn khung hình gốc và giữ nguyên tỉ lệ.

## Thay lời chúc, ảnh và nhạc

- Sửa nội dung thư, chú thích, mô tả ảnh và lời chúc trong `js/config.js`.
- Thay sáu ảnh `1.jpg`–`6.jpg` trong `assets/images/memories/`.
- Thay `assets/audio/background.mp3` bằng nhạc có quyền sử dụng.
- GSAP, ScrollTrigger, Swiper và Google Fonts được tải từ CDN. Khi CDN không truy cập được, hiệu ứng CSS, album Vanilla JS và font hệ thống tự hoạt động. Các ảnh và nhạc nằm trong dự án.

## Đưa lên GitHub Pages

1. Tạo repository GitHub, ví dụ `teachers-day-website`.
2. Đưa toàn bộ **nội dung bên trong** thư mục dự án lên nhánh `main` để `index.html` nằm ngay ở gốc repo. Giữ các thư mục `css`, `js`, `assets` cùng cấp và giữ tệp `.nojekyll`.
3. Vào **Settings → Pages → Build and deployment**. Chọn **Deploy from a branch**, chọn **main** và **/(root)**, rồi bấm **Save**.
4. Khi trang đã xuất bản, mở địa chỉ GitHub báo ở mục **Pages**, thường là `https://TEN-TAI-KHOAN.github.io/teachers-day-website/`.

[Tài liệu GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
