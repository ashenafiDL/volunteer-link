import Card from "@/components/global/Card";
import "./styles.css";

export default function PersonalInfoCard({
  firstName,
  lastName,
  gender,
  locationName,
  age,
  email,
}: {
  firstName: string;
  lastName: string;
  gender: string;
  locationName: string;
  age: number;
  email: string;
}) {
  return (
    <Card classes="card">
      <h5 className="card_title">Personal Information</h5>

      <div className="3xl:grid-cols-3 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <p className="personal_info_key">Name</p>
          <p className="personal_info_value capitalize">{`${firstName} ${lastName}`}</p>
        </div>

        <div>
          <p className="personal_info_key">Gender</p>
          <p className="personal_info_value capitalize">{`${gender || "N/A"}`}</p>
        </div>

        <div>
          <p className="personal_info_key">Location</p>
          <p className="personal_info_value">{`${locationName}`}</p>
        </div>

        <div>
          <p className="personal_info_key">Age</p>
          <p className="personal_info_value">{`${age || "N/A"}`}</p>
        </div>

        <div>
          <p className="personal_info_key">Email</p>
          <p className="personal_info_value">{`${email}`}</p>
        </div>
      </div>
    </Card>
  );
}
