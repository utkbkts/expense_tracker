import { Fragment, useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { BsChevronExpand } from "react-icons/bs";

type SelectedCountry = {
  country: string | undefined;
  currency: string | undefined;
} | null;

interface Props {
  selectedCountry: SelectedCountry;
  setSelectedCountry: React.Dispatch<
    React.SetStateAction<{
      country: string | undefined;
      currency: string | undefined;
    } | null>
  >;
  countries: {
    country: string;
    currency: string;
    flag: string;
  }[];
  register: any;
  name: string;
}

const CountryCombobox = ({
  selectedCountry,
  setSelectedCountry,
  countries,
}: Props) => {
  const [query, setQuery] = useState("");

  const filteredCountries =
    query === ""
      ? countries
      : countries.filter((country) =>
          country.country.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="w-full">
      <Combobox value={selectedCountry} onChange={setSelectedCountry}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
            <ComboboxInput
              className="w-full border-none py-2 px-2 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(country: { country: string }) =>
                country?.country || ""
              }
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Select a country..."
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
              <BsChevronExpand
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </ComboboxButton>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm cursor-pointer">
              {filteredCountries.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  No countries found.
                </div>
              ) : (
                filteredCountries.map((country) => (
                  <ComboboxOption
                    key={country.country}
                    value={country}
                    className={({ active }) =>
                      `relative select-none py-2 pl-10 pr-4 cursor-pointer ${
                        active ? "bg-indigo-600 text-white" : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {country?.country}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                            ✓
                          </span>
                        )}
                      </>
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default CountryCombobox;
