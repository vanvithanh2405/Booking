import { CustomCard } from '@tsamantanis/react-glassmorphism';
import { Rate } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { history } from '../../App';
import { layThongTinChiTietPhim } from '../../redux/acitons/QuanLyRapAction';
import { Tabs, Row, Col, Menu } from "antd";
import { NavLink } from 'react-router-dom';

import { Modal } from 'antd';
import { Collapse, Select } from 'antd';

import './DetailMobile.scss'
import { USER_LOGIN } from '../../util/settings/config';
const { TabPane } = Tabs;
const { Panel } = Collapse;

export default function DetailMobile(props) {

    const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail);

    // const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);


    console.log({ filmDetail })
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true)
    }
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const getId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url?.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }
    const convertLink = (url) => {
        return `https://www.youtube.com/embed/${getId(url)}`
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window
        return { width, height }
    }

    const useWindowDimensions = () => {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

        useEffect(() => {
            const handleResize = () => setWindowDimensions(getWindowDimensions())

            window.addEventListener('resize', handleResize)

            return () => window.removeEventListener('resize', handleResize)

        }, [])

        return windowDimensions
    }
    const { width } = useWindowDimensions();

    const dispatch = useDispatch();

    let { id } = props.match.params;

    useEffect(() => {

        //Lấy Thông tin từ đường dẫn
        dispatch(layThongTinChiTietPhim(id));

    }, [])
    const createRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    return (
        <div style={{ backgroundColor: "rgb(10, 32, 41)" }} >
            <h1>Hello Mobile</h1>
            <div className="relative" style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'top', minHeight: '270px' }}>
                <div onClick={() => showModal()} className="absolute btnPlayTrailer">
                    <img src="https://tix.vn/app/assets/img/icons/play-video.png" alt="play-trailer-button" />
                </div>
            </div>

            <div className="movie-info text-white pl-5 pr-5">
                <p className="opacity-60">{moment(filmDetail.ngayKhoiChieu).format('dd-mm-yyyy')}</p>
                <p className="text-xl text-white">{filmDetail.tenPhim}</p>
                <p className="text-white text-xs opacity-80">{filmDetail.moTa}</p>
                {/* {filmDetail.moTa.length > 200 ? filmDetail.moTa.slice(0, 200) + '...' : filmDetail.moTa} */}

                <div className="star-icon flex justify-between">

                    <Rate disabled allowHalf defaultValue={filmDetail.danhGia / 2} />
                    <h3 className="text-sm text-red-500 mt-2 inline-block">{filmDetail.danhGia}/10 Đánh giá</h3>
                </div>
            </div>

            {/* put film schedule code below this line */}
            <div style={{ paddingTop: 15 }}>
                <Collapse expandIconPosition="right">
                    {filmDetail.heThongRapChieu?.map((heThongRap, index) => {
                        return <Panel header={<div style={{ display: 'flex', alignItems: 'center' }}>
                            <img width={50} height={50} src={heThongRap.logo} alt={heThongRap.logo} />
                            <div style={{ flex: 1, paddingLeft: 24 }}>{heThongRap.maHeThongRap}</div>
                        </div>} key={index} >
                            <div className="tab-scroll-bar">
                                {heThongRap.cumRapChieu?.map((cumRap, index) => {
                                    return <div className="mt-10" key={index}>
                                        <div className="flex">
                                            <img className="rounded-md" src={cumRap.hinhAnh} alt={cumRap.tenCumRap} style={{ width: 50, height: 50 }} />

                                            <div className="ml-2">
                                                <p className="text-xl mb-2">{cumRap.tenCumRap}</p>
                                                <p className="text-xs opacity-80">{cumRap.diaChi}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap">
                                            {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                if (localStorage.getItem(USER_LOGIN)) {
                                                    return <NavLink className="col-span-1 mt-3 mr-5 w-20 px-2 py-3 bg-white text-center hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow hover:text-black" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                        {moment(lichChieu.ngayChieuGioChieu).format('HH:MM')}
                                                    </NavLink>
                                                } else {
                                                    return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="col-span-1 ">
                                                        <button className="bg-gray-300 hover:bg-gray-500 text-gray-500 hover:text-white font-semibold py-1 px-3 rounded-lg">{moment(lichChieu.ngayChieuGioChieu).format('HH:MM')}</button>
                                                    </NavLink>
                                                }
                                            })}
                                        </div>
                                    </div>
                                })}
                            </div>
                        </Panel>
                    })}
                </Collapse>
            </div>
            <Modal visible={isModalVisible} centered
                style={{ width: (width / 100) }} footer onOk={handleOk} onCancel={handleCancel}>
                <iframe style={{ width: '100%' }} height="400px" src={convertLink(filmDetail?.trailer)}></iframe>
            </Modal>
        </div>
    )
}