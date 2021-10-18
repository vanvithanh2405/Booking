import { useFormik} from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import { dangKyAction } from './../../redux/acitons/QuanLyNguoiDungAction'
import { useDispatch, useSelector } from 'react-redux';


export default function Register(props) {



const dispatch = useDispatch();
const { errors } = useSelector((state) => state.QuanLyNguoiDungReducer);
    console.log('errorsScreen', errors)

const formikDangKy =  useFormik({
    initialValues:{
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "GP01",
        hoTen: ""
    },
    validationSchema: yup.object().shape({
        taiKhoan: yup.string().required("* Cần điền nội dung vào Field"),
        matKhau: yup.string().required("* Cần điền nội dung vào Field").min(6 , "Mặt khẩu tối thiểu 6 ký tự").max(30 , "Mặt khẩu tối đa 30 ký tự"),
        hoTen: yup.string().required("* Cần điền nội dung vào Field"),
        email: yup.string().required("* Cần điền nội dung vào Field").email("* Định dạng email phù hợp"),
        soDt: yup.string().required("* Cần điền nội dung vào Field").matches(/^[0-9]+$/).min(6 , "Số điện thoại tối thiểu 6 ký tự").max(20 , "Số điện thoại tối đa 20 ký tự"),
        maNhom: yup.string().required("* Cần điền nội dung vào Field")
}),
    onSubmit: values => {
        const action = dangKyAction(values);
        dispatch(action);
        console.log('values: ', values);
    },

})


    return (
            <div className="w-50 mx-auto">
              <h1 className="display-4 text-center">Đăng ký </h1>
                         
                <form onSubmit={formikDangKy.handleSubmit}>
                    <div className="form-group">
                        <label>Tài khoản{formikDangKy.errors.taiKhoan && formikDangKy.touched.taiKhoan ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formikDangKy.errors.taiKhoan} </span>) : null}</label>
                        <input name="taiKhoan" type="text" className="form-control" onChange={formikDangKy.handleChange}/>
                        
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu{formikDangKy.errors.matKhau && formikDangKy.touched.matKhau ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formikDangKy.errors.matKhau} </span>) : null}</label>
                        <input name="matKhau" type="password" className="form-control" onChange={formikDangKy.handleChange}/>
                       
                    </div>
                    <div className="form-group">
                        <label>Họ tên{formikDangKy.errors.hoTen && formikDangKy.touched.hoTen ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formikDangKy.errors.hoTen} </span>) : null}</label>
                        <input name="hoTen" type="text" className="form-control" onChange={formikDangKy.handleChange}/>
                        
                    </div>
                    <div className="form-group">
                        <label>Email{formikDangKy.errors.email && formikDangKy.touched.email ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formikDangKy.errors.email} </span>) : null}</label>
                        <input name="email" type="text" className="form-control" onChange={formikDangKy.handleChange}/>
                        
                        
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại{formikDangKy.errors.soDt && formikDangKy.touched.soDt ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formikDangKy.errors.soDt} </span>) : null}</label>
                        <input name="soDt" type="text" className="form-control" onChange={formikDangKy.handleChange}/>
                        

                    </div>
                    <div className="form-group">
                        <label>Mã nhóm{formikDangKy.errors.maNhom && formikDangKy.touched.maNhom ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formikDangKy.errors.maNhom} </span>) : null}</label>
                        <select name="maNhom" className="form-control" onChange={formikDangKy.handleChange}>
                        <option>GP01</option>
                        <option>GP02</option>
                        <option>GP03</option>
                        <option>GP04</option>
                        <option>GP05</option>
                        <option>GP06</option>
                        <option>GP07</option>
                        <option>GP08</option>
                        <option>GP09</option>
                        <option>GP10</option>
                        </select>
                        

                    </div>
                    <div className=" text-center">
                        <button className="btn btn-success">Đăng ký</button>
                    </div>
                </form> 
              
                
            </div>
        
    )
}


