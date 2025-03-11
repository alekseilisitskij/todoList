import { createSelector } from "@reduxjs/toolkit";

// Селекторы для извлечения данных из состояния
const selectUsers = (state) => state.client.client; // Список пользователей
const selectSearchClient = (state) => state.client.searchClient; // Строка фильтрации
const selectSurnameClient = (state) => state.client.surnameSortFlag; // Флаг сортировки по фамилии

// Селектор для фильтрации и сортировки пользователей
export const selectFilterClients = createSelector(
  [selectUsers, selectSearchClient, selectSurnameClient],
  (users, filter, surnameSortFlag) => {
    // Фильтрация пользователей
    const filterClients = users.filter((user) =>
      user.surname.toLowerCase().includes(filter.toLowerCase())
    );
    const sortedClients = [...filterClients].sort((a, b) => {
      if (surnameSortFlag) {
        return a.surname.localeCompare(b.surname);
      }
    });

    return sortedClients;
  }
);
