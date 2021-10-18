import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select, Cascader, DatePicker, InputNumber } from 'antd';
import { qlRapService } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { qlDatVeService } from '../../../services/QuanLyDatVeService';

export default function Showtime(props) {

    const formik= useFormik({
        initialValues:{
            maPhim:props.match.params.id,
            ngayChieuGioChieu:'',
            maRap:'',
            giaVe:''
        },
        onSubmit: async(values)=>{
            console.log('values: ', values);
            try{
                const result = await qlDatVeService.taoLichChieu(values);
                alert(result.data.content);

            }catch(error){
            console.log('error ', error.reponse?.data);

            }

        }
    })

    const [state, setstate] = useState({
        heThongRapChieu: [],

        cumRapChieu: []
    })

    // console.log('heThongRapChieu: ', state.heThongRapChieu);

    useEffect(async () => {
        try {
            let result = await qlRapService.layThongTinHeThongRap();
            setstate({
                ...state,
                heThongRapChieu: result.data.content
            })
        } catch (error) {
            
        }
        
    }, [])

    const handleChangeHeThongRap = async(value) => {
        //từ hệ thống rạp call api lấy thông tin cụm rạp
        try{
            let result = await qlRapService.layThongTinCumRap(value)
            //gán giá trị cụm rạp vào state.cumrap
            setstate({
                ...state,
                cumRapChieu: result.data.content
            })
        } catch(error){
            console.log('error ', error.reponse?.data);
        }

    }

    const handleChangeCumRap = (value) => {
        formik.setFieldValue('maRap',value);
    }

    const onOK = (values) => {
        console.log('values: ', values);

    }

    const onChangeDate = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
        console.log('values: ', moment(values).format('DD/MM/YYYY hh:mm:ss'));
    }

    const onchangeInputNumber = (value) => {
        formik.setFieldValue('giaVe',value)
    }

    const convertSelectHTR = () => {
        return state.heThongRapChieu?.map((htr,index) => {
        return { label: htr.tenHeThongRap, value: htr.tenHeThongRap }
    })
}
console.log(props.match.params);
let film = {};
if(localStorage.getItem('filmParams')){
    film = JSON.parse(localStorage.getItem('filmParams'));
}
return (
    <Form
        className="container"
        name="basic"
        labelCol={{
            span: 4,
        }}
        wrapperCol={{
            span: 20,
        }}
        initialValues={{
            remember: true,
        }}
        onSubmitCapture={formik.handleSubmit}
    // onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    // autoComplete="off"
    >
        <h3 className="text-2xl">Tạo lịch chiếu - {props.match.params.tenphim}</h3>
        <img src={film.hinhAnh} alt="..." width={200} height={100}/>
        <Form.Item label="Hệ thống rạp">
            <Select options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
        </Form.Item>
        {/* {return{label:htr.tenHeThongRap, value:htr.tenHeThongRap} }     */}
        {/* (      {label:htr.tenHeThongRap, value:htr.tenHeThongRap} )     */}
        {/* options={state.heThongRapChieu?.map((htr, index) => { return { label: htr.tenHeThongRap, value: htr.tenHeThongRap } })} */}

        <Form.Item label="Cụm rạp">
            <Select options={state.cumRapChieu?.map((cr, index) => { return { label: cr.tenCumRap, value: cr.maCumRap } })} onChange={handleChangeCumRap} placeholder="Chọn Cụm rạp" />
        </Form.Item>

        <Form.Item label="Ngày Giờ chiếu">
            <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOK} />
        </Form.Item>

        <Form.Item label="Giá vé">
            <InputNumber min={75000} max={150000} onChange={onchangeInputNumber} />
        </Form.Item>
        <Form.Item label="Tạo lịch chiếu">
            <Button htmlType="submit">Tạo</Button>
        </Form.Item>
    </Form>
)
}
