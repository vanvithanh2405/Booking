import React, { Fragment, useEffect } from 'react';

import './Profile.css'
//hinh avatar
import Avatar from './../../imgRap/ACTOR PNG/istockphoto-654224782-170667a (1).jpg'
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../App';
import { layThongTinDatVeAction, layThongTinNguoiDungAction } from '../../redux/acitons/QuanLyNguoiDungAction';
import moment from 'moment';
import _ from 'lodash';

export default function Profiles(props) {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('userLogin: ', userLogin);
    const renderNguoiDung = () => {
        if (userLogin.maLoaiNguoiDung === 'QuanTri') {
            return <Fragment>
                <button className="btnAdmin" onClick={() => {
                    history.push('/admin')
                }}>Trang Admin</button>
            </Fragment>
        }
    }
    return (
        <div>
            <div className="profileBackground"></div>
            <div className="tabsProfile">
                <div className="profiles">
                    <div className="grid grid-cols-9 m-5">
                        <div className="profileBG col-span-3 bg-gradient-to-r from-gray-100 to-gray-300">
                            <div>
                                <img className="imgAvatar text-center mb-3" src={Avatar} alt="" />
                                <h1 className="text-xl text-center">{userLogin.hoTen}</h1>
                                <h1 className="text-l text-center">{userLogin.maLoaiNguoiDung}</h1>
                            </div>

                        </div>
                        <div className="col-span-6 infoProfile">
                            <h1 className="text-2xl">INFORMATION</h1>
                            <hr />
                            <div className="grid grid-cols-8">
                                <div className="col-span-4">
                                    <h5>Họ Tên: <br /><span> {userLogin.hoTen}</span></h5>
                                    <h5>Tài khoản: <br /><span>{userLogin.taiKhoan}</span></h5>
                                </div>
                                <div className="col-span-4">
                                    <h5>Email: <br /><span>{userLogin.email}</span> </h5>
                                    <h5>Số điện thoại: <br /><span>{userLogin.soDT}</span></h5>
                                </div>
                            </div>
                            <h1 className="text-2xl">CONTACTS</h1>
                            <hr />
                            <div className="grid grid-cols-8">
                                <div className="col-span-4 iconSocial">
                                    <h5>Mạng xã hội: </h5>
                                    <div>
                                        <i className="fab fa-facebook-square hover:text-blue-600" />
                                        <i className="fab fa-instagram" />
                                        <i className="fab fa-twitter hover:text-blue-400" />
                                    </div>

                                </div>
                            </div>

                            {renderNguoiDung()}
                        </div>
                    </div>
                    <hr className="mx-4 mt-4" />
                    <h1 className="text-3xl my-4 text-center font-semibold">LỊCH SỬ ĐẶT VÉ </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-l text-center"><i> Hãy xem thông tin địa chỉ, suất chiếu và thời gian để trải nghiệm phim một cách tốt nhất nhé !</i></p>

                    <div className=" mx-4 overscroll-auto overflow-auto h-40 scrollBar">
                        <KetQuaDatVe {...props} />
                    </div>
                </div>
            </div>
        </div>
    )
}


function KetQuaDatVe(props) {

    const dispatch = useDispatch();

    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    useEffect(() => {
        const action = layThongTinDatVeAction();
        dispatch(action)
    }, [])

    console.log('thongTinNguoiDung', thongTinNguoiDung)

    const renderTicketItem = () => {

        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe)
            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full text-base" key={index}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium tenPhim">{ticket.tenPhim}</h2>
                        <span className="diaDiem">{seats.tenHeThongRap} / {seats.tenRap}</span>
                        <p className="text-gray-500 gioChieu">{moment(ticket.ngayDat).format('DD-MM-YYYY')} / {moment(ticket.ngayDat).format('HH:MM')}  </p>

                    </div>
                </div>
            </div>
        })
    }

    return <section className="text-gray-600 body-font">
        <div className="container px-2 py-2 mx-auto">
            <div className="flex flex-wrap -m-2">
                {renderTicketItem()}
            </div>
        </div>
    </section>

}
