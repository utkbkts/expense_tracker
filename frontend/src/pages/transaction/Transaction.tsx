import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "@/components/Loadind";
import { IoCheckmarkDoneCircle, IoSearchOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { CiExport } from "react-icons/ci";
import { RiProgress3Line, RiResetRightFill } from "react-icons/ri";
import { exportToExcel } from "@/libs/export.excel";
import DateRange from "@/components/DateRange";
import { TransactionType } from "@/types/type";
import useTransactionStore from "@/store/transaction.route";
import ViewTransaction from "../accounts/partials/ViewTransaction";

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
      s: search,
    });
    await getTransaction(startDate, endDate, search);
  };
  const handleReset = async (e: FormEvent) => {
    e.preventDefault();

    setSearch("");
    setSearchParams({
      df: startDate,
      dt: endDate,
    });
    await getTransaction(startDate, endDate, "");
  };

  useEffect(() => {
    if (transaction) {
      getTransaction(startDate, endDate, search);
    }
  }, [startDate, endDate, search]);

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <>
      {" "}
      <div className="bg-black-400 min-h-screen text-white">
        <div className="container mx-auto pt-32 px-4 ">
          <h1 className="text-4xl font-extrabold text-center text-white tracking-wide relative inline-block w-full">
            <span className="relative z-10">Transaction Activity</span>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-2 bg-pink-300 blur-sm rounded-full z-0"></span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between ">
            <div>
              <DateRange />
            </div>
            <div className="flex items-center gap-2">
              <form onSubmit={handleSearch}>
                <div className="w-full flex items-center gap-2 border border-gray-300 rounded-md px-2 py-2">
                  <IoSearchOutline />
                  <input
                    type={"text"}
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                    className="outline-none gropup bg-transparent text-gray-200 placeholder:text-gray-600"
                  />
                </div>
              </form>
              <button
                onClick={() => setIsOpen(true)}
                className="py-1.5 px-2 rounded text-white bg-black flex items-center justify-center gap-2 border cursor-pointer"
              >
                <MdAdd size={22} />
                <span>Pay</span>
              </button>
              <button
                onClick={handleReset}
                className="py-1.5 px-2 rounded text-red-400 flex items-center justify-center gap-2 border cursor-pointer"
              >
                <RiResetRightFill size={22} />
                <span>Reset</span>
              </button>
              <button
                onClick={() =>
                  exportToExcel(
                    transaction,
                    `Transaction ${startDate}-${endDate}`
                  )
                }
                className="py-1.5 px-2 rounded text-white bg-black flex items-center justify-center gap-2 border cursor-pointer"
              >
                <CiExport size={22} />
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto mt-5">
            {transaction?.length === 0 ? (
              <div className="w-full flex items-center justify-center py-10 text-gray-600 text-lg">
                <span>No Transaction History</span>
              </div>
            ) : (
              <>
                <table className="w-full">
                  <thead className="w-full border-b border-gray-300">
                    <tr className="w-full text-white text-left">
                      <th className="py-2">Date</th>
                      <th className="py-2 px-4">Description</th>
                      <th className="py-2 px-4">Status</th>
                      <th className="py-2 px-4">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction?.map((acc: TransactionType) => (
                      <tr
                        key={acc.id}
                        className="w-full border-b- border-gray-200 text-gray-200"
                      >
                        <td className="py-4">
                          <p className="w-24 md:w-auto">
                            {new Date(acc.createdat).toDateString()}
                          </p>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex flex-col w-56 md:w-auto">
                            <p className="text-base 2xl:text-lg text-white line-clamp-2">
                              {acc.description}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-2">
                            {acc.status === "Pending" && (
                              <RiProgress3Line
                                className="text-amber-600"
                                size={24}
                              />
                            )}
                            {acc.status === "Completed" && (
                              <IoCheckmarkDoneCircle
                                className="text-emerald-600"
                                size={24}
                              />
                            )}
                            {acc.status === "Rejected" && (
                              <>
                                {" "}
                                <IoCheckmarkDoneCircle
                                  className="text-red-600"
                                  size={24}
                                />
                                <span>{acc?.status}</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px">{acc?.source}</td>
                        <td className="py-4 text-white text-base font-medium">
                          <span
                            className={`${
                              acc?.type === "income"
                                ? "text-emerald-600"
                                : "text-red-600"
                            } text-lg font-bold ml-1`}
                          >
                            {acc?.type === "income" ? "+" : "-"}
                          </span>
                          {acc?.amount}
                        </td>
                        <td className="py-4 px-2">
                          <button
                            onClick={() => handleViewTransaction(acc)}
                            className="outline-none cursor-pointer text-violet-600 hover:underline"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
      <ViewTransaction isOpen={isOpenView} setIsOpen={setIsOpenView} data={selected} />
    </>
  );
};

export default Transaction;
