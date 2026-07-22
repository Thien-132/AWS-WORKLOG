---
title: "Báo cáo Đồ án: Website Cửa hàng Nhạc cụ (Music Instrument Store)"
date: 2026-07-10
weight: 1
chapter: false
pre: " <b> 6.1. </b> "
---

# BÁO CÁO ĐỒ ÁN: TÌM HIỂU VÀ XÂY DỰNG WEBSITE CỬA HÀNG NHẠC CỤ (MUSIC INSTRUMENT STORE)

---

## 1. Giới thiệu Tổng quan Dự án

**Music Instrument Store** là dự án website thương mại điện tử chuyên cung cấp các thiết bị và dụng cụ âm nhạc (Guitar, Piano, Drum, Violin, thiết bị thu âm và phụ kiện âm thanh). 

Dự án được xây dựng nhằm giải quyết bài toán chuyển đổi số cho cửa hàng bán lẻ nhạc cụ, giúp khách hàng dễ dàng tìm kiếm, trải nghiệm thử âm thanh trực tuyến, đặt mua sản phẩm và theo dõi đơn hàng một cách nhanh chóng, minh bạch. Đồng thời, hệ thống hỗ trợ tích hợp hạ tầng điện toán đám mây **AWS** để đảm bảo khả năng mở rộng (Scalability), tính sẵn sàng cao (High Availability) và bảo mật dữ liệu.

---

## 2. Kiến trúc Hệ thống & Công nghệ Sử dụng

### 2.1. Công nghệ Phát triển (Tech Stack)

| Thành phần | Công nghệ / Dịch vụ sử dụng | Mô tả |
| :--- | :--- | :--- |
| **Giao diện (Frontend)** | React.js / HTML5, CSS3, JavaScript | Giao diện người dùng phản hồi nhanh (Responsive), tối ưu SEO và trải nghiệm người dùng. |
| **Xử lý máy chủ (Backend)** | Node.js (Express.js) | Xây dựng hệ thống RESTful API phục vụ các thao tác dữ liệu. |
| **Cơ sở dữ liệu (Database)** | PostgreSQL / MySQL / MongoDB | Lưu trữ thông tin sản phẩm, đơn hàng, người dùng và danh mục nhạc cụ. |
| **Hạ tầng Đám mây (AWS Cloud)** | AWS S3, CloudFront, EC2, RDS, IAM | Lưu trữ hình ảnh sản phẩm tĩnh, CDN phân phối nội dung, lưu trữ CSDL và hosting ứng dụng. |

### 2.2. Sơ đồ Kiến trúc Hạ tầng trên AWS

- **Amazon S3 & CloudFront**: Lưu trữ tệp tĩnh (Static Assets: hình ảnh nhạc cụ, video demo âm thanh) và phân phối nhanh toàn cầu qua CDN.
- **AWS EC2 / App Runner**: Host ứng dụng Web & RESTful API Backend.
- **Amazon RDS (PostgreSQL/MySQL)**: Cơ sở dữ liệu quan hệ được quản lý tự động sao lưu và bảo mật trong Subnet riêng (Private Subnet).
- **AWS IAM**: Phân quyền truy cập tài nguyên theo nguyên tắc đặc quyền tối thiểu (Least Privilege).

---

## 3. Các Tính năng Chính của Hệ thống

### 3.1. Dành cho Khách hàng (Client / User)
1. **Trang chủ & Khám phá**: Banner nổi bật, hiển thị danh mục sản phẩm theo loại nhạc cụ (Dây, Phím, Gõ, Thổi), sản phẩm bán chạy và khuyến mãi.
2. **Tìm kiếm & Bộ lọc nâng cao**: Tìm nhạc cụ theo tên, thương hiệu (Fender, Yamaha, Roland, Gibson...), tầm giá và chất liệu.
3. **Trang Chi tiết Sản phẩm**: Hiển thị hình ảnh độ phân giải cao, thông số kỹ thuật chi tiết, đánh giá người dùng và file demo âm thanh nhạc cụ.
4. **Giỏ hàng & Thanh toán (Cart & Checkout)**: Thêm/sửa/xóa sản phẩm trong giỏ hàng, tính tổng tiền tự động, hỗ trợ các phương thức thanh toán trực tuyến & COD.
5. **Quản lý Tài khoản**: Đăng ký, Đăng nhập (JWT authentication), xem lịch sử đơn hàng và trạng thái vận chuyển.

### 3.2. Dành cho Quản trị viên (Admin Dashboard)
1. **Quản lý Sản phẩm**: Thêm mới, cập nhật thông tin, thay đổi giá, cập nhật số lượng tồn kho của nhạc cụ.
2. **Quản lý Đơn hàng**: Duyệt đơn, cập nhật trạng thái giao hàng (Đang xử lý -> Đang giao -> Đã hoàn thành).
3. **Thống kê & Báo cáo**: Báo cáo doanh thu theo tháng, sản phẩm bán chạy nhất, số lượng người dùng mới.

---

## 4. Quy trình Cài đặt & Khởi chạy Cục bộ (Local Development)

### 4.1. Yêu cầu Tiền trạm
- **Node.js**: Phiên bản 18.x trở lên
- **npm** hoặc **yarn**
- **Git**

### 4.2. Các bước triển khai

1. **Clone mã nguồn từ GitHub:**
   ```bash
   git clone https://github.com/Thien-132/music-instrument-store.git
   cd music-instrument-store
   ```

2. **Cài đặt các gói phụ thuộc (Dependencies):**
   ```bash
   npm install
   ```

3. **Cấu hình Biến Môi trường (`.env`):**
   Tạo tệp `.env` tại thư mục gốc với các thông số:
   ```env
   PORT=5000
   DATABASE_URL=postgres://user:password@localhost:5432/music_store_db
   JWT_SECRET=your_jwt_secret_key
   AWS_S3_BUCKET_NAME=your-music-store-bucket
   ```

4. **Khởi chạy ứng dụng ở chế độ Phát triển:**
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:5000` (Backend) và `http://localhost:3000` (Frontend).

---

## 5. Kết quả Đạt được & Hướng Phát triển

### 5.1. Kết quả Đạt được
- Hoàn thành giao diện mua sắm nhạc cụ trực quan, tương thích đa thiết bị (Desktop/Mobile).
- Đóng gói ứng dụng sạch sẽ, cấu hình mã nguồn rõ ràng trên Git.
- Sẵn sàng đóng gói Container (Docker) để triển khai tự động lên AWS Cloud.

### 5.2. Hướng Phát triển Tiếp theo
- Tích hợp tính năng thử nhạc cụ thực tế ảo (AR Instrument Preview).
- Tích hợp cổng thanh toán VNPAY / Momo / Stripe.
- Triển khai tự động hóa CI/CD Pipeline với GitHub Actions và AWS CodePipeline.

---

## 6. Liên kết Mã nguồn (Source Code Repository)

🔗 **Link GitHub Mã nguồn chính thức:**  
[https://github.com/Thien-132/music-instrument-store.git](https://github.com/Thien-132/music-instrument-store.git)
