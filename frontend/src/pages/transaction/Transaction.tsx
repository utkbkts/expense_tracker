import Loading from "@/components/Loadind";
import useTransactionStore from "@/store/transaction.route";
import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { CiExport } from "react-icons/ci";
import { exportToExcel } from "@/libs/exportToExcel";


const Transaction = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, getTransaction, transaction } = useTransactionStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [selected, setSelected] = useState(null);

  const [search, setSearch] = useState("");
  const startDate = searchParams.get("df") || "";
  const endDate = searchParams.get("dt") || "";

  const handleViewTransaction = (el: any) => {
    setSelected(el);
    setIsOpenView(true);
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    setSearchParams({
      df: startDate,
      dt: endDate,
    });
    await getTransaction(startDate, endDate, search);
  };
  useEffect(() => {
    getTransaction(startDate, endDate, search);
  }, [startDate, endDate]);

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="bg-black-400 min-h-screen text-white">
      <div className="container mx-auto pt-32 px-4 ">
        <h1 className="text-4xl font-extrabold text-center text-white tracking-wide relative inline-block w-full">
          <span className="relative z-10">Transaction Activity</span>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-2 bg-pink-300 blur-sm rounded-full z-0"></span>
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* <DateRange /> */}
          <form onSubmit={handleSearch}>
            <div className="w-full flex items-center gap-2 border border-gray-300 rounded-md px-2 py-2">
              <IoSearchOutline />
              <input
                type={search}
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none gropup bg-transparent text-gray-200 placeholder:text-gray-600"
              />
            </div>
          </form>
          <button
            onClick={() => setIsOpen(true)}
            className="py-1.5 px-2 rounded text-white bg-black flex items-center justify-center gap-2 border"
          >
            <MdAdd size={22} />
            <span>Pay</span>
          </button>

          <button
            onClick={() =>
              exportToExcel(transaction, `Transaction ${startDate}-${endDate}`)
            }
            className="flex items-center gap-2 text-white"
          >
            Export <CiExport size={22} />
            <span>Pay</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
