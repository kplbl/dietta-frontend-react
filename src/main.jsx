import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './context/user/UserContext';
import { FoodProvider } from './context/food/FoodContext';
import { DiaryProvider } from './context/diary/DiaryContext';

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <FoodProvider>
                <DiaryProvider>
                    <App />
                </DiaryProvider>
            </FoodProvider>
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
