import { AiOutlineHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { MdPlaylistPlay, MdOutlineExplore } from "react-icons/md";


const data = [
  {
    label: "Home",
    url: "/",
    icon: <AiOutlineHome />,
  },
  {
    label: "Search",
    url: "/search",
    icon: <BsSearch />,
  },
  {
    label: "Discover",
    url: "/discover",
    icon: <MdOutlineExplore />,
  },
  {
    label: "PlayList",
    url: "/watchlist",
    icon: <MdPlaylistPlay />,
  },
];
export default data;
