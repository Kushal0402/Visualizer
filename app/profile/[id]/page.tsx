import ProfilePage from "@/app/components/ProfilePage";
import { UserProfile } from "@/common.types";
import { getUserProjects } from "@/lib/actions"

type props = {
    params: {
        id: string;
    }
}

const Profile = async ({params: { id }}: props) => {
  const result = await getUserProjects(id) as {
    user?: UserProfile;
  };  

  if(!result?.user) {
    return <p className="no-result-text">Failed to fetch user info</p>
  } 
    return (
    <ProfilePage user={result?.user}/>
  )
}

export default Profile