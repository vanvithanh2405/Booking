import { qlPhimService } from "../../services/QuanLyPhimService"
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "../types/QuanLyPhimType";
import {history} from "../../App"



export const layDanhSachPhimAction = (tenPhim='') => {

    return async (dispatch) => {
        try {
            const result = await qlPhimService.layDanhSachPhim(tenPhim);

            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors)
        }
    }
}
export const themPhimUploadHinhAction = (formData)=>{
    return async (dispatch) => {
        try {
            let result = await qlPhimService.themPhimUploadHinh(formData);
            alert("Thêm phim thành công");
            console.log('result', result.data.content);
        } catch (errors) {
            console.log('errors', errors.response?.data)
        }
    }
}

export const capNhatPhimUploadHinhAction = (formData)=>{
    return async (dispatch) => {
        try {
            let result = await qlPhimService.capNhatPhimUpload(formData);
            alert("Cập nhật phim thành công");
            console.log('result', result.data.content);

            dispatch(layDanhSachPhimAction());
            history.push('/admin/films');
        } catch (errors) {
            console.log('errors', errors.response?.data)
        }
    }
}

export const layThongTinPhimAction = (maPhim) => {

    return async (dispatch) => {
        try {
            const result = await qlPhimService.layThongTinPhim(maPhim);
            //console.log(result.data.content);
            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors)
        }
    }
}

export const xoaPhimAction = (maPhim) => {

    return async (dispatch) => {
        try {
            const result = await qlPhimService.xoaPhim(maPhim);
            alert('Xóa phim thành công')
            console.log(result.data.content);
            //sau xóa load lại danh sách 
            dispatch(layDanhSachPhimAction())
            
        } catch (errors) {
            console.log('errors', errors.response?.data)
        }
    }
}


