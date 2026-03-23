import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/home-page.jsx';
import { TournamentsPage } from './pages/tournaments-page.jsx';
import { MyTournamentsPage } from './pages/my-tournaments-page.jsx';
import { BootcampPage } from './pages/bootcamp-page.jsx';
import { BirthdayPage } from './pages/birthday-page.jsx';
import { SchoolsPage } from './pages/schools-page.jsx';
import { SpaceRentalPage } from './pages/space-rental-page.jsx';
import { StreamingPage } from './pages/streaming-page.jsx';
import { SnookerPage } from './pages/snooker-page.jsx';
import { NotFoundPage } from './pages/not-found.jsx';
import { UnderConstructionPage } from './pages/under-construction.jsx';
import { TournamentLoginPage } from './pages/tournament-login.jsx';
import { ProfilePage } from './pages/profile-page.jsx';
import { ChangePasswordPage } from './pages/change-password-page.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/tournaments",
    element: <TournamentsPage />,
  },
  {
    path: "/tournament/login",
    element: <TournamentLoginPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/profile/change-password",
    element: <ChangePasswordPage />,
  },
  {
    path: "/my-tournaments",
    element: <MyTournamentsPage />,
  },
  {
    path: "/bootcamp",
    element: <BootcampPage />,
  },
  {
    path: "/birthday",
    element: <BirthdayPage />,
  },
  {
    path: "/schools",
    element: <SchoolsPage />,
  },
  {
    path: "/space-rental",
    element: <SpaceRentalPage />,
  },
  {
    path: "/streaming",
    element: <StreamingPage />,
  },
  {
    path: "/snooker",
    element: <SnookerPage />,
  },
  {
    path: "/under-construction",
    element: <UnderConstructionPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
