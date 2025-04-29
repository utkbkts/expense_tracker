import { nameCharAt } from "@/helpers/helper";
import useUserStore from "@/store/user.store";
import SettingForm from "./partials/SettingForm";
import ChangePassword from "./partials/ChangePassword";

const Settings = () => {
  const { user } = useUserStore();
  return (
    <div className="bg-black-400 min-h-screen text-white">
      <div className="pt-32 container mx-auto">
        <div className="py-4 px-4 shadow-xl  rounded-md">
          <h1 className="pb-2 pt-2 text-2xl">General Settings</h1>
          <hr />
          <div className="py-10">
            <p className="text-lg font-bold">Profile Information</p>
            <div className="flex items-center gap-4 my-8">
              <div className="py-2 px-4 rounded-full bg-purple-600 uppercase text-2xl">
                <p>{user?.user?.firstname?.charAt(0) || ""}</p>
              </div>
              <div>
                <p>{nameCharAt(user?.user?.firstname) || ""}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col  justify-center">
            {/* SettingForm */}
            <SettingForm />
            <hr className="bg-white mt-10 mb-2 w-full h-[1px]"/>
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
