import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Movie";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import type { Navigation, NavigationPageItem } from "@/toolpad/core";

export const NAV_DASHBOARD: NavigationPageItem = {
  segment: "",
  title: "Dashboard",
  icon: <DashboardIcon />,
};

export const NAV_GENRES: NavigationPageItem = {
  segment: "genres",
  title: "Genres",
  icon: <TheaterComedyIcon />,
};

export const NAV_MOVIES: NavigationPageItem = {
  segment: "movies",
  title: "Movies",
  icon: <MovieIcon />,
};

export function getNavMenu(): Navigation {
  return [NAV_DASHBOARD, NAV_GENRES, NAV_MOVIES];
}
