import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../hooks/hook";

const { getAll, create, change, deleteData } = http();

const initialState = {
  client: [],
  searchClient: "",
  surnameSort: false,
};
//  Получаю всех клиентов
export const clientAllGet = createAsyncThunk("/api/getAll", async () => {
  const res = await getAll();
  return res.data;
});
// Добавить одного клиента
export const clientCreate = createAsyncThunk(
  "/api/create",
  async ({ data }) => {
    const res = await create(data);
    return res.data;
  }
);
// Изменить данные клиента
export const clientChange = createAsyncThunk(
  "/api/change",
  async ({ id, data }) => {
    const res = await change(id, data);
    return res.data;
  }
);
// Удалить клиента
export const clientDelete = createAsyncThunk("/api/delete", async ({ id }) => {
  const res = await deleteData(id);
  return res.data;
});
// Создаю срез
const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setSearchClient: (state, action) => {
      state.searchClient = action.payload;
    },
    setSurnameSort: (state) => {
      state.surnameSort = !state.surnameSort;
    },
  },
  // обрабатываем асинхронные операции
  extraReducers: (builder) => {
    builder
      .addCase(clientAllGet.fulfilled, (state, action) => {
        state.client = [...action.payload];
      })
      .addCase(clientCreate.fulfilled, (state, action) => {
        state.client.push(action.payload);
      })
      .addCase(clientChange.fulfilled, (state, action) => {
        const index = state.client.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.client[index] = {
            ...state.client[index],
            ...action.payload,
          };
        }
      })
      .addCase(clientDelete.fulfilled, (state, action) => {
        state.client = state.client.filter(
          (item) => item.id !== action.payload
        );
      })
      .addDefaultCase(() => {});
  },
});
const { actions, reducer } = clientSlice;
export const { setSearchClient, setSurnameSort } = actions;
export default reducer;
