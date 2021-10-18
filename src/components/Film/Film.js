import React, { useState,useEffect } from 'react'
import './Film.scss'
import moment from 'moment';
import { history } from './../../App';
import { Modal, Button } from 'antd';
export default function Film(props) {
	const { item } = props;
	const [isModalVisible, setIsModalVisible] = useState(false);
	const showModal = () => {
		setIsModalVisible(true)
	}
	const handleOk = () => {
		setIsModalVisible(false);
	};

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
	const convertLink = (url) => {
		return `https://www.youtube.com/embed/${getId(url)}`
	}
	const getId = (url) => {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);

		return (match && match[2].length === 11)
			? match[2]
			: null;
	}
	return (
		<div className="main  imgCard" >
			<img src={item.hinhAnh} className="backimg cursor-pointer" style={{ paddingTop: '10px' }} onClick={()=>{
				history.push(`/detail/${item.maPhim}`)
			}}/>
			<div onClick={()=>showModal()}>
				<i className="fa fa-play hover:scale-110 motion-reduce:transform-none" />
			</div>	
			<div className="title">
				<p>{item.tenPhim.length > 20 ? <span>{item.tenPhim.slice(0, 20)}...</span> : <span>{item.tenPhim}</span>}</p>
			</div>
			<div className="head1">
				<div className="date">
					<p>Ngày & giờ </p>
				</div>
				<div className="rate">
					<p>Đánh giá </p>
				</div>
			</div>
			<div className="head2">
				<div className="date">
					<p>{moment(item.ngayKhoiChieu).format('MMM DD')}, {moment(item.ngayKhoiChieu).format('HH:MM')}</p>
				</div>
				<div className="rate">
					<p>{item.danhGia}/10</p>
				</div>
			</div>
			<div className="head3 text-center">
				<button className="btn btn-secondary opacity-30 hover:opacity-100 font-medium" onClick={() => {
					history.push(`/detail/${item.maPhim}`);
				}}>XEM CHI TIẾT</button>
			</div>
			<Modal visible={isModalVisible} centered width={1000}
				style={{ width: (width / 100) }} footer onOk={handleOk} onCancel={handleCancel}>
				<iframe style={{ width: '100%' }} height="500px" src={convertLink(item.trailer)}></iframe>
			</Modal>
		</div>


	)
}