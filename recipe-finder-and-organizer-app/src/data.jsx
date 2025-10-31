import { Home, Heart, Layers, UserPlus, LogIn, UserPen } from "lucide-react";

export const navbarLinks = [
  {
    id: 1,
    title: "Home",
    link: "/",
    icon: <Home size={16} />,
  },
  {
    id: 2,
    title: "Favorites",
    link: "/favorites",
    icon: <Heart size={16} />,
  },
  {
    id: 3,
    title: "Collections",
    link: "/collections",
    icon: <Layers size={16} />,
  },
  {
    id: 4,
    title: "SignUp",
    link: "/Signup",
     icon: <UserPlus size={16} />,
  },
  {
    id: 5,
    title: "Login",
    link: "/login",
     icon: <LogIn size={16} />,
  }
 
];
