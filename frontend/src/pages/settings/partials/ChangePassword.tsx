import useUserStore from "@/store/user.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSchema, PasswordSchemaType } from "@/schema/password.schema";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";

const ChangePassword = () => {
  const { changePassword, loading } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(PasswordSchema),
  });

  const submitPasswordHandler = async (data: PasswordSchemaType) => {
    await changePassword(data);
  };

  const handleReset=()=>{
    setValue("currentPassword","")
    setValue("newPassword","")
    setValue("confirmPassword","")
  }

  return (
    <div className="py-10">
      <form onSubmit={handleSubmit(submitPasswordHandler)}>
        <div className="">
          <p className="text-xl font-bold mb-2">Change Password</p>
          <span className="mt-4">
            This will be used to log into your account and complete high
            severith actions.
          </span>
          <div className="mt-5">
            <Input
              disabled={loading}
              type="password"
              name="currentPassword"
              label="Current Password"
              register={register}
              placeholder="Current Password"
              errors={errors?.currentPassword}
            />
            <Input
              disabled={loading}
              type="password"
              name="newPassword"
              label="New Password"
              register={register}
              placeholder="New Password"
              errors={errors?.newPassword}
            />
            <Input
              disabled={loading}
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              register={register}
              placeholder="Confirm Password"
              errors={errors?.confirmPassword}
            />
            <div className="flex items-center gap-2 w-full mt-4">
              <Button onClick={handleReset} text="Reset" type="button" className="hover:text-black" />
              <Button
                text="Save"
                type="submit"
                className="hover:text-black"
                loading={loading}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
