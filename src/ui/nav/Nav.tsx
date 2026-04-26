import DashboardIcon from '@mui/icons-material/Dashboard';
import MovieIcon from "@mui/icons-material/Movie";
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import { NavigationPageItem, Navigation } from "@/toolpad/core/toolpad-core/AppProvider";

export class Nav {
  static DASHBOARD: NavigationPageItem = {
    segment: '',
    title: 'Dashboard',
    icon: <DashboardIcon/>
  }
  static GENRES: NavigationPageItem = {
    segment: 'genres',
    title: 'Genres',
    icon: <TheaterComedyIcon/>
  }
  static MOVIES: NavigationPageItem = {
    segment: 'movies',
    title: 'Movies',
    icon: <MovieIcon/>
  }

  static menu(): Navigation {
    return [this.DASHBOARD, this.GENRES, this.MOVIES]
  }
}