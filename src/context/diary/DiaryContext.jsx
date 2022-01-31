import { createContext, useReducer } from 'react';
import axios from 'axios';
import diaryReducer from './DiaryReducer';
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';
import formatISO from 'date-fns/formatISO';

const BACKEND_URL = import.meta.env.VITE_API_URL;

const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
    const initialState = {
        entries: [],
        date: new Date(),
        loading: false,
        error: null,
    };

    const [state, dispatch] = useReducer(diaryReducer, initialState);

    const prevDay = () => {
        dispatch({ type: 'SET_DATE', payload: subDays(state.date, 1) });
    };

    const nextDay = () => {
        if (!isToday(state.date)) {
            dispatch({ type: 'SET_DATE', payload: addDays(state.date, 1) });
        }
    };

    const getEntries = async () => {
        try {
            dispatch({ type: 'SET_LOADING' });
            const res = await axios.get(`${BACKEND_URL}/diary/day/${formatISO(state.date)}`);
            const parsed = res.data.map((entry) => {
                return {
                    ...entry,
                    food: JSON.parse(entry.food),
                };
            });
            dispatch({ type: 'SET_DIARY', payload: parsed });
        } catch (err) {
            dispatch({ type: 'DIARY_ERROR', payload: err });
        } finally {
            dispatch({ type: 'CLEAR_LOADING' });
        }
    };

    const deleteEntry = async (id) => {
        try {
            dispatch({ type: 'SET_LOADING' });
            await axios.delete(`${BACKEND_URL}/diary/${id}`);
            getEntries();
        } catch (err) {
            dispatch({ type: 'DIARY_ERROR', payload: err });
        } finally {
            dispatch({ type: 'CLEAR_LOADING' });
        }
    };

    const addEntry = async (form) => {
        const config = {
            headers: {
                'Content-Type': 'Application/json',
            },
        };

        try {
            dispatch({ type: 'SET_LOADING' });
            await axios.post(`${BACKEND_URL}/diary`, form, config);
            getEntries();
        } catch (err) {
            dispatch({ type: 'DIARY_ERROR', payload: err });
        } finally {
            dispatch({ type: 'CLEAR_LOADING' });
        }
    };

    return (
        <DiaryContext.Provider
            value={{
                ...state,
                prevDay,
                nextDay,
                getEntries,
                deleteEntry,
                addEntry,
            }}
        >
            {children}
        </DiaryContext.Provider>
    );
};

export default DiaryContext;
