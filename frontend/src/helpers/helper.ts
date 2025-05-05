import { Icons } from "@/pages/accounts/partials/Icons";
import { v4 as uuidv4 } from "uuid";

export const nameCharAt = (title: unknown): string => {
  if (typeof title !== "string") return "";

  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");

    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    const data = await response.json();

    const countries = data.map((country: any) => {
      const currencies = country.currencies || {};
      const currencyCode = Object.keys(currencies)[0] || "";

      return {
        country: country?.name?.common || "",
        flag: country?.flags?.png || "",
        currency: currencyCode,
      };
    });

    const sortedCountries = countries.sort((a: any, b: any) =>
      a.country.localeCompare(b.country)
    );

    return sortedCountries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

export const getAccountIcon = (name?: string) => {
  if (!name) return null;

  const key = name.toLowerCase() as keyof typeof Icons;

  return Icons[key] || null;
};

export const generateAccountNumber = (accountNumber: string) => {
  while (accountNumber.length < 13) {
    const uuid = uuidv4().replace(/-/g, "");
    accountNumber = uuid.replace(/\D/g, "");
  }

  return accountNumber.substring(0.13);
};

export const getDateSeventDaysAgo = () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate());
  return sevenDaysAgo.toISOString().split("T")[0];
};
