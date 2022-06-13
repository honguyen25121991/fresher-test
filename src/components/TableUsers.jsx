import React, { useEffect } from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUsers";
import _ from "lodash";
import { debounce } from "lodash";
import ModalConfirm from "./ModalConfirm";
import "./TableUser.scss";

const TableUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  // const [totalUSers, setTotalUSers] = useState(0);

  const [totalPages, setTotalPage] = useState(0);
  const [isShowModelAddNew, setIsShowModelAddNew] = useState(false);

  const [isShowModelEdit, setIsShowModelEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [isShowModelConfirm, setIsShowModelConfirm] = useState(false);
  const [dataUserDelete, setdataUserDelete] = useState({});

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const [keywords, setKeywords] = useState("");

  const handleClose = () => {
    setIsShowModelAddNew(false);
    setIsShowModelEdit(false);
    setIsShowModelConfirm(false);
  };

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setListUsers(res.data);
      setTotalPage(res.total_pages);
    }
  };

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  const handleEditUser = (user) => {
    setIsShowModelEdit(true);
    setDataUserEdit(user);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers);
  };

  const handleComfirmUser = (user) => {
    setIsShowModelConfirm(true);
    setdataUserDelete(user);
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    setListUsers(cloneListUsers);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUsers(cloneListUsers);
  };
  const handleSortUser = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = _.filter(cloneListUsers, (item) =>
        item.email.includes(term)
      );
      console.log(cloneListUsers);
      setListUsers(cloneListUsers);
    } else {
      getUsers(1);
    }
  }, 500);
  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List User :</b>
        </span>
        <button
          className="btn btn-success"
          onClick={() => {
            setIsShowModelAddNew(true);
          }}
        >
          Add New User
        </button>
      </div>
      <div className=" col-6 my-3">
        <input
          className=" form-control"
          placeholder="Search by email ....."
          // value={keywords}
          onChange={(event) => handleSortUser(event)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>
              <div className="sort-header">Email</div>
            </th>
            <th>
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                </span>
              </div>
            </th>
            <th>
              <div className="sort-header">Last Name</div>
            </th>

            <th>
              <div className="sort-header">Actions</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <div>
                      <button
                        className="btn btn-warning mx-3"
                        onClick={() => {
                          handleEditUser(item);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleComfirmUser(item);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isShowModelAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={isShowModelEdit}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalConfirm
        show={isShowModelConfirm}
        dataUserDelete={dataUserDelete}
        handleClose={handleClose}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};

export default TableUsers;
