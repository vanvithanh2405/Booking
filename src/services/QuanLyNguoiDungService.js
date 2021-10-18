/* eslint-disable no-useless-constructor */
// Đây là file quản lý những api trả về
import { GROUP_ID } from "../util/settings/config";
import { baseService } from "./baseService"


export class QuanLyNguoiDungService extends baseService {


    constructor() {
        super();
    }

    dangNhap = (thongTinDangNhap) => { // {taiKhoan: '',matKhau: ''}
        return this.post(`api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    }

    dangKy = (thongTinDangKy) => {
        return this.post(`api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
    }

    layThongTinNguoiDung = () => {
            return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`)
        }
        //cách 1
    layDanhSachUser = (taiKhoan = '') => {
            if (taiKhoan !== '') {
                return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${taiKhoan}`);
            }
            return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung`)
        }
        //cách 2
        // layDanhSachUser = () => {
        //     return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung`)
        // }
        // layDanhSachUserSearch = (tuKhoa = '') => {
        //     return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${tuKhoa}`);
        // }


    layThongTinUserTheoTaiKhoan = (taiKhoan) => {
        return this.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`);
    }
    themUser = (formData) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, formData);
    }
    capNhatUser = (formData) => {
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, formData);
    }
    xoaUser = (taiKhoan) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }





}

export const qlNguoiDungService = new QuanLyNguoiDungService();