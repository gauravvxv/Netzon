import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchData = createAsyncThunk(
    'movies/fetchData',
    async (page = 1) => {
        const apiKey = "7287cb14b7e5985ef6fcf7ea0f296b8b";
        const limit = 4;
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}&api_key=${apiKey}`)

        if (!response.ok) {
            throw new Error("network response is not ok");
        }
        const data = await response.json();
        console.log(data.results.slice(0, limit));
        return { results: data.results.slice(0, limit), page }
    }
)

export const fetchData2 = createAsyncThunk('movies/fetchData2', async (page = 1) => {
    const apiKey = "7287cb14b7e5985ef6fcf7ea0f296b8b";
    const limit = 4;
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=${apiKey}`)

    if (!response.ok) {
        throw new Error("network response is not ok");
    }

    const data = await response.json();
    console.log(data.results.slice(0, limit));
    return { results: data.results.slice(0, limit), page }

})

export const fetchData3 = createAsyncThunk('movies/fetchData3', async (page = 1) => {
    const apiKey = "7287cb14b7e5985ef6fcf7ea0f296b8b";
    const limit = 4;
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}&api_key=${apiKey}`)

    if (!response.ok) {
        throw new Error("network response is not ok");
    }
    const data = await response.json();
    console.log(data.results.slice(0, limit));

    return { results: data.results.slice(0, limit), page }

})

export const fetchData4 = createAsyncThunk('movies/fetchData4',async () => {
    const apiKey = "7287cb14b7e5985ef6fcf7ea0f296b8b";
const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`)

if(!response.ok){
    throw new Error("network response is not ok")
}

const data = await response.json();
console.log(data.results);

return data.results


})

const initialState = {
    data: [],
    data2: [],
    data3: [],
    data4: [],
    loading1: false,
    loading2: false,
    loading3: false,
    loading4: false,
    error1: null,
    error2: null,
    error3: null,
    error4: null,
    currentPage: 1
}

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.loading1 = true;
            state.error1 = null
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading1 = false;
            state.data = action.payload.page === 1 ? action.payload.results : [...state.data, ...action.payload.results];
            state.currentPage = action.payload.page
        })
        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading1 = false;
            state.error1 = action.error.message
        });

        /* fetching data 2 */

        builder.addCase(fetchData2.pending, (state) => {
            state.loading2 = true;
            state.error2 = null;
        })

        builder.addCase(fetchData2.fulfilled, (state, action) => {
            state.loading2 = false;
            state.data2 = action.payload.page === 1 ? action.payload.results : [...state.data, ...action.payload.results];
            state.currentPage = action.payload.page
        })

        builder.addCase(fetchData2.rejected, (state, action) => {
            state.loading2 = false;
            state.error2 = action.error.message
        })

        // fetching data 3

        builder.addCase(fetchData3.pending, (state) => {
            state.loading3 = true;
            state.error3 = null
        })

        builder.addCase(fetchData3.fulfilled, (state, action) => {
            state.loading3 = false;
            state.data3 = action.payload.page === 1 ? action.payload.results : [...state.data, ...action.payload.results];

        })

        builder.addCase(fetchData3.rejected, (state, action) => {
            state.loading3 = false;
            state.error2 = action.error.message
        })

        builder.addCase(fetchData4.pending,(state)=>{
            state.loading4 = true;
            state.error4 = null;
        })

        builder.addCase(fetchData4.fulfilled,(state,action)=>{
            state.loading4 = false;
            state.data4 = action.payload;
        })

        builder.addCase(fetchData4.rejected,(state,action)=>{
            state.loading4  = false;
            state.error4 = action.error.message
        })
    }
})

export default moviesSlice.reducer