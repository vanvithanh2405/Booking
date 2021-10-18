import React, { Fragment, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import { Table, Input, Button } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined,SolutionOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../App';
import { layDanhSachUserAction, xoaUserAction } from '../../../redux/acitons/QuanLyNguoiDungAction';
const { Search } = Input;

export default function User() {

    const { danhSachNguoiDung } = useSelector(state=>state.QuanLyNguoiDungReducer);
    
    console.log('danhSachNguoiDung: ', danhSachNguoiDung);
    const dispatch = useDispatch();


    useEffect(() => {
        // const action = layDanhSachUserAction();
        dispatch(layDanhSachUserAction());
    }, [])


    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            sorter: (a, b) => {
                let hoTenA = a.hoTen.toLowerCase().trim();
                let hoTenB = b.hoTen.toLowerCase().trim();

                if (hoTenA > hoTenB) {
                    return 1;
                }
                return -1;
            },
            render: (text,user)=>{ return <Fragment>
                {user.hoTen.length>15 ? user.hoTen.substr(0,15)+ '...' : user.hoTen}
            </Fragment>
            },
            hover:'hoTen',
            width:'15%'
        },
        {
          title: 'Tài khoản',
          dataIndex: 'taiKhoan',
          sorter: (a, b) => {
            let taiKhoanA = a.taiKhoan.toLowerCase().trim();
            let taiKhoanB = b.taiKhoan.toLowerCase().trim();

            if (taiKhoanA > taiKhoanB) {
                return 1;
            }
            return -1;
        },
        render: (text,user)=>{ return <Fragment>
            {user.taiKhoan.length>15 ? user.taiKhoan.substr(0,15)+ '...' : user.taiKhoan}
        </Fragment>
        },
          sortDirections: ['descend'],
          width:'15%'

        },
        
        {
            title: 'EMAIL',
            dataIndex: 'email',
            width: '10%',
            sorter: (a, b) => {
                let emailA = a.email.toLowerCase().trim();
                let emailB = b.email.toLowerCase().trim();

                if (emailA > emailB) {
                    return 1;
                }
                return -1;
            },
            render: (text,user)=>{ return <Fragment>
                {user.email.length>15 ? user.email.substr(0,15)+ '...' : user.email}
            </Fragment>
            },
    
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
            sorter: (a, b) => a.soDt - b.soDt,
            render: (text,user)=>{ return <Fragment>
                {user.soDt.length>12 ? user.soDt.substr(0,12)+ '...' : user.soDt}
            </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Loại người dùng',
            dataIndex: 'maLoaiNguoiDung',
            responsive: ["sm"],
            width:'15%'

        },
        {
            title: 'Công cụ',
            dataIndex: 'maPhim',
            render: (text,user)=>{ return <Fragment>
                <NavLink key={1} className="text-2xl" to={`/admin/user/edituser/${user.taiKhoan}`}> <EditOutlined style={{color:'blue'}}/> </NavLink>
                <span style={{cursor:'pointer'}} key={2} className="mx-2 text-2xl" onClick={()=>{
                    //Gọi Action xóa
                    if(window.confirm('Bạn thật sự muốn xóa Tài khoản '+ user.taiKhoan )){
                    //gọi action
                    dispatch(xoaUserAction(user.taiKhoan));
                    }
                }}> <DeleteOutlined style={{color:'red'}}/> </span>
                <NavLink key={1} className="text-2xl" to={`/admin/user/booked/${user.taiKhoan}`}> <SolutionOutlined style={{color:'yelow'}}/> </NavLink>
                    
            </Fragment>
            },
            sortDirections: ['descend','ascend'],
            width:'20%'
            
        },
      ];
    const data = danhSachNguoiDung;
    
    const onSearch = value =>{
        console.log('value: ', value);
    
        //gọi api lay danh sach phim
        dispatch(layDanhSachUserAction(value))
    
    }; 
    
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }
    return (
        <div className="container-fluid">
            <h3 className="text-4xl">Quản lý User</h3>
            <Button className="mb-4" onClick={()=>{
                history.push('/admin/user/adduser');
            }}>Thêm User </Button>
            <Search className="mb-4"
                placeholder="input search text"
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={onSearch}

            />
            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"taiKhoan"} />
        </div>
    )
}
