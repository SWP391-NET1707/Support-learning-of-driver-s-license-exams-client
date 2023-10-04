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
            <p>Hạng A1 gồm 83/166 câu. Số câu điểm liệt 18.</p>
          </div>
        </div>
      </div>
      <div className="ant-col ant-col-xs-24 ant-col-sm-12" style={{ padding: "12px" }}>
      <div className="ant-card ant-card-bordered ant-card-hoverable" style={{ background: "white" }}>
          <div className="ant-card-body">
            <div>
              <h2>Chương 2. Nghiệp vụ vận tải</h2>
            </div>
            <p>Hạng A1 gồm 0/26 câu.</p>
          </div>
        </div>
      </div>
      <div className="ant-col ant-col-xs-24 ant-col-sm-12" style={{ padding: "12px" }}>
        <div className="ant-card ant-card-bordered ant-card-hoverable" style={{ background: "white" }}>
          <div className="ant-card-body">
            <div>
              <h2>Chương 3. Văn hóa, đạo đức</h2>
            </div>
            <p>Hạng A1 gồm 5/21 câu. Số câu điểm liệt 0.</p>
          </div>
        </div>
      </div>
      <div className="ant-col ant-col-xs-24 ant-col-sm-12" style={{ padding: "12px" }}>
        <div className="ant-card ant-card-bordered ant-card-hoverable" style={{ background: "white" }}>
          <div className="ant-card-body">
            <div>
              <h2>Chương 4. Kỹ thuật lái xe</h2>
            </div>
            <p>Hạng A1 gồm 12/56 câu. Số câu điểm liệt 2.</p>
          </div>
        </div>
      </div>
      <div className="ant-col ant-col-xs-24 ant-col-sm-12" style={{ padding: "12px" }}>
      <div className="ant-card ant-card-bordered ant-card-hoverable" style={{ background: "white" }}>
          <div className="ant-card-body">
            <div>
              <h2>Chương 5. Cấu tạo và sửa chữa xe</h2>
            </div>
            <p>Hạng A1 gồm 0/35 câu.</p>
          </div>
        </div>
      </div>
      <div className="ant-col ant-col-xs-24 ant-col-sm-12" style={{ padding: "12px" }}>
        <div className="ant-card ant-card-bordered ant-card-hoverable" style={{ background: "white" }}>
          <div className="ant-card-body">
            <div>
              <h2>Chương 6. Hệ thống biển báo</h2>
            </div>
            <p>Hạng A1 gồm 65/182 câu. Số câu điểm liệt 0.</p>
          </div>
        </div>
      </div>
      <div className="ant-col ant-col-xs-24 ant-col-sm-12" style={{ padding: "12px" }}>
        <div className="ant-card ant-card-bordered ant-card-hoverable" style={{ background: "white" }}>
          <div className="ant-card-body">
            <div>
              <h2>Chương 7. Giải các thế sa hình</h2>
            </div>
            <p>Hạng A1 gồm 35/114 câu. Số câu điểm liệt 0.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Quiz;
