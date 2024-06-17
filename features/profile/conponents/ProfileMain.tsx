import { ProfileContents } from "@/types/cms/profile";

type ProfileMainProps = {
  contents: ProfileContents[];
};

const ProfileMain:React.FC<ProfileMainProps> = ({contents}) => {
  console.log(contents);

  return (
  <section>
    <div className="container">
      <div className="flex flex-col items-center w-auto">
        <h1 className="font-spartan h1Tit text-center">Profile</h1>
        
      </div>
    </div>
  </section>
  );
}

export default ProfileMain;