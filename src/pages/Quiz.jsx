import React from 'react';
import '../style/quiz.css';

function Quiz() {
  return (
     <div className="ant-box" style={{ margin: '12px' }}>
    <div className="ant-row" style={{ margin: "-12px -12px 12px" }}>
      <div className="ant-col ant-col-xs-24 ant-col-sm-12" style={{ padding: "12px" }}>
        <div className="ant-card ant-card-bordered ant-card-hoverable" style={{ background: "white" }}>
          <div className="ant-card-body">
            <div>
              <h2>Chương 1. Khái niệm và quy tắc giao thông</h2>
            </div>
            <p>Gồm 166 câu. Số câu <strong>điểm liệt: 45.</strong></p>
          </div>
        </div>
      </div>
      <div className="ant-col ant-col-xs-24 ant-col-sm-12" style={{ padding: "12px" }}>
      <div className="ant-card ant-card-bordered ant-card-hoverable" style={{ background: "white" }}>
          <div className="ant-card-body">
            <div>
              <h2>Chương 2. Nghiệp vụ vận tải</h2>
            </div>
            <p>Gồm 26 câu.</p>
            <p><strong>Học viên khoá B1 không học phần này</strong></p>
          </div>
        </div>
      </div>
      <div className="ant-col ant-col-xs-24 ant-col-sm-12" style={{ padding: "12px" }}>
        <div className="ant-card ant-card-bordered ant-card-hoverable" style={{ background: "white" }}>
          <div className="ant-card-body">
            <div>
              <h2>Chương 3. Văn hóa, đạo đức</h2>
            </div>
            <p>Gồm 21 câu. Số câu <strong>điểm liệt: 4.</strong></p>
          </div>
        </div>
      </div>
      <div className="ant-col ant-col-xs-24 ant-col-sm-12" style={{ padding: "12px" }}>
        <div className="ant-card ant-card-bordered ant-card-hoverable" style={{ background: "white" }}>
          <div className="ant-card-body">
            <div>
              <h2>Chương 4. Kỹ thuật lái xe</h2>
            </div>
            <p>Gồm 56 câu. Số câu <strong>điểm liệt: 11.</strong></p>
          </div>
        </div>
      </div>
      <div className="ant-col ant-col-xs-24 ant-col-sm-12" style={{ padding: "12px" }}>
      <div className="ant-card ant-card-bordered ant-card-hoverable" style={{ background: "white" }}>
          <div className="ant-card-body">
            <div>
              <h2>Chương 5. Cấu tạo và sửa chữa xe</h2>
            </div>
            <p>Gồm 35 câu.</p>
          </div>
        </div>
      </div>
      <div className="ant-col ant-col-xs-24 ant-col-sm-12" style={{ padding: "12px" }}>
        <div className="ant-card ant-card-bordered ant-card-hoverable" style={{ background: "white" }}>
          <div className="ant-card-body">
            <div>
              <h2>Chương 6. Hệ thống biển báo</h2>
            </div>
            <p>Gồm 182 câu.</p>
          </div>
        </div>
      </div>
      <div className="ant-col ant-col-xs-24 ant-col-sm-12" style={{ padding: "12px" }}>
        <div className="ant-card ant-card-bordered ant-card-hoverable" style={{ background: "white" }}>
          <div className="ant-card-body">
            <div>
              <h2>Chương 7. Giải các thế sa hình</h2>
            </div>
            <p>Gồm 114 câu.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Quiz;
