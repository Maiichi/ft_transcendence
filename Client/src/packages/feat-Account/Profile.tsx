import OwnerProfile  from './components/OwnerProfile'
import GeustProfile from './components/GeustProfile'


let isOwner = false
/**
 *  Profile Component
 *  
 * The Profile component is responsible for rendering and displaying user profile information.
 * It typically receives user data as props and presents it in a structured format.
 * This component can be used to show details such as the user's name, profile picture, bio,
 * and other relevant information.
*
**/
export const Profile = isOwner? OwnerProfile: GeustProfile
