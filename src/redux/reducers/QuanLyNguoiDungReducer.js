import { DANG_KY_ACTION, DANG_NHAP_ACTION, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG_THEO_TAI_KHOAN } from './../types/QuanLyNguoiDungType'
import { TOKEN, USER_LOGIN } from './../../util/settings/config'


let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefault = {
    userLogin: user,

    thongTinNguoiDung: {},
    danhSachNguoiDung: [],
    thongTinNguoiDungTheoTaiKhoan: {},
    errors: ''
}



export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {

    switch (action.type) {

        case DANG_NHAP_ACTION:
            {
                const { thongTinDangNhap } = action;
                localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
                localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
                return {...state, userLogin: thongTinDangNhap }
            }
        case DANG_KY_ACTION:
            {
                // const { thongTinDangKy } = action;
                // localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangKy));
                // localStorage.setItem(TOKEN, thongTinDangKy.accessToken);
                // return {...state, userLogin: thongTinDangKy };
                return {...state };
            }

        case SET_THONG_TIN_NGUOI_DUNG:
            {
                state.thongTinNguoiDung = action.thongTinNguoiDung;
                return {...state }
            }
        case SET_THONG_TIN_NGUOI_DUNG_THEO_TAI_KHOAN:
            {
                state.thongTinNguoiDungTheoTaiKhoan = action.thongTinNguoiDungTheoTaiKhoan;
                return {...state }
            }
        case SET_DANH_SACH_NGUOI_DUNG:
            {
                state.danhSachNguoiDung = action.danhSachNguoiDung;
                console.log('DanhSachNguoiDung', state.danhSachNguoiDung)
                return {...state }
            }

        default:
            return {...state }
    }
}