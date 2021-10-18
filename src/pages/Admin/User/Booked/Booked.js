import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layLichSuDatVeAction } from '../../../../redux/acitons/QuanLyNguoiDungAction';
import _ from 'lodash';
import {  } from 'antd';
export default function Booked(props) {
    const dispatch = useDispatch();
    const {thongTinNguoiDungTheoTaiKhoan} = useSelector(state => state.QuanLyNguoiDungReducer);
    
    
    console.log('thongTinNguoiDung: ', thongTinNguoiDungTheoTaiKhoan);
    const taiKhoan = props.match.params.taiKhoan;
    useEffect(() => {
        const action = layLichSuDatVeAction(taiKhoan);
        dispatch(action)
    }, [])
    const renderTicketItem = function (){
        return thongTinNguoiDungTheoTaiKhoan.thongTinDatVe?.map((ticket,index) => { 
            const seats = _.first(ticket.danhSachGhe);
            return <div className="p-2 lg:w-1/2 md:w-1/2 w-full" key={index}>
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                    <p className="text-gray-500" style={{fontSize:12}}>Giờ chiếu: {moment(ticket.ngayDat).format('hh.mm A')} - Ngày chiếu:{moment(ticket.ngayDat).format('DD/MM/YYYY')}</p>
                    <p className="text-gray-500" style={{fontSize:12}}>Địa diểm: {seats.tenHeThongRap} - {seats.tenRap}</p>
                    <p className="text-gray-500" style={{fontSize:12}}>Ghế : {ticket.danhSachGhe.map((ghe, index)=>{return <span key={index}>{ghe.tenGhe} </span>})}</p>
                </div>
            </div>
        </div>
        
        })
    }

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex flex-col text-center w-full mb-5">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Lịch sử đặt vé</h1>
                    </div>
                    <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                    </div>
                </div>
            </section>
        </div>
    )
}
