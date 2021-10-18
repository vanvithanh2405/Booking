import React, { useState } from 'react';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
} from 'antd';
import { useFormik, validateYupSchema } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../../redux/acitons/QuanLyPhimActions';
import { GROUP_ID } from '../../../../util/settings/config';

const AddFilm = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc,setImgSrc] = useState('');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const dispatch = useDispatch();


    //formik xử lý form
  const formik = useFormik({
      initialValues:{
        tenPhim: '',
        trailer: '',
        moTa: '',
        ngayKhoiChieu: '',
        sapChieu: false,
        dangChieu: false,
        hot: false,
        danhGia: 0,
        maNhom: GROUP_ID,
        hinhAnh:{}
      },
      onSubmit: (values) => {
          values.maNhom = GROUP_ID;

          //tạo đối tượng formData=> đưa giá trị từ values forimk vào formData
          let formData = new FormData();
            for(let key in values) {
                if (key !== 'hinhAnh'){
                    formData.append(key, values[key]);
                }else{
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);
                }
            }
          //gọi api gửi các giá trị formdata về backend xử lý
            //   console.log('formdata', formData.get('File'));
          dispatch(themPhimUploadHinhAction(formData));
          console.log(formData.get('maNhom'));
          console.log('values ', values);
      }
  })

    //xử lý DataPicker
  const handleChangeDatePicker = (value)=>{
      let ngayKhoiChieu=moment(value).format('DD/MM/YYYY');
      formik.setFieldValue('ngayKhoiChieu',ngayKhoiChieu)
  }

    //xử lý swich
  const handleChangeSwich = (name)=>{
      return (value)=>{
          formik.setFieldValue(name,value)
  }   
}

    //xử lý inputNumber
  const handleChangeInputNumber = (name) => {
      return (value)=>{
        formik.setFieldValue(name,value)
  }
}
    //xử lý ảnh
const handleChangeFileImg = (event) => {
        //lấy file ra từ e
        let file = event.target.files[0];
        if(file.type === 'image/jpeg' || 'image/gif' || 'image/jpg' || 'image/png'){
        //tạo đối tượng đọc file
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) =>{
        // console.log(event.target.result);
            setImgSrc(event.target.result)//hình base64
        }
        // console.log('file',file);
        formik.setFieldValue('hinhAnh',file)
    }
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
          <h3 className="mb-4">Thêm Phim Mới</h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {/* <Form.Item label="Mã Phim">
          <Input name="maPhim"/>
        </Form.Item> */}
        <Form.Item label="Tên Phim" >
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô tả" >
          <Input name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker}/>
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch onChange={handleChangeSwich('dangChieu')}/>
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch  onChange={handleChangeSwich('sapChieu')}/>
        </Form.Item>
        <Form.Item label="Hot">
          <Switch  onChange={handleChangeSwich('hot')}/>
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10}/>
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFileImg} accept="image/png,image/jpg,image/gif,image/jpeg"/>
        <br />
        <img src={imgSrc} alt="..." style={{width:150,height:150}} />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <button type="submit" className="bg-blue-300 text-white p-2">Thêm Phim</button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddFilm;