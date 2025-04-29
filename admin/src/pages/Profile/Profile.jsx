import React from "react";

const Profile = () => {
  return (
    <div className="profile">
      <table class="table caption-top">
        <caption>Các thành viên</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Mã sinh viên</th>
            <th scope="col">Họ và tên</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>A43575</td>
            <td>Phạm Khánh Duy</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>A38582 </td>
            <td>Dương Tiến Thành</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>A42000 </td>
            <td>Trần Sơn Tùng</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>A42586 </td>
            <td>Phạm Công Bình</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
