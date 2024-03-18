import DetailsHeader from "../../components/DetailsHeader";
import EditAvatar from "./EditAvatar";
import EditEducationInfo from "./EditEducationInfo";
import EditPersonalInfo from "./EditPersonalInfo";
import EditSkills from "./EditSkills";
import EditSocialLinks from "./EditSocialLinks";

export default function EditProfile() {
  return (
    <div>
      <DetailsHeader href="/v/me" text="Edit Profile" />

      <div className="space-y-3">
        <EditAvatar />

        <EditPersonalInfo />

        <EditSocialLinks />

        <EditSkills />

        <EditEducationInfo />
      </div>
    </div>
  );
}
