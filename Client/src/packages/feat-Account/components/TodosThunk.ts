// import { createAsyncThunk } from "@reduxjs/toolkit";
// export type Todo = {
//   userId: number;
//   id: number;
//   title: string;
//   completed: boolean;
// };
// type FetchTodosError = {
//   message: string;
// };
// export const fetchTodos = createAsyncThunk<
//   Todo[],
//   number,
//   { rejectValue: FetchTodosError }
// >("todos/fetch", async (nbr: number) => {
//   // console.log(nbr)
//   // Fetch the backend endpoint:
//   const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
//   //   if (response.status !== 200) {
//   //     // Return the error message:
//   //     return thunkApi.rejectWithValue({
//   //       message: "Failed to fetch todos.",
//   //     });
//   //   }
//   // Get the JSON from the response:
//   const data: Todo[] = await response.json();

//   // Return result:
//   return data;
// });

const fetchTodos = ''

export default fetchTodos