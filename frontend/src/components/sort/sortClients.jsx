import { createEntityAdapter } from "@reduxjs/toolkit";

export const clientsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.surname.localeCompare(b.surname),
});
