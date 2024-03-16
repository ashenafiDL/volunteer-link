import "../../components/styles.css";
import AppearanceSetting from "./AppearanceSetting";
import DangerZone from "./DangerZone";
import NotificationSetting from "./NotificationSetting";
import ProjectSetting from "./ProjectSetting";

export default function Settings() {
  return (
    <div className="space-y-3">
      <AppearanceSetting />

      <ProjectSetting />

      <NotificationSetting />

      <DangerZone />
    </div>
  );
}
