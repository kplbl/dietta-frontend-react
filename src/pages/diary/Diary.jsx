import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from '../../layout/Loading';
import { useNavigate } from 'react-router-dom';
import Targets from './Targets';
import Entries from './Entries';

function Diary() {
    const [entries, setEntries] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const BACKEND_URL = import.meta.env.VITE_API_URL;

    const getEntries = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/diary/today`);

            setEntries(res.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteEntry = async (id) => {
        try {
            setLoading(true);
            // eslint-disable-next-line no-unused-vars
            const res = await axios.delete(`${BACKEND_URL}/diary/${id}`);
            getEntries();
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEntries();
    }, []);

    if (loading) return <Loading />;

    if (error) return <h2>Error</h2>;

    return (
        <>
            {/* {foods && <AddEntry foods={foods} addEntry={addEntry} />} */}
            <button
                onClick={() => {
                    navigate('/diary/add');
                }}
                className="btn bg-blue-600"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                    />
                </svg>
            </button>
            <div className="my-5">{entries && <Targets entries={entries} />}</div>
            <div>{entries && <Entries entries={entries} deleteEntry={deleteEntry} />}</div>
        </>
    );
}

export default Diary;
