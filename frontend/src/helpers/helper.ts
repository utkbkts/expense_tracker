export const nameCharAt = (title: unknown): string => {
  if (typeof title !== "string") return "";

  return title
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
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
  
      const sortedCountries = countries.sort((a:any, b:any) =>
        a.country.localeCompare(b.country)
      );
  
      return sortedCountries;
    } catch (error) {
      console.error("Error fetching countries:", error);
      return []; 
    }
  };
  
