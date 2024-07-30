import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";


const filtersAdapter = createEntityAdapter({
    selectId: (filter) => filter.name,
})

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    currentFilter: 'all',
})


export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const { request } = useHttp()
        return request('http://localhost:3001/filters')
    }
)

const heroesFiltersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterChanged: (state, action) => { state.currentFilter = action.payload },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => { state.filtersLoadingStatus = 'loading' })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload)
            })
            .addCase(fetchFilters.rejected, state => { state.filtersLoadingStatus = 'error' })
    }
})

const { reducer, actions } = heroesFiltersSlice;


export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filterChanged,
    filtersFetchingError,
} = actions;

export const { selectAll } = filtersAdapter.getSelectors(state => state.filters)