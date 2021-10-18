/* eslint-disable import/no-anonymous-default-export */
import _, { startCase } from 'lodash'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DatVeAction, LayChiTietPhongVeAction } from '../../redux/acitons/QuanLyDatVeAction';
import { DAT_VE } from './../../redux/types/QuanLyDatVeType'
import { ThongTinDatVe } from './../../_core/models/ThongTinDatVe'
// Css
import checkoutStyle from './Checkout.module.css';
import './Checkout.css'
// Antd
import { UserOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { history } from '../../App';
import { TOKEN, USER_LOGIN } from '../../util/settings/config';


function Checkout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);


    const dispatch = useDispatch();

    useEffect(() => {
        // Gọi hàm tạo ra một async function
        const action = LayChiTietPhongVeAction(props.match.params.id);
        // sau đó dispatch function này đi 
        dispatch(action);
    }, [])

    console.log({ chiTietPhongVe });


    const { thongTinPhim, danhSachGhe } = chiTietPhongVe

    const renderSeats = () => {
        return danhSachGhe.map((ghe, index) => {

            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';

            let classGheDangDat = '';

            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);

            let classGheDaDuocDat = '';

            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheDaDuocDat = 'gheDaDuocDat';
            }

            if (indexGheDD != -1) {
                classGheDangDat = 'gheDangDat';
            }



            return <Fragment key={index}>
                <button onClick={() => {
                    dispatch({
                        type: DAT_VE,
                        gheDuocChon: ghe
                    })
                }} disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} text-center `} key={index}>
                    {ghe.daDat ? classGheDaDuocDat != '' ? <UserOutlined style={{ marginBottom: 0 }} /> : <CloseOutlined style={{ marginBottom: 0 }} /> : ghe.stt}
                </button>


                {/* Chia một cột là 16 ghế  */}
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>
        })
    }
    return (
        <div className="container-fluid min-h-screen">
            <div className="grid grid-cols-12 mt-2 mb-5">
                <div className="col-span-2"></div>
                <div className="info_Rap col-span-8">

                    <div><p className="mb-0"><span className="font-semibold">Địa điểm: </span>{thongTinPhim.tenCumRap}</p></div>
                    <div><p className="mb-0"><span className="font-semibold">Phim: </span> {thongTinPhim.tenPhim}</p></div>
                    <div><p className="mb-0"><span className="font-semibold">Ngày chiếu: </span> {thongTinPhim.ngayChieu}</p></div>
                </div>
                <div className="col-span-2"></div>

            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-9 layout_Rap">
                    <div className="flex flex-col items-center mt-5">

                        <div className="bg-white" style={{ width: '80%', height: 15 }}>
                        </div>
                        <div className={`${checkoutStyle['trapezoid']}`}>
                        </div>
                        <div className={`${checkoutStyle['manHinh']}`}>
                            <h3 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-100 to-gray300 ">Screen</h3>
                        </div>
                        <div>
                            {renderSeats()}
                        </div>
                    </div>

                    <div className="mt-5 flex justify-center">
                        <table className=" divide-y divide-gray-200 w-2/3">
                            <thead className="bg-gray-50 p-5 text-center ">
                                <tr>
                                    <th>Ghế chưa đặt</th>
                                    <th>Ghế đang đặt</th>
                                    <th>Ghế vip</th>
                                    <th>Ghế đã đặt</th>
                                    <th>Ghế mình đặt</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-center">
                                <tr>
                                    <td><button className="ghe text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                    <td><button className="ghe gheDangDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button> </td>
                                    <td><button className="ghe gheVip text-center"><CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button> </td>
                                    <td><button className="ghe gheDaDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                    <td><button className="ghe gheDaDuocDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-3 layout_Bill">
                    <h3 className="text-2xl my-3 text-center pt-4">{thongTinPhim.tenPhim}</h3>
                    <hr />
                    <p className="text-base pt-3">Địa điểm: <span className="font-semibold">{thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</span></p>
                    <p className="text-base">Ngày chiếu : <span className="font-semibold">{thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</span></p>
                    <hr />
                    <div className="grid grid-cols-2 my-3">
                        <div>
                            <span className="text-red-400 text-xl font-semibold">Ghế: </span>
                            {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                return <span key={index} className="text-green-500 text-xl mr-2">{gheDD.stt}</span>
                            })}
                        </div>
                        <div className="text-right">
                            <span className="text-green-400 text-xl font-semibold">
                                {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                    return tongTien += ghe.giaVe;
                                }, 0).toLocaleString()} <label>VND</label>
                            </span>
                        </div>
                    </div>
                    <hr />
                    <h5 className="pt-3 text-xl text-center">Thông tin người đặt</h5>

                    <div className="text-lg my-3">
                        <i>Email: </i>
                        {userLogin.email}
                        {/* {userLogin.email.length > 15 ? userLogin.email.substr(0, 15) + '...' : userLogin.email} */}

                    </div>
                    <div className="text-lg my-3">
                        <i>Phone: </i>
                        {userLogin.soDT}
                        {/* {userLogin.soDT.length > 15 ? userLogin.soDT.substr(0, 15) + '...' : userLogin.soDT} */}


                    </div>
                    <hr />
                    <h5 className="pt-3 text-xl">Thành Tiền:</h5>
                    <h4 className="text-center text-2xl text-green-400">
                        {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                            return tongTien += ghe.giaVe;
                        }, 0).toLocaleString()} <span>VND</span>
                    </h4>
                    <div className="mb-0 h-full flex flex-col items-center" style={{ marginBottom: 0 }} >
                        <div onClick={() => {
                            const thongTinDatVe = new ThongTinDatVe();
                            thongTinDatVe.maLichChieu = props.match.params.id;
                            thongTinDatVe.danhSachVe = danhSachGheDangDat;

                            console.log('thongTinDatVe', thongTinDatVe);
                            const action = DatVeAction(thongTinDatVe);
                            dispatch(action)

                        }} className="bg-gray-600 hover:bg-gray-800 text-white w-3/4 text-center py-3 font-semibold text-lg cursor-pointer">
                            ĐẶT VÉ
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default function (props) {

    // const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    return <div className="layoutCha">
        <div className="layoutCSS"></div>
        
        <div className="layoutCon">
                <Checkout {...props} />
        </div>

    </div>
}

