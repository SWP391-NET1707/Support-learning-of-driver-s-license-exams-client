import React from "react";
import { Container, Button } from "react-bootstrap";
import '../style/mophong.css';

function Mophong() {


  return (
    <Container>
      <div className="button-group">
        <Button
          variant="outline-info"
          onClick={() => window.location.href = "https://mophonggiaothong.com/PMMP_upload/SatHachMoPhong/V1.2.3/UpdateSatHach_v1.2.3_x64.rar"}
        >
          Tải xuống cho Windows 64bit
        </Button>
        <Button
          variant="outline-info"
          onClick={() => window.location.href = "https://mophonggiaothong.com/PMMP_upload/SatHachMoPhong/V1.2.3/UpdateSatHach_v1.2.3_x86.rar"}
        >
          Tải xuống cho Windows 32bit
        </Button>
        <Button
          variant="outline-success"
          onClick={() => window.location.href = "https://play.google.com/store/apps/details?id=com.AnG.Pro.Mo.Phong"}
        >
          Tải xuống cho Android
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => window.location.href = "https://apps.apple.com/vn/app/120-c%C3%A2u-m%C3%B4-ph%E1%BB%8Fng-gplx-otomoto/id1631081183?l=vi"}
        >
          Tải xuống cho iOS
        </Button>
      </div>
      <div className="content-bottom">
      <h2 style={{ textAlign: "center" }} className="title">
          120 Câu Hỏi Mô Phỏng Các Tình Huống Giao Thông
        </h2>
        <p style={{ textAlign: "justify" }} className="content">
          <strong>120 Câu Hỏi Mô Phỏng Tình Huống Giao Thông</strong> GPLX Ô Tô Các Hạng Từ B1, B2, C, D, E, FC,...là nội dung mới được đưa vào phần thi sát hạch theo thông tư&nbsp;<strong>04/2022/TT-BGTVT</strong>&nbsp;được điều chỉnh và bổ sung kể từ ngày 15/06/2022 áp dụng trên phạm vi toàn quốc. Học viên bắt buộc phải trải qua 4 bài thi bao gồm: phần thi lý thuyết trắc nghiệm, phần thi mô phỏng, phần thi sa hình và cuối cùng là đường trường (so với trước đây là 3 bài thi)
        </p>
        <p style={{ textAlign: "justify" }}className="content">
          <strong>Ở mỗi tình huống sẽ có cột mốc điểm là 0 - 5, trường hợp nếu học viên nhấn nút "SPACE" đúng khung thời gian thì sẽ được điểm cao nhất là 5, nếu chậm hơn 1s thì điểm sẽ bị trừ đi 1Đ còn 4 và tương tự cho các giây kế tiếp. Trường hợp các bạn nhấn sớm quá hoặc trễ quá khung thời gian quy định thì bị điểm 0</strong>
        </p>
        <p style={{ textAlign: "justify" }}className="content">
          Trong phần mềm thi thử 120 câu hỏi mô phỏng chúng tôi đã tích hợp kèm theo các giải thích và gợi ý để giúp học viên có thể nắm bắt được thời gian cần đánh dấu và dễ dàng ghi nhớ đáp án, như vậy có thể giúp bạn có được số điểm cao nhất trong quá trình ôn tập.
        </p>
        <p style={{ textAlign: "justify" }}className="content">
          Nội dung bài thi mô phỏng áp dụng cho hạng ô tô sẽ bao gồm 10 câu hỏi ở mỗi đề thi, được lấy ngẫu nhiên từ 6 chương:
        </p>
        <ul style={{ textAlign: "justify" }}className="content">
          <li><strong>Chương I</strong>: từ 1 - 29 xoay quanh các tình huống thực tế khi tham gia giao thông trong khu đô thị, khu dân cư đông đúc.</li>
          <li><strong>Chương II</strong>: từ 30 – 43 xoay quanh các tình huống thực tế khi tham gia giao thông ở các đường gấp khúc vào buổi tối.</li>
          <li><strong>Chương III</strong>: từ 44 – 63 xoay quanh các tình huống thực tế khi tham gia giao thông ở trên đường cao tốc.</li>
          <li><strong>Chương IV</strong>: từ 64 – 73 xoay quanh các tình huống thực tế khi tham gia giao thông ở trên đường cao tốc.</li>
          <li><strong>Chương V</strong>: từ 64 – 90 xoay quanh các tình huống thực tế khi tham gia giao thông ở khu vực ngoại thành.</li>
          <li><strong>Chương VI</strong>: từ 91 – 120 xoay quanh các tình huống thực tế khi tham gia giao thông các tình huống hỗn hợp.</li>
        </ul>
        <p style={{ textAlign: "justify" }}className="content">
          <strong>Yêu cầu học viên phải đạt được số điểm 35/50 trong thời gian làm bài từ 5 - 6 phút.&nbsp;</strong>
        </p>
      </div>

    </Container>
  );
}

export default Mophong;