import { useContext, useEffect } from 'react';
import DiaryContext from '../../context/diary/DiaryContext';
import Loading from '../../layout/Loading';
import { useNavigate } from 'react-router-dom';
import Targets from './Targets';
import Entries from './Entries';
import NoEntries from './NoEntries';
import format from 'date-fns/format';

function Diary() {
    const diaryContext = useContext(DiaryContext);

    const { getEntries, deleteEntry, prevDay, nextDay, entries, loading, error, date } =
        diaryContext;

    const navigate = useNavigate();

    useEffect(() => {
        getEntries();
    }, [date]);

    if (loading && !entries) return <Loading />;

    if (error) return <h2>Error</h2>;

    return (
        <>
            <div className="flex justify-between md:w-4/5 mx-auto">
                <button
                    onClick={() => {
                        navigate('/diary/add');
                    }}
                    className="btn bg-gray-100 border-2 border-gray-300 hover:shadow"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
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
                <div className="flex gap-5">
                    <button className="btn bg-white" onClick={prevDay}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <span className="inline-block align-middle py-3">
                        {format(date, 'dd/MM/yyyy')}
                    </span>
                    <button className="btn bg-white" onClick={nextDay}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 5l7 7-7 7M5 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="my-5">
                {entries.length !== 0 ? (
                    <div className="flex flex-col gap-5 md:w-4/5 mx-auto">
                        <Targets entries={entries} />
                        <Entries entries={entries} deleteEntry={deleteEntry} />
                    </div>
                ) : (
                    <NoEntries />
                )}
            </div>
        </>
    );
}

export default Diary;
