import "./Home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        Yêu cầu: Sử dụng API từ trang web{" "}
        <a href="https://reqres.in/">https://reqres.in/</a> để tạo website.{" "}
        <br />
        <div className="home-content-listToDo">
          <ul>
            Sử dụng thư viện React để tạo một màn hình website cơ bản bao gồm
            các chức năng:
            <li>1. Đăng nhập</li>
            <li>2. Thêm User</li>
            <li>3. Sửa User</li>
            <li>4. Xoá User</li>
            <li>5. Hiển thị tất cả các User</li>
            <li>6. Tìm kiếm User theo Id</li>
            <li>7. Sắp xếp theo FirstName</li>
            <li>8. Import User từ file .csv</li>
            <li>9. Export User ra file .csv</li>
          </ul>
        </div>
        <li>
          Tự do tùy chỉnh html, css, để có một website nhẹ nhàng, khoa học và
          đẹp.
        </li>
        <li>Commit và đẩy source code lên github public.</li>
        <li>Triển khai website lên Heroku để demo.</li>
        <b>Result</b> <br />
        <li>
          Thời gian hoàn thành:{" "}
          <span className="listTodo-deadLine"> 1-3 ngày</span>
        </li>
        <li>Gửi link Heroku và Github link lại email này</li>
        <li>
          Thời gian phản hồi 2 ngày làm việc kể từ ngày nhận được bài thi.
        </li>
        Yêu cầu backend (optional - không bắt buộc):
        <br />
        Sử dụng python django rest framework, tạo các api như trên trang web:{" "}
        <a href="https://reqres.in/">https://reqres.in/</a>
      </div>
    </div>
  );
};

export default Home;
