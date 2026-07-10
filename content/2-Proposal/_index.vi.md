---
title: "Bản đề xuất"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

# BẢN ĐỀ XUẤT KIẾN TRÚC HỆ THỐNG
## DỰ ÁN: NỀN TẢNG THƯƠNG MẠI ĐIỆN TỬ TÍCH HỢP AI TRÊN NỀN TẢNG AWS SERVERLESS

---

### 1. GIỚI THIỆU & ĐẶT VẤN ĐỀ

#### 1.1. Xu hướng Cloud-native và Decoupled
Hiện nay, ngành thương mại điện tử đang có sự dịch chuyển mạnh mẽ từ kiến trúc Monolithic truyền thống sang mô hình Cloud-native và Event-Driven. Việc này giúp các hệ thống trở nên linh hoạt hơn, dễ dàng xử lý lượng truy cập khổng lồ trong các đợt sự kiện mua sắm, đồng thời giảm thiểu tối đa thời gian gián đoạn dịch vụ. Bằng việc phân tách rạch ròi Frontend và Backend (Decoupled), hệ thống có khả năng xử lý bất đồng bộ, tăng độ chịu tải và dự phòng lỗi.

#### 1.2. Thách thức của hệ thống truyền thống
- **Quá tải kết nối:** Lượng truy cập tăng vọt làm cạn kiệt tài nguyên máy chủ Web và Database gây nghẽn hệ thống.
- **Lãng phí tài nguyên:** Doanh nghiệp phải duy trì máy chủ cấu hình cao ngay cả lúc ít truy cập, gây tốn kém lớn.
- **Rủi ro thanh toán lặp:** Thiếu cơ chế Idempotency dẫn đến việc khách hàng bị trừ tiền nhiều lần khi mạng chậm.
- **Bảo mật lỏng lẻo:** Dễ bị tấn công từ chối dịch vụ (DDoS) và rò rỉ dữ liệu khi không có tầng bảo vệ rìa (Edge).
- **Quản lý luồng gián đoạn:** Nếu một dịch vụ phụ (như gửi email) lỗi, toàn bộ tiến trình mua hàng sẽ bị đình trệ.

---

### 2. MỤC TIÊU DỰ ÁN

Dự án hướng đến việc xây dựng một nền tảng E-Commerce hiện đại, tích hợp trí tuệ nhân tạo (AI) nhằm giải quyết triệt để các hạn chế trên:
- **Tự động mở rộng (Autoscaling):** Hệ thống co giãn theo lưu lượng thực tế mà không cần can thiệp thủ công.
- **Tối ưu chi phí (Pay-as-you-go):** Chỉ trả tiền cho những tài nguyên thực sự dùng, loại bỏ chi phí duy trì máy chủ rỗi.
- **Đảm bảo hiệu năng cốt lõi:**
  - Phân phối hình ảnh tốc độ cao từ S3 qua CDN.
  - Bảo mật danh tính, phân quyền bằng Amazon Cognito.
  - Quản lý đơn hàng bất đồng bộ bằng hàng đợi (Queue).
  - Tích hợp cổng thanh toán bảo mật Stripe kèm cơ chế chống trùng lặp.
  - Trải nghiệm thông minh qua Chatbot AI (Amazon Lex) và hệ thống thông báo đa kênh.

---

### 3. KIẾN TRÚC HỆ THỐNG ĐỀ XUẤT

#### 3.1. Tại sao chọn AWS Serverless?
- **Thu hẹp phạm vi rủi ro:** Mỗi hàm Lambda hoạt động độc lập, lỗi ở một phần không làm sập toàn bộ hệ thống.
- **Tối ưu trải nghiệm lập trình (DX):** Lập trình viên tập trung viết logic nghiệp vụ thay vì phải lo cấu hình server, đồng thời ứng dụng IaC thông qua AWS CDK.
- **Độ tin cậy cao:** Đảm bảo tính Multi-AZ và độ sẵn sàng cao (High Availability) tích hợp tự động bởi AWS.

#### 3.2. Sơ đồ kiến trúc
![Sơ đồ kiến trúc Serverless AWS](/images/2-Proposal/architecture.png)
> **Ghi chú:** AWS WAF được sử dụng để bảo vệ tầng giao tiếp (CloudFront và API Gateway).

#### 3.3. Các luồng dữ liệu chính
1. **Truy cập Web:** Người dùng gọi tên miền qua Route 53 -> AWS WAF kiểm tra -> tải giao diện từ CDN AWS Amplify.
2. **Xác thực:** Cognito cấp phát token JWT; API Gateway dùng Cognito Authorizer để chặn các request trái phép.
3. **Tra cứu sản phẩm:** Frontend gọi API qua API Gateway -> Lambda xử lý đọc dữ liệu DynamoDB và cấp pre-signed URL từ S3.
4. **Tạo đơn hàng bất đồng bộ:** Lambda đưa yêu cầu vào SQS Order Queue; Consumer xử lý ngầm, nếu lỗi sẽ đưa vào Dead-Letter Queue (DLQ).
5. **Thanh toán:** Gọi Stripe API lấy thông tin thanh toán có gắn khóa Idempotency-Key. Sau đó nhận trạng thái từ Stripe Webhook và đẩy sự kiện qua EventBridge.
6. **Kiến trúc Hướng sự kiện (Event-driven):** EventBridge định tuyến sự kiện thanh toán thành công về dịch vụ Order để cập nhật trạng thái DB và đưa bản tin vào SQS Notification để gửi email.
7. **Chatbot AI:** API Gateway dẫn kết nối tới Lambda xử lý Amazon Lex để trao đổi trực tiếp với khách hàng.

#### 3.4. Bảo mật
- **Cognito Authorizer:** Ngăn chặn các truy cập API không hợp lệ.
- **Mã hóa:** Dùng KMS mã hóa dữ liệu tại DynamoDB, S3.
- **Bảo mật tập trung:** Dùng Secrets Manager lưu trữ mã bí mật thay vì để trong mã nguồn. Cấp quyền Least Privilege bằng IAM cho các dịch vụ.

---

### 4. PHÂN CÔNG NHIỆM VỤ

| Thành viên | Vai trò | Trách nhiệm chính | Kết quả Bàn giao |
|---|---|---|---|
| **Thành viên 1** | Frontend & Identity | Xây dựng UI bằng Next.js, tích hợp Cognito auth, UI giỏ hàng, Checkout, và Chatbot. | Source code UI, luồng auth hoàn chỉnh, pipeline Amplify. |
| **Thành viên 2** | API & Compute | Thiết lập API Gateway, phát triển Lambda (Product, Order), xử lý validate dữ liệu đầu vào. | Code Lambda, file cấu hình API, Unit Test cho API. |
| **Thành viên 3** | Data & Messaging | Thiết kế DynamoDB Single-Table, cấu hình S3, SQS (Queue + DLQ), EventBridge và tự động Backup. | Schema DynamoDB, script hạ tầng Event/Queue, cấu hình Backup. |
| **Thành viên 4** | Payment & AI | Tích hợp cổng Stripe, Webhook, huấn luyện Chatbot Lex, phát triển Lambda Notification. | Code thanh toán, model Lex Chatbot, code gửi email/tin nhắn. |
| **Thành viên 5** | DevSecOps & PM | Định nghĩa hạ tầng CDK (IaC), IAM, WAF, CI/CD, thiết lập CloudWatch và GuardDuty. Quản lý dự án. | Code CDK IaC, workflow CI/CD GitHub, bảng giám sát hệ thống. |

---

### 5. ƯỚC TÍNH CHI PHÍ

Ước tính chi phí quy mô dùng thử nghiệm (Lab-scale) trong 1 tháng:
- **Amplify, Cognito, API Gateway, Lambda, SQS, EventBridge:** Đa phần nằm trong Free Tier hoặc có chi phí cực kỳ nhỏ (quanh mốc $0.00 - $1.00).
- **DynamoDB, S3:** Khoảng dưới $1.00 / tháng với lượng dữ liệu nhỏ.
- **Secrets Manager, WAF, Backup:** Dịch vụ phát sinh phí khoảng $1.50 - $2.50.
- **TỔNG CHI PHÍ DỰ KIẾN:** Khoảng **$3.00 - $5.00 USD / tháng**, chứng minh tính kinh tế vượt trội của Serverless.

---

### 6. ĐÁNH GIÁ RỦI RO & GIẢI PHÁP

| Rủi ro | Ảnh hưởng | Giải pháp xử lý |
|---|---|---|
| **Sập database vì quá tải kết nối** | Đứt gãy luồng xử lý | Dùng Amazon DynamoDB (NoSQL) với khả năng tự co giãn (On-demand) không lo giới hạn kết nối. |
| **Lỗi Webhook hoặc bị trừ tiền trùng** | Khiếu nại từ khách hàng | Gắn thẻ Idempotency-Key của Stripe, kiểm tra chữ ký Webhook; quản lý tác vụ lỗi thông qua DLQ SQS. |
| **Lộ thông tin API Keys** | Mất an toàn toàn hệ thống | Quản lý tuyệt mật qua AWS Secrets Manager, không đưa lên GitHub, áp dụng xoay vòng key tự động. |
| **Tiến độ dự án bị chậm** | Không kịp demo môn học | Chốt nhanh mô hình MVP (Minimum Viable Product). Tổ chức họp nhóm Daily ngắn gọn. |

---

### 7. TIÊU CHÍ NGHIỆM THU DỰ ÁN

1. **Hạ tầng & Phân giải miền (Edge):**
<ul style="list-style-type: none;">
  <li><label><input type="checkbox"> Tên miền chạy an toàn trên Route 53 với giao thức HTTPS.</label></li>
  <li><label><input type="checkbox"> AWS WAF lọc thành công các request độc hại hoặc vi phạm giới hạn lưu lượng.</label></li>
  <li><label><input type="checkbox"> Frontend triển khai hoàn thiện qua AWS Amplify.</label></li>
</ul>

2. **Hệ thống Xác thực (Identity):**
<ul style="list-style-type: none;">
  <li><label><input type="checkbox"> Quy trình đăng ký, đăng nhập qua Amazon Cognito hoàn tất.</label></li>
  <li><label><input type="checkbox"> Nhận về JWT hợp lệ, tự động chặn yêu cầu API thiếu token (trả về lỗi 401).</label></li>
</ul>

3. **Sản phẩm & Xử lý đơn hàng:**
<ul style="list-style-type: none;">
  <li><label><input type="checkbox"> Đọc danh sách sản phẩm thành công từ DB, load ảnh trực tiếp từ S3 qua URL an toàn.</label></li>
  <li><label><input type="checkbox"> Gọi API tạo đơn hàng bất đồng bộ vào SQS Queue thành công.</label></li>
  <li><label><input type="checkbox"> Các đơn hàng lỗi tự động được chuyển hướng sang SQS DLQ sau các lần thử lại.</label></li>
</ul>

4. **Thanh toán & Hướng sự kiện (Event-Driven):**
<ul style="list-style-type: none;">
  <li><label><input type="checkbox"> Thực hiện thanh toán Sandbox qua Stripe an toàn với Idempotency-Key.</label></li>
  <li><label><input type="checkbox"> Backend nhận và xử lý thành công Stripe Webhook (đã qua kiểm tra chữ ký).</label></li>
  <li><label><input type="checkbox"> Sự kiện thanh toán kích hoạt thành công Notification Lambda để gửi mail/thông báo.</label></li>
</ul>

5. **Trợ lý Ảo (Chatbot AI):**
<ul style="list-style-type: none;">
  <li><label><input type="checkbox"> Chatbot Amazon Lex tương tác tốt với người dùng ngay trên website.</label></li>
  <li><label><input type="checkbox"> Chatbot tự phân tích ý định (Intent) và truy xuất đúng thông tin đơn hàng/sản phẩm.</label></li>
</ul>

6. **Giám sát hệ thống (Observability):**
<ul style="list-style-type: none;">
  <li><label><input type="checkbox"> Bảng điều khiển CloudWatch phản ánh trực quan tình trạng hệ thống.</label></li>
  <li><label><input type="checkbox"> AWS X-Ray kết nối các dịch vụ lại thành một luồng (Trace map) xuyên suốt.</label></li>
  <li><label><input type="checkbox"> Amazon GuardDuty giám sát hoạt động, AWS Backup chứng minh khả năng khôi phục DB.</label></li>
</ul>

7. **Quy trình & Mã nguồn (CI/CD):**
<ul style="list-style-type: none;">
  <li><label><input type="checkbox"> Triển khai toàn bộ bằng Infrastructure as Code (AWS CDK).</label></li>
  <li><label><input type="checkbox"> GitHub Actions tự động kiểm thử và triển khai khi có code mới (CI/CD Pipeline).</label></li>
</ul>