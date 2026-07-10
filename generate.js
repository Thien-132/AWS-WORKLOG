const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');

// Helper to write file safely
function writeSafe(p, content) {
    const dir = path.dirname(p);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(p, content, 'utf8');
}

// 1. Nhật ký công việc
const nkcDir = path.join(contentDir, '1_nhat_ky_cong_viec');
writeSafe(path.join(nkcDir, '_index.md'), `+++
title = '1. Nhật ký công việc'
weight = 1
+++
`);

const week1Content = `+++
title = '1.1. Worklog Tuần 1'
weight = 1
+++

{{% notice warning "Lưu ý" %}}
Các thông tin dưới đây chỉ nhằm mục đích tham khảo, vui lòng **không sao chép nguyên văn** cho bài báo cáo của bạn kể cả warning này.
{{% /notice %}}

## Mục tiêu tuần 1:

* Kết nối, làm quen với các thành viên trong First Cloud AI Journey.
* Hiểu dịch vụ AWS cơ bản, cách dùng console & CLI.

## Các công việc cần triển khai trong tuần này:

| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
| --- | --- | --- | --- | --- |
| 2 | - Làm quen với các thành viên FCAJ<br>- Đọc và lưu ý các nội quy, quy định tại đơn vị thực tập | 11/08/2025 | 11/08/2025 | |
| 3 | - Tìm hiểu AWS và các loại dịch vụ<br>  + Compute<br>  + Storage<br>  + Networking<br>  + Database | 12/08/2025 | 12/08/2025 | https://cloudjourney.awsstudygroup.com/ |
`;

writeSafe(path.join(nkcDir, '1_tuan_1.md'), week1Content);

for (let i = 2; i <= 12; i++) {
    const content = `+++
title = '1.${i}. Worklog Tuần ${i}'
weight = ${i}
+++

## Mục tiêu tuần ${i}:

* [Điền mục tiêu]

## Các công việc cần triển khai trong tuần này:

| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
| --- | --- | --- | --- | --- |
| | | | | |
`;
    writeSafe(path.join(nkcDir, `${i}_tuan_${i}.md`), content);
}

// Other sections
const sections = [
    { dir: '2_ban_de_xuat', title: '2. Bản đề xuất', weight: 2 },
    { dir: '3_cac_bai_blogs', title: '3. Các bài blogs đã đăng', weight: 3 },
    { dir: '4_cac_events', title: '4. Các events đã tham gia', weight: 4 },
    { dir: '5_workshop', title: '5. Workshop', weight: 5 },
    { dir: '6_tu_danh_gia', title: '6. Tự đánh giá', weight: 6 },
    { dir: '7_chia_se', title: '7. Chia sẻ, đóng góp ý kiến', weight: 7 },
];

sections.forEach(sec => {
    const dir = path.join(contentDir, sec.dir);
    writeSafe(path.join(dir, '_index.md'), `+++
title = '${sec.title}'
weight = ${sec.weight}
+++
`);
});

console.log("Generated content structure successfully.");
