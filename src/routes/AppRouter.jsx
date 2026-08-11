import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "../components/layout/Layout";


import Listings from "../pages/ListProperty/ListPropertyLayout";
import CreateListing from "../pages/CreateListing/CreateListing";

import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home";
import SearchResults from "../pages/SearchResults";
import PropertyDetails from "../pages/PropertyDetails";
import ListPropertyLayout from "../pages/ListProperty/ListPropertyLayout";
import Step1Basics from "../pages/ListProperty/Step1Basics";
import Step2Location from "../pages/ListProperty/Step2Location";
import Step3Details from "../pages/ListProperty/Step3Details";
import Step4Photos from "../pages/ListProperty/Step4Photos";
import ReviewSubmit from "../pages/ListProperty/ReviewSubmit";
import SubmissionSuccess from "../pages/ListProperty/SubmissionSuccess";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "listings",
        element: <Listings />,
      },
      {
        path: "create-listing",
        element: <CreateListing />,
      },
      {
        path: "property/:id",
        element: <PropertyDetails />,
      },
      {
         path: "search",
         element: <SearchResults />
      },
      {
        path: "listing/:id", 
        element: <PropertyDetails />
      },
      {
        path: "list-property",
        element: <ListPropertyLayout />,
        children: [
          {
            index: true,
            element: <Step1Basics />,
          },
          {
            path: "location",
            element: <Step2Location />,
          },
          {
            path: "details",
            element: <Step3Details />,
          },
          {
            path: "photos",
            element: <Step4Photos />,
          },
          {
            path: "review",
            element: <ReviewSubmit />,
          },
          {
            path: "success",
            element: <SubmissionSuccess />,
          },
        ],
      },
    ],
  }, 
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;