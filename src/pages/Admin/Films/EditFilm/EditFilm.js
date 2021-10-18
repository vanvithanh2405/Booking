import React, { useState, useEffect} from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinPhimAction,capNhatPhimUploadHinhAction } from '../../../../redux/acitons/QuanLyPhimActions';
import { GROUP_ID } from '../../../../util/settings/config';

const EditFilm = (props) => {
  const [componentSize, setComponentSize] = useState('default');
  const {thongTinPhim}= useSelector(state => state.QuanLyPhimReducer)
console.log('thongtincuaphim',thongTinPhim)

  const [imgSrc,setImgSrc] = useState('');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const dispatch = useDispatch();
  useEffect(() => {
      let {id} = props.match.params;
      dispatch(layThongTinPhimAction(id))
  }, [])

    //formik xử lý form
  const formik = useFormik({
      enableReinitialize:true,
      initialValues:{
        maPhim: thongTinPhim.maPhim,
        tenPhim: thongTinPhim.tenPhim,
        trailer: thongTinPhim.trailer,
        moTa: thongTinPhim.moTa,
        ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
        sapChieu: thongTinPhim.sapChieu,
        dangChieu: thongTinPhim.dangChieu,
        hot: thongTinPhim.hot,
        danhGia: thongTinPhim.danhGia,
        maNhom: GROUP_ID,
        hinhAnh:null
      },
      onSubmit: (values) => {
          values.maNhom = GROUP_ID;
          
          //tạo đối tượng formData=> đưa giá trị từ values forimk vào formData
          let formData = new FormData();
            for(let key in values) {
                if (key !== 'hinhAnh'){
                    formData.append(key, values[key]);
                }else{
                    if(values.hinhAnh !== null){
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }
                }
            }
        //gọi api gửi các giá trị formdata về backend xử lý
        //   console.log('formdata', formData.get('File'));
          dispatch(capNhatPhimUploadHinhAction(formData));
          console.log('values ', values);
        //   console.log(formData.get('maNhom'));
          
      }
  })

    //xử lý DataPicker
  const handleChangeDatePicker = (value)=>{
    // console.log('value',moment(value).format('DD/MM/YYYY'));
    let ngayKhoiChieu=moment(value);
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
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
const handleChangeFileImg = async (event) => {
        //lấy file ra từ e
        let file = event.target.files[0];
        if(file.type === 'image/jpeg' || 'image/gif' || 'image/jpg' || 'image/png'){
        //đem dữ liệu file lưu vào formik trước
        await formik.setFieldValue('hinhAnh',file);
        //tạo đối tượng đọc file
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) =>{
        // console.log(event.target.result);
            setImgSrc(event.target.result)//hình base64
        }
        // console.log('file',file);
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
          <h3 className="mb-4">Edit Thông tin phim</h3>
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
          <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim}/>
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer}/>
        </Form.Item>
        <Form.Item label="Mô tả" >
          <Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa}/>
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker onChange={handleChangeDatePicker} format={"DD/MM/YYYY"} value={moment(formik.values.ngayKhoiChieu)}/>
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch onChange={handleChangeSwich('dangChieu')} checked={formik.values.dangChieu}/>
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch  onChange={handleChangeSwich('sapChieu')} checked={formik.values.sapChieu}/>
        </Form.Item>
        <Form.Item label="Hot">
          <Switch  onChange={handleChangeSwich('hot')} checked={formik.values.hot}/>
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} value={formik.values.danhGia}/>
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFileImg} accept="image/png,image/jpg,image/gif,image/jpeg"/>
        <br />
        <img  alt="..." style={{width:150,height:150}} src={imgSrc===''? thongTinPhim.hinhAnh : imgSrc}/>
        </Form.Item>
        <Form.Item label="Tác vụ">
          <button type="submit" className="bg-blue-300 text-white p-2">Cập Nhật</button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditFilm;