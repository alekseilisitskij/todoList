import { createSelector } from "@reduxjs/toolkit";

const selectUsers = (state) => state.client.client; //извлекает список пользователей из состояния. state.client.client представляет собой массив пользователей.
const selectSearchClient = (state) => state.client.searchClient; //извлекает строку фильтрации (searchClient) из состояния. Это строка, которая будет использоваться для фильтрации пользователей по фамилии.
const selectSurnameClient = (state) => state.client.surnameSort; // Извлекает параметр сортировки

export const selectFilterClients = createSelector(
  [selectUsers, selectSearchClient, selectSurnameClient],
  (users, filter, surnameSort) => {
    // Фильтрация пользователей
    const filterClients = users.filter((user) =>
      user.surname.toLowerCase().includes(filter.toLowerCase())
    );
    // Сортировка пользователей
    if (surnameSort === false) {
      return filterClients.sort((a, b) => a.surname.localeCompare(b.surname));
    } else {
      return filterClients.sort((a, b) => b.surname.localeCompare(a.surname));
    }
  }
);

// Функция фильтрации: Функция (users, filter) выполняет следующее:

// Она берет массив users, полученный из состояния, и фильтрует его с использованием метода filter.
// Для каждого пользователя (user) проверяется, содержится ли подстрока filter в фамилии пользователя (user.surname), при этом обе строки (фамилия пользователя и строка фильтра) приводятся к нижнему регистру с помощью .toLowerCase() для выполнения нечувствительного к регистру поиска.
