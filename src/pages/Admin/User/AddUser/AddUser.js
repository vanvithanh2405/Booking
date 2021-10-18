import React, { useState } from 'react';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
  Select
} from 'antd';
import { useFormik, validateYupSchema } from 'formik';
import { useDispatch } from 'react-redux';
import { themUserAction } from '../../../../redux/acitons/QuanLyNguoiDungAction';
import { GROUP_ID } from '../../../../util/settings/config';


const AddUser = () => {
  const [componentSize, setComponentSize] = useState('default');

  const dispatch = useDispatch();


    //formik xử lý form
  const formik = useFormik({
      initialValues:{
        taiKhoan: '',
        matKhau: '',
        email: '',
        soDt: '',
        maNhom: GROUP_ID,
        maLoaiNguoiDung: '',
        hoTen: '',
      },
      onSubmit: async (values, { formData }) =>{
        console.log('values', values)
        values.maNhom = GROUP_ID;
        await dispatch(themUserAction(values));
        formData();
      }
  })

  const handleChangeLoaiUser = async (values) => {
    formik.setFieldValue('maLoaiNguoiDung',values)
  }
    const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

    const convertSelectUser = () => {
    return [{label: 'Khách hàng', value: "KhachHang"}, {label: 'Quản Trị', value: "QuanTri"}]
}

  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
          <h3 className="mb-4">Thêm Users</h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Họ tên" >
          <Input name="hoTen" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Tài khoản">
          <Input name="taiKhoan" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Email" >
          <Input name="email" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Số điện thoại" >
          <Input name="soDt" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mật Khẩu" >
          <Input.Password name="matKhau" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Loại người dùng" onChange={formik.handleChange} >
          <Select options={convertSelectUser()} onChange={handleChangeLoaiUser} placeholder="Chọn loại người dùng!" />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <button type="submit" className="bg-blue-300 text-white p-2">Thêm Users</button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddUser;