import { Star, Heart, ShieldCheck } from "lucide-react"
import SingleDropdown from "./SingleDropDown";
import { SetStateAction, useState } from "react";
import { SingleValue } from "react-select";

function Profile() {
    const gender = [
        { value: "Không quan trọng", label: "Không quan trọng" },
        { value: "Nam", label: "Nam" },
        { value: "Nữ", label: "Nữ" },
    ];
    const Position = [
        { value: "Nhân viên", label: "Nhân viên" },
        { value: "Trưởng phòng", label: "Trưởng phòng" },
        { value: "Giám đốc", label: "Giám đốc" },
        { value: "Nhân sự", label: "Nhân sự" }
    ];
    const [genderOptions, setGenderOptions] = useState<SingleValue<{
        value: string;
        label: string;
    }> | null>(null);
    const [position, setPosition] = useState<SingleValue<{
        value: string;
        label: string;
    }> | null>(null);
    return (
        <div className="flex flex-col w-full my-10 space-y-10 items-center">
            <div className="w-[95%] border-slate-200 border-2 px-8 py-4">
                <h1 className="text-black text-sl font-bold mb-5">
                    Tài khoản xác thực: <span className="text-green-600">Cấp 1/5</span>
                </h1>
                <div className="space-y-5">
                    <div className="flex flex-row space-x-2 items-center">
                        <Star
                            className="text-green-600 justify-center"
                            style={{ width: 28, height: 28 }}
                        />
                        <div className="text-[12px]">Nâng cấp tài khoản: Để đạt <span className="text-green-600">cấp 2/5</span>, Quý khách cần <span className="text-green-600">xác thực số điện thoại.</span></div>
                    </div>
                    <div className="flex flex-row space-x-2 items-center">
                        <Heart
                            className="text-green-600"
                            style={{ width: 28, height: 28 }}
                        />
                        <div className="text-[12px]">Quyền lợi: Khi đạt <span className="text-green-600">cấp 2/5</span>, Nhà tuyển dụng có 30 lượt tìm kiếm CV và 10 lượt xem CV từ công cụ tìm kiếm CV ứng viên</div>
                    </div>
                </div>
                <div className="justify-end flex flex-row m-3 space-x-2">
                    <button
                        className="text-sm btn-success py-1 px-2 rounded text-white bg-green-500 shadow-md cursor-pointer"
                    >
                        Cập nhật thông tin xác thực
                    </button>
                    <button
                        className="border-green-600 border-1 text-sm btn-success py-1 px-2 rounded text-green-600 bg-white border cursor-pointer"
                    >
                        Tìm hiểu thêm
                    </button>
                </div>
            </div>
            <div className="w-[95%] border-slate-200 border-2 px-8 py-4 space-y-5">
                <h1 className="text-black text-sl font-bold mb-5">
                    Cập nhật thông tin cá nhân
                </h1>
                <div
                    className={`btn text-sm p-2 flex items-center justify-between w-11/12`}
                    style={{
                        backgroundColor: "#EBF3FF",
                        color: "#2D7CF1",
                        marginBottom: "15.96px",
                    }}
                >
                    <div className="flex flex-row space-x-2 items-center" >
                        <ShieldCheck size={20} />
                        <button
                            className="bg-transparent"
                            onClick={() => {
                            }}
                        >
                            <span className="text-[13px] ml-1 mr-1">Xác nhận tài khoản điện tử eKYC</span>
                        </button>
                    </div>
                    <button
                        className="text-sm btn-success py-1 px-2 rounded text-white bg-blue-500 cursor-pointer"
                    >
                        Xác thực ngay
                    </button>
                </div>
                <div className="w-full flex flex-row items-center space-x-20">
                    <div className="w-5/12 flex flex-row items-center space-x-1">
                        <span>Avatar</span>
                        <img
                            src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
                            className="rounded-full"
                            style={{ width: "32px" }}
                            alt="Avatar"
                        />
                        <button
                            className="text-sm btn-success py-1 px-2 rounded bg-gray-100 cursor-pointer"
                        >
                            Đổi avatar
                        </button>
                    </div>
                    <span className="w-5/12">Email: nguyenthybinh9319@gmail.com</span>
                </div>
                <div className="w-full flex flex-row items-center space-x-20">
                    <div className="w-5/12 space-y-2">
                        <span className="text-gray-500 text-base font-semibold">
                            Họ và tên
                        </span>
                        <input
                            type="text"
                            className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                            placeholder="Nhập họ và tên"
                        />
                    </div>
                    <div className="w-5/12 space-y-2">
                        <span className="text-gray-500 text-base font-semibold">
                            Giới tính
                        </span>
                        <SingleDropdown
                            placeholder="-- Chọn giới tính --"
                            options={gender}
                            onChange={(e: SetStateAction<SingleValue<{ value: string; label: string; }>>) => setGenderOptions(e)}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-row items-center space-x-20">
                    <div className="w-5/12 space-y-2">
                        <span className="text-gray-500 text-base font-semibold">
                            Số điện thoại
                        </span>
                        <input
                            type="text"
                            className=" bg-gray-300 border border-slate-300 focus:border-green-500 outline-none text-slate-400 text-base  w-full p-2.5"
                            value={'0792905933'}
                            disabled
                        />
                    </div>
                    <div className="w-5/12 space-y-2">
                        <span className="text-gray-500 text-base font-semibold">
                            Vị trí
                        </span>
                        <SingleDropdown
                            placeholder="-- Chọn vị trí --"
                            options={Position}
                            onChange={(e: SetStateAction<SingleValue<{ value: string; label: string; }>>) => setPosition(e)}
                        />
                    </div>
                   
                </div>
                <div className="w-10/12 justify-end flex flex-row m-3 space-x-2 ml-20">
                        <button
                            className="border-green-600 border-1 text-sm btn-success py-1 px-2 rounded text-green-600 bg-white border cursor-pointer"
                        >
                            Hủy
                        </button>
                        <button
                            className="text-sm btn-success py-1 px-2 rounded text-white bg-green-500 shadow-md cursor-pointer"
                        >
                            Cập nhật
                        </button>
                    </div>
            </div>
        </div>)
}
export default Profile