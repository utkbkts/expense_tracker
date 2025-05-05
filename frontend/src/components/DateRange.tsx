import { getDateSeventDaysAgo } from "@/helpers/helper";
import { FormEvent, useEffect, useState } from "react";
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

    return dt && new Date(dt).getTime() >= new Date().getTime()
      ? dt
      : sevenDaysAgo || new Date().toISOString().split("T")[0];
  });

  useEffect(() => {
    setSearchParams({ df: dateFrom, dt: dateTo });
  }, [dateFrom, dateTo]);

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value;
    setDateTo(dt);

    if (new Date(dt).getTime() < new Date(dateFrom).getTime()) {
      setDateFrom(dt);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <label className="block text-gray-700 text-sm mb-2">Filter</label>
        <input
          type="date"
          name="dateFrom"
          max={dateTo}
          value={dateFrom}
          onChange={handleDateFromChange}
        />
      </div>
      <div className="flex items-center gap-1">
        <label className="block text-gray-700 text-sm mb-2">To</label>
        <input
          type="date"
          name="dateFrom"
          max={dateTo}
          value={dateFrom}
          onChange={handleDateFromChange}
        />
      </div>
    </div>
  );
};

export default DateRange;
