---
title: "Workshop"
date: 2026-01-01
weight: 5
chapter: false
pre: " <b> 5. </b> "
---

# THỰC HÀNH AWS CDK: Xây dựng hệ thống Serverless Event-Driven

Chào mừng bạn đến với chuỗi bài thực hành chuyên sâu về AWS! Trong đồ án Workshop này, tôi sẽ hướng dẫn chi tiết cách thiết kế và triển khai một kiến trúc ứng dụng **Serverless hướng sự kiện (Event-Driven Architecture)** hoàn chỉnh. Chúng ta sẽ sử dụng **AWS Cloud Development Kit (CDK)** kết hợp ngôn ngữ TypeScript để xây dựng hạ tầng dưới dạng mã (IaC), giúp hệ thống dễ dàng mở rộng, linh hoạt và bảo mật cao.

Dưới đây là lộ trình chi tiết của Workshop, mỗi phần được phân tích và thiết kế để giúp bạn nắm bắt cốt lõi của công nghệ Serverless:

### Lộ trình Workshop

#### [1. Tổng quan Workshop (Overview)](5.1-Overview/)
Giới thiệu bức tranh toàn cảnh về kiến trúc Serverless hướng sự kiện và lý do tại sao AWS CDK lại vượt trội hơn so với các phương pháp quản lý hạ tầng truyền thống. Phần này cũng cung cấp cái nhìn tổng thể về các dịch vụ sẽ được kết nối (Lambda, API Gateway, DynamoDB, SQS, EventBridge).

#### [2. Chuẩn bị & Khởi tạo (Prerequisites)](5.2-Prerequisites/)
Hướng dẫn từng bước cài đặt môi trường làm việc bao gồm Node.js, AWS CLI, và cấu hình AWS CDK. Đây là bước đệm quan trọng để đảm bảo bạn có đầy đủ công cụ và quyền hạn trước khi bắt tay vào code hạ tầng.

#### [3. Module 1: Storage & Database](5.3-Module1-Storage/)
Thiết lập nền tảng lưu trữ dữ liệu bằng cách sử dụng Amazon DynamoDB. Chúng ta sẽ áp dụng mô hình thiết kế Single-Table Design để tối ưu hóa chi phí và tốc độ truy vấn, làm tiền đề vững chắc cho các luồng xử lý phía sau.

#### [4. Module 2: Compute & API Gateway](5.4-Module2-Compute/)
Tập trung vào việc xử lý logic máy chủ với AWS Lambda và tạo cổng giao tiếp thông qua Amazon API Gateway. Bạn sẽ học cách kết nối các RESTful API trực tiếp vào các hàm Lambda để xử lý yêu cầu theo thời gian thực một cách tối ưu.

#### [5. Module 3: Security & Permissions (Bảo mật)](5.5-Module3-Security/)
Phân tích và triển khai các lớp bảo mật thiết yếu. Phần này hướng dẫn tích hợp Amazon Cognito để quản lý xác thực người dùng, đồng thời thiết lập các quyền IAM theo nguyên tắc đặc quyền tối thiểu (Least Privilege) cho từng thành phần.

#### [6. Module 4: Serverless Backend & Hướng sự kiện](5.6-Module4-Serverless/)
Đây là trái tim của hệ thống. Chúng ta sẽ lập trình xử lý các tác vụ bất đồng bộ bằng AWS SDK v3, sử dụng Amazon EventBridge để định tuyến sự kiện và Amazon SQS để quản lý hàng đợi. Phần này cũng giải quyết các bài toán khó như chống xử lý trùng lặp (Idempotency) và bắt lỗi qua Dead-Letter Queue (DLQ).

#### [7. Triển khai & Kiểm thử (Deployment & Testing)](5.7-Deployment-Testing/)
Đưa toàn bộ mã nguồn hạ tầng lên môi trường AWS thực tế bằng các lệnh CDK tự động hóa. Sau đó, tiến hành kiểm thử các luồng dữ liệu thông qua HTTP request (curl) để đảm bảo hệ thống phản hồi đúng như thiết kế ban đầu.

#### [8. Dọn dẹp & Nâng cao (Cleanup & Advanced)](5.8-Cleanup-Advanced/)
Hướng dẫn dọn dẹp tài nguyên để tránh phát sinh chi phí sau khi hoàn thành. Ngoài ra, phần này mở rộng thêm các kỹ năng nâng cao như viết Unit Test cho hạ tầng bằng framework Jest để đảm bảo tính ổn định lâu dài.
