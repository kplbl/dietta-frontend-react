import { createContext, useReducer } from 'react';
import axios from 'axios';
import foodReducer from './FoodReducer';

const BACKEND_URL = import.meta.env.VITE_API_URL;

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
    const initialState = {
        foods: [],
        loading: false,
        error: null,
    };

    const [state, dispatch] = useReducer(foodReducer, initialState);

    const getFoods = async () => {
        try {
            dispatch({ type: 'SET_LOADING' });
            const res = await axios.get(`${BACKEND_URL}/foods/public`);
            dispatch({ type: 'GET_FOODS', payload: res.data });
        } catch (err) {
            dispatch({ type: 'FOOD_ERROR', payload: err });
        } finally {
            dispatch({ type: 'CLEAR_LOADING' });
        }
    };

    const removeFood = async (id) => {
        try {
            dispatch({ type: 'SET_LOADING' });
            await axios.delete(`${BACKEND_URL}/foods/${id}`);
            getFoods();
        } catch (err) {
            dispatch({ type: 'FOOD_ERROR', payload: err });
        } finally {
            dispatch({ type: 'CLEAR_LOADING' });
        }
    };

    const addFood = async (newFood) => {
        const config = {
            headers: {
                'Content-Type': 'Application/json',
            },
        };
        try {
            dispatch({ type: 'SET_LOADING' });
            await axios.post(`${BACKEND_URL}/foods`, newFood, config);
            getFoods();
        } catch (err) {
            dispatch({ type: 'CLEAR_LOADING' });
        }
    };

    return (
        <FoodContext.Provider
            value={{
                ...state,
                getFoods,
                removeFood,
                addFood,
            }}
        >
            {children}
        </FoodContext.Provider>
    );
};

export default FoodContext;
