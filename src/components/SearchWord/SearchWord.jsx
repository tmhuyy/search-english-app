import { useState } from 'react';
import axios from 'axios';
const SearchWord = props => {
    const [word, setWord] = useState('');
    const [renderedData, setRenderedData] = useState();
    const [isError, setIsError] = useState(false);

    const submitHandler = e => {
        e.preventDefault();

        const searchWord = async function () {
            try {
                const res = await axios.get(
                    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
                );
                setRenderedData(res.data);
            } catch (err) {
                setIsError(true);
            }
        };

        searchWord();
        setWord('');
    };

    const backHandler = e => {
        setRenderedData();
        setIsError(false);
    };

    const errorStatus = function () {
        return (
            <>
                <section>Something is wrong. TRY IT AGAIN !!</section>
                <div className="flex justify-center">
                    <button
                        className="rounded-md bg-slate-200 py-2 px-2"
                        onClick={backHandler}
                    >
                        BACK
                    </button>
                </div>
            </>
        );
    };

    const successStatus = function () {
        return (
            <section>
                <ul>
                    {renderedData.map((data, index) => {
                        const { meanings } = data;
                        return (
                            <li key={index} className="mb-4 list-disc ml-2">
                                <p className="font-bold text-[20px]">
                                    {data?.word}
                                </p>
                                <p className="underline underline-offset-1">
                                    Definition
                                </p>
                                {meanings.map((meaning, index) => {
                                    const { definitions } = meaning;
                                    return (
                                        <div key={index}>
                                            {definitions.map((e, index) => {
                                                const { definition } = e;
                                                return (
                                                    <p
                                                        key={index}
                                                        className="mb-2"
                                                    >
                                                        {index + 1}-{definition}
                                                    </p>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </li>
                        );
                    })}
                </ul>

                <div className="flex justify-center">
                    <button
                        className="rounded-md bg-slate-200 py-2 px-2"
                        onClick={backHandler}
                    >
                        BACK
                    </button>
                </div>
            </section>
        );
    };

    return (
        <section className="mt-8 bg-gray-500 py-4 rounded-md px-4 border-2 border-black">
            {isError ? (
                <>{errorStatus()}</>
            ) : renderedData ? (
                <>{successStatus()}</>
            ) : (
                <form
                    className="flex flex-col text-center space-y-4"
                    onSubmit={submitHandler}
                >
                    <label htmlFor="word" className="cursor-pointer">
                        Enter a word
                    </label>
                    <div>
                        <input
                            name="word"
                            type="text"
                            className="rounded-md py-2 px-2"
                            value={word}
                            onChange={e => {
                                setWord(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button className="rounded-md bg-slate-200 py-2 px-2">
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </section>
    );
};

export default SearchWord;
