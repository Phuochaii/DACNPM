import { useAppDispatch, useAppSelector } from "../../../../utils/redux/hooks";
import {
  changeProfile,
  selectProfile,
} from "../../../../utils/redux/resumeSlice";
import { BaseForm } from "./Form";
import { Input } from "./Form/InputGroup";
import { ResumeProfile } from "../../../../utils/redux/types";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();

  const { name, email, phone, url, summary, location } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3 bg-white">
        <Input
          label="Name"
          labelClassName="col-span-full"
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={handleProfileChange}
        />
        <Input
          label="Objective"
          labelClassName="col-span-full"
          name="summary"
          placeholder="Entrepreneur and innovator obsessed with making exceptional products"
          value={summary}
          onChange={handleProfileChange}
        />
        <Input
          label="Email"
          labelClassName="col-span-4"
          name="email"
          placeholder="hello@world.com"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Phone"
          labelClassName="col-span-2"
          name="phone"
          placeholder="(123)456-7890"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="Website"
          labelClassName="col-span-4"
          name="url"
          placeholder="linkedin.com/in/yourname"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="Location"
          labelClassName="col-span-2"
          name="location"
          placeholder="CITY, STATE"
          value={location}
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  );
};
