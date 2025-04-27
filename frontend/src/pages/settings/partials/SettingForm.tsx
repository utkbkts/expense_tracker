import useUserStore from "@/store/user.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { fetchCountries } from "@/helpers/helper";
import Input from "@/components/input/Input";
import CountryCombobox from "@/components/input/CountryCombobox";
import { SettingsSchema, SettingsSchemaType } from "@/schema/settings.schema";
import Button from "@/components/button/Button";

type SelectedCountry = {
    country: string | undefined;
    currency: string | undefined;
  } | null;
  

const SettingForm = () => {
    const { user, updateUser, loading } = useUserStore();

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(SettingsSchema),
      defaultValues: {
        firstname: user?.user?.firstname || "",
        lastname: user?.user?.lastname || "",
        email: user?.user?.email || "",
        phonenumber: user?.user?.phonenumber || "",
        country: user?.user?.country || "",
        currency: user?.user?.currency || "",
      },
    });
  
    const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>({
      country: user?.user?.country,
      currency: user?.user?.currency,
    });
  
    useEffect(() => {
      setValue("country", selectedCountry?.country);
    }, [selectedCountry, setValue]);
  
    const [countriesData, setCountriesData] = useState([]);
  
    const getCountriesList = async () => {
      const data = await fetchCountries();
      setCountriesData(data);
    };
  
    useEffect(() => {
      getCountriesList();
    }, []);
  
  const onSubmit = async (data: SettingsSchemaType) => {
    const newData = {
      firstname: data.firstname,
      lastname: data.lastname,
      phonenumber: data.phonenumber,
      country: data.country,
      currency: data.currency,
    };
    await updateUser(newData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="flex items-center gap-4">
          <Input
            name="firstname"
            label="First Name"
            placeholder="John"
            register={register}
            errors={errors?.firstname}
            type="text"
          />
          <Input
            name="lastname"
            label="Last Name"
            placeholder="Doe"
            register={register}
            errors={errors?.lastname}
            type="text"
          />
        </div>
        <div className="flex items-center gap-4">
          <Input
            name="email"
            label="Email"
            placeholder="john@gmail.com"
            register={register}
            errors={errors?.email}
            type="email"
          />
          <Input
            name="phonenumber"
            label="Phone Number"
            placeholder="656566"
            register={register}
            errors={errors?.phonenumber}
            type="text"
          />
        </div>
        <CountryCombobox
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          countries={countriesData}
          register={register}
          name="country"
        />
        <div className="flex items-center gap-2 w-full">
          <Button text="Reset" type="button" className="hover:text-black" />
          <Button
            text="Save"
            type="submit"
            className="hover:text-black"
            loading={loading}
            disabled={loading}
          />
        </div>
      </div>
    </form>
  );
};

export default SettingForm;
