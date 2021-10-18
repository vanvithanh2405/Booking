import { qlNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG, DANG_KY_ACTION, SET_DANH_SACH_NGUOI_DUNG,SET_THONG_TIN_NGUOI_DUNG_THEO_TAI_KHOAN } from "../types/QuanLyNguoiDungType";
import { history } from './../../App';
import Swal from 'sweetalert2';


export const dangKyAction = (thongTinDangKy) => {
    console.log('thongTinDangKy: ', thongTinDangKy);
    return async(dispatch) => {
        try {
            const result = await qlNguoiDungService.dangKy(thongTinDangKy);

            console.log('result: ', result);
            // taiKhoan: 'qanhkun', matKhau: 'qanhkun'}
            if (result?.status === 200) {
                Swal.fire({
                    title: 'Đăng ký thành công!',
                    icon: 'success',
                    confirmButtonColor: '#44c020'
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch({
                            type: DANG_KY_ACTION,
                            thongTinDangKy: result?.data?.content
                        });
                        history.push("/login");
                        window.location.reload();
                    }
                })
            }

            console.log('result', result);

        } catch (error) {
            console.log('error', error.response?.data);
            Swal.fire({
                title: 'Đăng ký thất bại!',
                text: `${error.response?.data.content}`,
                icon: 'error',
            })
        }
    }
}

export const dangNhapAction = (thongTinDangNhap) => {
    console.log('thongTinDangNhap: ', thongTinDangNhap);


    return async(dispatch) => {
        try {
            const result = await qlNguoiDungService.dangNhap(thongTinDangNhap);
            if (result.data.statusCode === 200) {
                dispatch({
                        type: DANG_NHAP_ACTION,
                        thongTinDangNhap: result.data.content
                    })
                    // chuyen huong ve trang truoc do 
                history.push("/home");
            }

            console.log('result', result)
        } catch (error) {
            console.log('errors', error.response.data)
            Swal.fire({
                icon: 'error',
                title: error.response?.data.message,
                text: `${error.response?.data.content}`,
            })
        }
    }
}

export const layThongTinNguoiDungAction = (taiKhoan) => {

    // sửa lại lấy thông tin người dùng action mới hiện ra được lịch sử đặt vé
    return async(dispatch) => {
        try {
            const result = await qlNguoiDungService.layThongTinNguoiDung(taiKhoan);
            dispatch({
                type: SET_THONG_TIN_NGUOI_DUNG,
                thongTinNguoiDung: result?.data.content
            })

            console.log('result', result.data.content)
        } catch (error) {
            console.log('errors', error.response.data)
            Swal.fire({
                icon: 'error',
                title: error.response?.data.message,
                text: `${error.response?.data.content}`,
        })
    }
}}

export const layThongTinDatVeAction = () => {


    return async(dispatch) => {
        try {
            const result = await qlNguoiDungService.layThongTinNguoiDung();
            dispatch({
                type: SET_THONG_TIN_NGUOI_DUNG,
                thongTinNguoiDung: result?.data.content
            })

            console.log('result', result.data.content)
        } catch (error) {
            console.log('errors', error.response.data)
            Swal.fire({
                icon: 'error',
                title: error.response?.data.message,
                text: `${error.response?.data.content}`,
        })
    }
}}



//cách 1
export const layDanhSachUserAction = (taiKhoan) => {

    return async(dispatch) => {
        try {
            
            const result = await qlNguoiDungService.layDanhSachUser(taiKhoan);
            
            dispatch({
                type: SET_DANH_SACH_NGUOI_DUNG,
                danhSachNguoiDung: result.data.content
            })
        } catch (errors) {
            console.log('result', errors.response?.data);
        }
    }
}

//cách 2
// export const layDanhSachUserAction = (tuKhoa, isSearch = false) => {

//     return async(dispatch) => {
//         try {
//             if (!isSearch) {
//                 const result = await qlNguoiDungService.layDanhSachUser();

//                 if (result?.status === 200) {
//                     dispatch({
//                         type: SET_DANH_SACH_NGUOI_DUNG,
//                         danhSachNguoiDung: result?.data.content
//                     })

//                 }
//             } else {
//                 const result = await qlNguoiDungService.layDanhSachUserSearch(tuKhoa);

//                 if (result.status === 200) {
//                     dispatch({
//                         type: SET_DANH_SACH_NGUOI_DUNG,
//                         danhSachNguoiDung: result?.data.content
//                     })

//                 }
//             }
//             // const result = await qlNguoiDungService.layDanhSachUser(taiKhoan);

//             // dispatch({
//             //     type: SET_DANH_SACH_NGUOI_DUNG,
//             //     danhSachNguoiDung: result.data.content
//             // })
//         } catch (errors) {
//             console.log('result', errors.response?.data);
//             Swal.fire({
//                 icon: 'error',
//                 title: errors.response?.data.message,
//                 text: `${errors.response?.data.content}`,
//             })
//         }
//     }
// }

export const themUserAction = (formData)=>{
    return async (dispatch) => {
        // try {
        //     let result = await qlNguoiDungService.themUser(formData);
        //     alert("Thêm user thành công");
        //     console.log('result', result.data.content);
        // } catch (errors) {
        //     console.log('errors', errors.response?.data)
        // }
        try {
            const result = await qlNguoiDungService.themUser(formData);
            if (result.status === 200) {
                Swal.fire({
                    title: 'Thêm User thành công!',
                    icon: 'success',
                    confirmButtonColor: '#44c020'
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(layDanhSachUserAction())
                    }
                })

            }

            console.log('result', result);


        } catch (errors) {
            console.log('result', errors.response?.data);
            console.log('result', errors.response);
            Swal.fire({
                icon: 'Thêm thất bại!',
                title: errors.response?.data.message,
                text: `${errors.response?.data.content}`,
            })
        }
    }
}

export const capNhatUserAction = (formData)=>{
    return async (dispatch) => {
        try {
            let result = await qlNguoiDungService.capNhatUser(formData);
            //alert("Thêm user thành công");
            Swal.fire({
                    title: 'Thêm User thành công!',
                    icon: 'success',
                    confirmButtonColor: '#44c020'
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(layDanhSachUserAction());
                        history.push('/admin/user');
                    }
                })
            console.log('result', result.data.content);

            
        } catch (errors) {
            console.log('errors', errors.response?.data);
             Swal.fire({
                icon: 'Cập nhật không thành công!',
                title: errors.response?.data.message,
                text: `${errors.response?.data.content}`,
            })
        }
    }
}
export const layLichSuDatVeAction = (taiKhoan) => {


    return async(dispatch) => {

        try {
            const result = await qlNguoiDungService.layThongTinUserTheoTaiKhoan(taiKhoan);
            if (result?.status === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG_THEO_TAI_KHOAN,
                    thongTinNguoiDungTheoTaiKhoan: result?.data.content
                })
            }
        } catch (errors) {
            // dispatch(hideLoadingAction);
            console.log('errors', errors.response?.data);
        }
    }
}

export const xoaUserAction = (taiKhoan) => {

    return async (dispatch) => {
        try {
            const result = await qlNguoiDungService.xoaUser(taiKhoan);
            alert('Xóa User thành công')
            console.log(result.data.content);
            //sau xóa load lại danh sách 
            dispatch(layDanhSachUserAction())
            
        } catch (errors) {
            console.log('errors', errors.response?.data)
        }
    }
}
