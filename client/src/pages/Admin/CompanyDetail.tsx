import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Switch from '../../shared/components/CustomSwitch';
import { getCompanyById } from '../../modules/helper';
import { updateCompanyStatus } from '../../modules/admin-module';
import { CompanyFromServer } from '../../shared/types/Company.type';
import { CheckCheck } from 'lucide-react';
import { useProfileContext } from '../../shared/services/authen/domain/context';
import { errorToast } from '../../utils/toast';

function CompanyDetail() {
  const navigation = useNavigate();
  const { id } = useParams();
  const [companyInfo, setCompanyInfo] = useState<CompanyFromServer | null>();
  const [refresh, setRefresh] = useState(false);
  const { token } = useProfileContext();

  useEffect(() => {
    if (!id) return;
    fetchCompanyInfo(id);
  }, []);
  useEffect(() => {
    if (!id) return;
    fetchCompanyInfo(id);
  }, [id, refresh]);
  const fetchCompanyInfo = async (id: string) => {
    try {
      const response = await getCompanyById(id);
      setCompanyInfo(response);
    } catch (error) {
      return errorToast(`Error fetching data: ${error}`);
    }
  };
  return (
    <div className="bg-slate-200 w-100 flex flex-col items-center ">
      <div className="w-full p-2 bg-white">
        <div className="bg-transparent py-5">
          <div className="link">
            <ul className="flex items-center">
              <li className="">
                <a className="text-[#212F3F] inline-block font-normal cursor-pointer">
                  Danh sách Công ty <span>{''}</span>
                </a>
              </li>
              <li className="">
                <span className="text-[#b3b8bd] ml-2">{'>'}</span>{' '}
                {companyInfo?.name ? companyInfo?.name : ' '}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="gap-2 py-8 w-[90%]">
        <div className="relative min-h-[360px] bg-gradient-to-r from-[#212f3f] to-[#00b14f] rounded-[10px] mb-6">
          <div className="h-[224px] overflow-hidden">
            <img
              src={companyInfo?.image ?? ' '}
              alt="company-banner"
              className="h-full object-cover w-full object-center rounded-t-[10px]"
            />
          </div>
          <div className="">
            <div className="absolute items-center bg-white border-4 rounded-full flex h-[180px] justify-center left-[40px] overflow-hidden top-[136px] w-[180px]">
              <img
                src={companyInfo?.image ?? ' '}
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex items-center gap-x-8 my-[30px] pl-[252px] pr-[40px] relative">
            <div className="block basis-auto grow shrink max-w-full">
              <h1 className="line-clamp-2 text-white text-xl font-semibold mb-4 max-w-full">
                {companyInfo?.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-4 max-w-full">
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style={{
                      width: '16px',
                      height: '16px',
                      fill: '#FFF',
                    }}
                  >
                    <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
                  </svg>
                  <a
                    href="https://jtexpress.vn/"
                    className="text-white font-normal overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    https://jtexpress.vn/
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    style={{
                      width: '16px',
                      height: '16px',
                      fill: '#FFF',
                    }}
                  >
                    <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" />
                  </svg>
                  <span className="text-white font-normal overflow-hidden text-ellipsis whitespace-nowrap">
                    {companyInfo?.companySize ?? '0'}+ nhân viên
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    style={{
                      width: '16px',
                      height: '16px',
                      fill: '#FFF',
                    }}
                  >
                    <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                  </svg>
                  <span className="text-white font-normal overflow-hidden text-ellipsis whitespace-nowrap">
                    {companyInfo?.field ?? '0'} người theo dõi
                  </span>
                </div>
              </div>
            </div>
            <div
              onClick={async () => {
                await updateCompanyStatus(
                  token,
                  companyInfo?.id as number,
                  !companyInfo?.status,
                );
                setRefresh(!refresh);
              }}
              className="cursor-pointer box-follow flex items-center bg-white rounded-[8px] text-[#00b14f] text-lg h-[48px] py-[6px] pl-[14px] pr-[18px]"
            >
              <Switch
                checked={companyInfo?.status ? companyInfo?.status : false}
              />
              <b>Trạng thái</b>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-[30px] mb-[32px]">
          <div className="w-2/3 ">
            {/* GIỚI THIỆU CÔNG TY */}
            <div className="bg-white rounded-[8px] overflow-hidden mb-5">
              <div className="w-full">
                <h2 className="p-5 bg-gradient-to-r from-[#212f3f] to-[#00b14f] text-white font-semibold text-lg">
                  Giới thiệu công ty
                </h2>
                <p className="px-5 pt-5 max-w-[650px]">
                  {companyInfo?.description
                    ? companyInfo?.description
                    : 'Không có mô tả'}
                </p>
                <p className="px-5 pt-5 pb-7 max-w-[650px]">
                  Lĩnh vực:{' '}
                  {companyInfo?.fieldName
                    ? companyInfo?.fieldName
                    : 'Không có mô tả'}
                </p>
              </div>
            </div>
            {/* THÔNG TIN CHI TIẾT */}
            <div className=" bg-white rounded-[8px] overflow-hidden ">
              <div className="w-full">
                <h2 className="p-5 bg-gradient-to-r from-[#212f3f] to-[#00b14f] text-white font-semibold text-lg">
                  Thông tin chi tiết
                </h2>
                <p className="px-5 pt-5 max-w-[650px]">
                  Số điện thoại:
                  {companyInfo?.phone ? companyInfo?.phone : 'Không có mô tả'}
                </p>
                <p className="px-5 pt-5 pb-7 max-w-[650px]">
                  Mã số thuế:
                  {companyInfo?.taxCode
                    ? companyInfo?.taxCode
                    : 'Không có mô tả'}
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="rounded-[8px] overflow-hidden">
              <div className="intro mb-[32px] bg-white">
                <h2 className="p-5 bg-gradient-to-r from-[#212f3f] to-[#00b14f] text-white font-semibold text-lg">
                  Thông tin liên hệ
                </h2>
                <div className="px-6 pb-7 ">
                  <div className="py-5 border-b-[1px]  border-[#dee0e2]">
                    <div className="mb-2 flex gap-3 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        style={{
                          width: '15px',
                          height: '20px',
                          fill: '#00b14f',
                        }}
                      >
                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                      </svg>
                      <span>Địa chỉ công ty</span>
                    </div>
                    <div className="text-[#4d5965] font-normal">
                      {companyInfo?.address
                        ? companyInfo?.address
                        : 'Không được cung cấp địa chỉ'}
                    </div>
                  </div>
                  <div className="py-5 ">
                    <div className="mb-2 flex gap-3 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        style={{
                          width: '15px',
                          height: '20px',
                          fill: '#00b14f',
                        }}
                      >
                        <path d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z" />
                      </svg>
                      <span>Xem bản đồ</span>
                    </div>
                    <div className="text-[#4d5965] font-normal"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full rounded-[8px] overflow-hidden">
              <div className="intro mb-[32px] bg-white">
                <h2 className="p-5 bg-gradient-to-r from-[#212f3f] to-[#00b14f] text-white font-semibold text-lg">
                  Nhà tuyển dụng
                </h2>
                <div className="px-6 pb-7 ">
                  <div className="py-5 border-b-[1px]  border-[#dee0e2]">
                    {companyInfo?.employers?.map((employer) => (
                      <div className="flex items-center justify-between">
                        <p className="flex items-center">
                          {employer.fullname}
                          {employer?.licenseStatus ? (
                            <CheckCheck
                              size={15}
                              color="#02A84E"
                              className="ml-2"
                            />
                          ) : (
                            ''
                          )}
                        </p>
                        <button
                          className="btn hover:underline hover:text-[#02A84E]"
                          onClick={() => {
                            navigation('/admin/employer/' + employer.id);
                          }}
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
