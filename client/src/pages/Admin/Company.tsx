import {
  Check,
  ChevronDown,
  ChevronLeftCircle,
  ChevronRightCircle,
  Search,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  getAllCompanies,
  getAllFields,
} from "../../shared/utils/helper";
import { CompanyFromServer } from "../../shared/types/Company.type";
import BasicTable, {
  BasicColumnProps,
  ObjectFromServer,
} from "../../shared/components/basic-table";
import { Field } from "../../shared/types/Recruitment.type";

function Company() {
  const [companies, setCompanies] = useState<CompanyFromServer[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [fields, setField] = useState<Field[]>([]);

  useEffect(() => {
    async function getData() {
      const {
        allCompanies,
        // total,
        totalPages,
      }: {
        allCompanies: CompanyFromServer[];
        total: number;
        totalPages: number;
      } = await getAllCompanies(page);
      const fields = await getAllFields();
      setCompanies(allCompanies);
      setTotalPages(totalPages);
      setField(fields);
    }
    getData();
  }, [page]);

  const columns: BasicColumnProps[] = useMemo(
    () => [
      {
        name: "ID",
        field: "id",
        tableCellClassname: "w-24",
        cell: (data: ObjectFromServer) => {
          const company = data as CompanyFromServer;
          return <div>{company.id}</div>;
        },
      },
      {
        name: "Thông tin công ty",
        field: "name",
        tableCellClassname: "w-[480px]",
        cell: (data: ObjectFromServer) => {
          const company = data as CompanyFromServer;
          return (
            <div className="flex items-center gap-4">
              <img
                src={company.image}
                className="object-cover w-24 h-24 rounded-full"
              ></img>
              <div>
                <div className="font-bold">{company.name}</div>
                <div>{company.address}</div>
                <div>{company.phone}</div>
                <a
                  className="font-bold text-blue-400"
                  href={company.website}
                >
                  Link
                </a>
              </div>
            </div>
          );
        },
      },
      {
        name: "Mô tả",
        field: "description",
        tableCellClassname: "w-[560px]",
        cell: (data: ObjectFromServer) => {
          const company = data as CompanyFromServer;
          return (
            <div className="w-full px-2">{company.description}</div>
          );
        },
      },
      {
        name: "Số lượng nhân viên",
        field: "description",
        tableCellClassname: "w-[160px]",
        cell: (data: ObjectFromServer) => {
          const company = data as CompanyFromServer;
          return <div>{company.companySize}</div>;
        },
      },
      {
        name: "Mã số thuế",
        field: "taxCode",
        tableCellClassname: "w-[160px]",
        cell: (data: ObjectFromServer) => {
          const company = data as CompanyFromServer;
          return <div>{company.taxCode}</div>;
        },
      },
      {
        name: "Lĩnh vực",
        field: "field",
        tableCellClassname: "w-[160px]",
        cell: (data: ObjectFromServer) => {
          const company = data as CompanyFromServer;
          const field = fields.find(
            (item) => item.id === company.field
          );
          return <div>{field?.name}</div>;
        },
      },
      {
        name: "Trạng thái",
        field: "status",
        tableCellClassname: "w-[160px]",
        cell: (data: ObjectFromServer) => {
          const company = data as CompanyFromServer;
          return company.status ? (
            <Check className="text-green-500" />
          ) : (
            <X className="text-red-500" />
          );
        },
      },
    ],
    [fields]
  );

  return (
    <div className="flex flex-col items-center flex-grow bg-slate-200">
      <div className="w-full p-2 bg-white">
        <h2 className="font-bold">Quản lý công ty tuyển dụng</h2>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 py-8 w-[90%]">
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex items-center flex-grow divide-x-2">
            <div className="flex items-center justify-between h-full p-2 text-sm bg-white">
              <span className="text-gray-400">Tất cả công ty</span>
              <ChevronDown stroke="#9ca3af" size={16} />
            </div>
            <div className="flex items-center justify-between flex-grow p-2 text-sm bg-white ">
              <input
                className="w-full text-gray-400"
                placeholder="Tìm công ty (nhấn Enter để tìm kiếm)"
              ></input>
              <Search stroke="#9ca3af" size={16} />
            </div>
          </div>
        </div>
        <BasicTable data={companies} columns={columns} />
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

export default Company;
