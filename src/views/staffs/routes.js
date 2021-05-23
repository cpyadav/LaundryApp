import React from "react";

const formsRoutes = [
  {
    path: "/staffs/manage",
    component: React.lazy(() => import("./Manage"))
  },

  {
    path: "/staffs/create",
    component: React.lazy(() => import("./CreateStaff"))
  },

  {
    path: "/staffs/update",
    component: React.lazy(() => import("./CreateStaff"))
  },

];

export default formsRoutes;
