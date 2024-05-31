import clsx from "clsx";
import {
  ArrowUp,
  ChevronLeftCircle,
  ChevronRightCircle,
  Pause,
  Pencil,
  Search,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { statusColor } from "../../shared/types/RecruitmentStatus.type";
import { RecruitmentJobPost } from "../../shared/types/Recruitment.type";
import {
  getAllJobs,
  getCampaignById,
  getJobsStat,
} from "../../shared/utils/helper";

interface RecruitmentTableProps {
  data: RecruitmentJobPost[];
}

function RecruitmentTable({ data }: RecruitmentTableProps) {
  return (
    <table className="w-full bg-white">
      <thead>
        <tr>
          <td className="font-bold border">Tin tuyển dụng</td>
          <td className="p-2 font-bold text-center align-middle border ">
            <div className="flex items-center justify-center w-full h-full">
              <Settings size={16} />
            </div>
          </td>
          <td className="font-bold border">Công ty</td>
          <td className="font-bold border">Ngày tạo</td>
        </tr>
      </thead>
      <tbody>
        {data.map((jobPost, key) => {
          return (
            <tr key={key}>
              <td className="border max-w-[240px] ">
                <div className="flex flex-col items-start gap-1">
                  <div>
                    {" "}
                    <span
                      className={clsx(
                        "p-1 font-semibold",
                        statusColor[
                          jobPost.status
                            ? "Đang hiển thị"
                            : "Dừng hiển thị"
                        ].bg,
                        statusColor[
                          jobPost.status
                            ? "Đang hiển thị"
                            : "Dừng hiển thị"
                        ].text
                      )}
                    >
                      {jobPost.status
                        ? "Đang hiển thị"
                        : "Dừng hiển thị"}
                    </span>{" "}
                    <span className="font-bold capitalize">
                      {jobPost.titleRecruitment}
                    </span>{" "}
                    <span className="text-slate-500">{`#${jobPost.id}`}</span>
                  </div>
                  <span>
                    Chiến dịch tuyển dụng: {jobPost.campaign.name}
                  </span>
                  <button className="p-2 font-bold text-green-500 bg-green-50">
                    Xem CV ứng tuyển
                  </button>
                </div>
              </td>
              <td className="p-2 border">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Link
                    className="p-2 rounded-full"
                    to={`/hr/compaign-edit/${jobPost.id}`}
                    state={jobPost}
                  >
                    <Pencil
                      fill="black"
                      stroke="white"
                      strokeWidth={1}
                    />
                  </Link>
                  <button className="p-2 rounded-full">
                    <Pause fill="gray" stroke="transparent" />
                  </button>
                  <button className="p-2 rounded-full">
                    <ArrowUp stroke="gray" />
                  </button>
                </div>
              </td>
              <td className="border w-[360px]">
                {jobPost.company?.name}
              </td>
              <td className="border">
                {jobPost.createdAt.toLocaleDateString("vi-VN")}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const filteredStatuses = ["Tất cả", "Đang hiển thị", "Dừng hiển thị"];

function Recruitment() {
  const [data, setData] = useState<RecruitmentJobPost[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [jobStats, setJobStats] = useState({
    isActive: 0,
    total: 0,
    isNotActive: 0,
  });

  useEffect(() => {
    const getAllRecruitments = async () => {
      const { allJobs, totalPages } = await getAllJobs(page);
      const stats = await getJobsStat();
      setJobStats(stats);
      const rawRecruitments = allJobs.map(async (item) => {
        const campaign = await getCampaignById(item.campaignId);
        const rawRecruitment = {
          ...item,
          createdAt: new Date(item.createAt),
          updatedAt: new Date(item.updateAt),
          expiredDate: new Date(item.expiredDate),
          campaign: campaign,
        };
        return rawRecruitment;
      });
      setData(await Promise.all(rawRecruitments));
      setTotalPages(totalPages);
    };
    getAllRecruitments();
  }, [page]);

  return (
    <div className="flex-grow">
      <h1 className="p-4 text-xl font-bold text-black bg-white">
        Quản lý Tin tuyển dụng
      </h1>
      <div className="flex flex-col items-start justify-center gap-8 p-4">
        <div className="flex items-start w-full gap-4">
          {filteredStatuses.map((status, key) => {
            return (
              <div
                className={clsx(
                  "px-2 py-1 rounded-full items-center text-[12px] cursor-pointer flex gap-[4px]",
                  selectedStatus === key
                    ? "bg-green-500 text-white"
                    : "bg-slate-300"
                )}
                key={key}
                onClick={() => setSelectedStatus(key)}
              >
                {status}
                <span className="flex items-center justify-center w-5 h-5 text-white bg-red-500 rounded-full">
                  {status === "Tất cả"
                    ? jobStats.total
                    : status === "Đang hiển thị"
                    ? jobStats.isActive
                    : jobStats.isNotActive}
                </span>
              </div>
            );
          })}
        </div>

        <div className="relative flex items-center w-2/5 bg-white">
          <input
            className="flex-grow p-4"
            placeholder="Tìm kiếm tin tuyển dụng theo tiêu đề hoặc mã tin"
            onChange={(e) => {
              setFilterKeyword(e.currentTarget.value);
            }}
          ></input>
          <Search className="px-2" size={32} />
        </div>
        <RecruitmentTable
          data={data
            .filter(
              (jobPost) =>
                (jobPost.status
                  ? "Đang hiển thị"
                  : "Dừng hiển thị") ===
                  filteredStatuses[selectedStatus] ||
                (filteredStatuses[selectedStatus] === "Tất cả" &&
                  jobPost)
            )
            .filter(
              (jobPost) =>
                jobPost.titleRecruitment.includes(filterKeyword) ||
                jobPost.campaign.name.includes(filterKeyword)
            )}
        />
        <div className="flex items-center self-center justify-center gap-2">
          <ChevronLeftCircle
            className="cursor-pointer"
            stroke="green"
            strokeWidth={1}
            onClick={() => {
              setPage(page - 1 > 0 ? page - 1 : page);
            }}
          />
          <span className="font-bold text-green-600">{page}</span>/
          <span>{totalPages}</span>
          <ChevronRightCircle
            stroke="green"
            className="cursor-pointer"
            strokeWidth={1}
            onClick={() =>
              setPage(page + 1 <= totalPages ? page + 1 : page)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Recruitment;
