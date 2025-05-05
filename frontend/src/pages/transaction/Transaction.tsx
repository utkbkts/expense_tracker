import Loading from "@/components/Loadind";
import useTransactionStore from "@/store/transaction.route";
import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Transaction = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, getTransaction } = useTransactionStore();

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

  if(loading){
    return <Loading fullScreen/>
  }

  return <div>Transaction</div>;
};

export default Transaction;
