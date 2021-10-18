import React, { Fragment, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import { Table, Input, Space, Button } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined,CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/acitons/QuanLyPhimActions';
import { flatMap } from 'lodash';
import { history } from '../../../App';

const { Search } = Input;



export default function Films() {
    const {arrFilm}=useSelector(state=>state.QuanLyPhimReducer);
    

    const dispatch = useDispatch();
    console.log('arrFilmDefautl: ', arrFilm);

    useEffect(() => {
        const action = layDanhSachPhimAction();
        dispatch(action);
    },[])


    const columns = [
        {
          title: 'Mã phim',
          dataIndex: 'maPhim',
          value: (text,object)=>{return<span>{text}</span>},
          sorter: (a, b) => a.maPhim - b.maPhim,
          sortDirections: ['descend'],
          width:'10%'

        },
        {
          title: 'Hình ảnh',
          dataIndex: 'hinhAnh',
          render: (text,film,index)=>{return <Fragment>
              <img src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} onError={(e)=>{ e.target.onError = null; e.target.src=`https://picsum.photos/id/${index}/50/50`}}/>
          </Fragment>},
          defaultSortOrder: 'descend',
          width:'15%'
        //   sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Tên Phim',
          dataIndex: 'tenPhim',
          sorter: (a, b) =>{ 
              let phimA = a.tenPhim.toLowerCase().trim();
              let phimB = b.tenPhim.toLowerCase().trim();
            if(phimA > phimB){
                return 1;
            }
              return -1;
            },
            sortDirections: ['descend','ascend'],
            width:'25%'
        },
        {
            title: 'Mô Tả',
            dataIndex: 'moTa',
            render: (text,film)=>{ return <Fragment>
                {film.moTa.length>50 ? film.moTa.substr(0,50)+ '...' : film.moTa}
            </Fragment>
            },
            sortDirections: ['descend','ascend'],
            width:'25%'
        },
        {
            title: 'Công cụ',
            dataIndex: 'maPhim',
            render: (text,film)=>{ return <Fragment>
                <NavLink key={1} className="text-2xl" to={`/admin/films/editfilm/${film.maPhim}`}> <EditOutlined style={{color:'blue'}}/> </NavLink>
                <span style={{cursor:'pointer'}} key={2} className="mx-2 text-2xl" onClick={()=>{
                    //Gọi Action xóa
                    if(window.confirm('Bạn thật sự muốn xóa phim '+ film.tenPhim )){
                    //gọi action
                    dispatch(xoaPhimAction(film.maPhim));
                    }
                }}> <DeleteOutlined style={{color:'red'}}/> </span>
                <NavLink key={3} className="text-2xl" to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} 
                onClick={()=>{
                    localStorage.setItem('filmParams',JSON.stringify(film));
                }}> <CalendarOutlined style={{color:'yelow'}}/> </NavLink>
            </Fragment>
            },
            sortDirections: ['descend','ascend'],
            width:'20%'
            
        },
      ];
    const data = arrFilm;
    
    const onSearch = value =>{
        console.log('value: ', value);
    
        //gọi api lay danh sach phim
        dispatch(layDanhSachPhimAction(value))
    
    }; 
    
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }
    return (
        <div className="container-fluid">
            <h3 className="text-4xl">Quản lý Phim</h3>
            <Button className="mb-4" onClick={()=>{
                history.push('/admin/films/addfilm');
            }}>Thêm Phim </Button>
            <Search className="mb-4"
                placeholder="input search text"
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={onSearch}

            />
            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"} />
        </div>
    )
}
