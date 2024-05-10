import AgeAndGenderPieChart from "./AgeAndGenderPieChart";
import NewByDateChart from "./NewByDateChart";
import ProjectBarChart from "./ProjectBarChart";
import Summary from "./Summary";
import VerifiedAndUnverified from "./VerifiedAndUnverified";

export default function DashboardPage() {
  return (
    <div className="space-y-3">
      <Summary />

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        <NewByDateChart />

        <AgeAndGenderPieChart />

        <ProjectBarChart />

        <VerifiedAndUnverified />
      </div>
    </div>
  );
}
