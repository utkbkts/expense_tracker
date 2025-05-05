import { getDateSeventDaysAgo } from "@/helpers/helper";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DateRange = () => {
  const sevenDaysAgo = getDateSeventDaysAgo();

  const [searchParams, setSearchParams] = useSearchParams();

  const [dateFrom, setDateFrom] = useState(() => {
    const df = searchParams.get("df");

    return df && new Date(df).getTime() <= new Date().getTime()
      ? df
      : sevenDaysAgo || new Date().toISOString().split("T")[0];
  });

  const [dateTo, setDateTo] = useState(() => {
    const dt = searchParams.get("dt");

    return dt && new Date(dt).getTime() <= new Date().getTime()
      ? dt
      : new Date().toISOString().split("T")[0];
  });

  useEffect(() => {
    setSearchParams({ df: dateFrom, dt: dateTo });
  }, [dateFrom, dateTo]);

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const df = e.target.value;
    setDateFrom(df);

    if (new Date(df).getTime() > new Date(dateTo).getTime()) {
      setDateTo(df);
    }
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value;
    setDateTo(dt);

    if (new Date(dt).getTime() < new Date(dateFrom).getTime()) {
      setDateFrom(dt);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white rounded-xl shadow-md max-w-xl mx-auto mt-4 justify-center">
      <div className="flex flex-col">
        <label
          htmlFor="dateFrom"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Başlangıç Tarihi
        </label>
        <div className="relative">
          <input
            id="dateFrom"
            type="date"
            value={dateFrom}
            max={dateTo}
            onChange={handleDateFromChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 cursor-pointer"
          />
          <CalendarDays className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none cursor-pointer" />
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="dateTo"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Bitiş Tarihi
        </label>
        <div className="relative">
          <input
            id="dateTo"
            type="date"
            value={dateTo}
            min={dateFrom}
            max={new Date().toISOString().split("T")[0]}
            onChange={handleDateToChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 cursor-pointer"
          />
          <CalendarDays className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default DateRange;
