import React, { useState ,useEffect} from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { capNhatUserAction,layThongTinNguoiDungAction } from '../../../../redux/acitons/QuanLyNguoiDungAction';
import { GROUP_ID } from '../../../../util/settings/config';


const EditUser = (props) => {
  const [componentSize, setComponentSize] = useState('default');

  const {thongTinNguoiDungTheoTaiKhoan} = useSelector(state => state.QuanLyNguoiDungReducer);

  console.log('thongTinNguoiDungTheoTaiKhoan',thongTinNguoiDungTheoTaiKhoan)
  const dispatch = useDispatch();
  useEffect(() => {
      let {id} = props.match.params;
      dispatch(layThongTinNguoiDungAction(id))
  }, [])


    //formik xử lý form
  const formik = useFormik({
      enableReinitialize:true,
      initialValues:{
        taiKhoan: thongTinNguoiDungTheoTaiKhoan.taiKhoan,
        matKhau: thongTinNguoiDungTheoTaiKhoan.matKhau,
        email: thongTinNguoiDungTheoTaiKhoan.email,
        soDt: thongTinNguoiDungTheoTaiKhoan.soDT,
        maNhom: GROUP_ID,
        maLoaiNguoiDung: thongTinNguoiDungTheoTaiKhoan.maLoaiNguoiDung,
        hoTen: thongTinNguoiDungTheoTaiKhoan.hoTen,
      },
      onSubmit: async (values, { formData }) =>{
        console.log('values', values)
        values.maNhom = GROUP_ID;
        await dispatch(capNhatUserAction(values));
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
          <Input name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen}/>
        </Form.Item>
        <Form.Item label="Tài khoản">
          <Input name="taiKhoan" onChange={formik.handleChange} value={formik.values.taiKhoan} />
        </Form.Item>
        <Form.Item label="Email" >
          <Input name="email" onChange={formik.handleChange} value={formik.values.email}/>
        </Form.Item>
        <Form.Item label="Số điện thoại" >
          <Input name="soDt" onChange={formik.handleChange} value={formik.values.soDt}/>
        </Form.Item>
        <Form.Item label="Mật Khẩu" >
          <Input.Password name="matKhau" onChange={formik.handleChange} value={formik.values.matKhau}/>
        </Form.Item>
        <Form.Item label="Loại người dùng" onChange={formik.handleChange} >
          <Select options={convertSelectUser()} onChange={handleChangeLoaiUser} value={formik.values.maLoaiNguoiDung} placeholder="Chọn loại người dùng!" />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <button type="submit" className="bg-blue-300 text-white p-2">Edit Users</button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditUser;