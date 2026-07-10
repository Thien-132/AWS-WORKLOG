# AWS First Cloud Journey (FCJ) - Internship Worklog

Đây là kho lưu trữ toàn bộ báo cáo thực tập (Worklog), tài liệu đề xuất kiến trúc (Proposal), bài blog kỹ thuật, báo cáo sự kiện và tự đánh giá trong suốt 12 tuần thực tập tại **Amazon Web Services Việt Nam**. 

Dự án này được xây dựng dựa trên framework [Hugo](https://gohugo.io/), cho phép xuất ra một trang web tĩnh (static site) cực kỳ tốc độ và dễ quản lý.

## Hướng dẫn chạy dự án trên máy tính cá nhân (Localhost:1313)

Để có thể tải source code này về và chạy trang web trên máy tính của bạn (tại địa chỉ `http://localhost:1313`), vui lòng làm theo các bước sau:

### Bước 1: Cài đặt Hugo
Bạn cần phải cài đặt Hugo (phiên bản Extended) trên máy tính của mình.
- **Trên Windows** (khuyên dùng [Chocolatey](https://chocolatey.org/)):
  ```bash
  choco install hugo-extended -confirm
  ```
- **Trên macOS** (dùng Homebrew):
  ```bash
  brew install hugo
  ```
- **Trên Linux** (Ubuntu/Debian):
  ```bash
  sudo apt-get install hugo
  ```
*(Chi tiết cài đặt có thể xem tại [Tài liệu chính thức của Hugo](https://gohugo.io/installation/))*

### Bước 2: Clone dự án về máy
Mở Terminal (hoặc Command Prompt / PowerShell) và chạy lệnh sau để tải source code:
```bash
git clone https://github.com/Thien-132/AWS-WORKLOG.git
cd AWS-WORKLOG
```

### Bước 3: Khởi chạy máy chủ Web cục bộ (Local Server)
Tại thư mục gốc của dự án (thư mục `AWS-WORKLOG`), hãy chạy lệnh sau:
```bash
hugo server -D
```
*(Cờ `-D` giúp hiển thị luôn cả các bài viết đang ở trạng thái nháp - draft).*

### Bước 4: Xem trang web
Mở trình duyệt web của bạn (Chrome, Edge, Safari...) và truy cập vào đường dẫn:
👉 **[http://localhost:1313](http://localhost:1313)**

Mỗi khi bạn chỉnh sửa bất kỳ tệp tin `.md` nào trong thư mục `content/`, Hugo sẽ tự động tải lại (live reload) và cập nhật nội dung trên trình duyệt ngay lập tức mà không cần phải chạy lại lệnh.

---

*Được phát triển bởi Trần Bá Thiện - FCJ Cloud Intern.*
