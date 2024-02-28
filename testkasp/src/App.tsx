import React, { ChangeEvent, useEffect, useState } from "react";
import "./style/app.sass";
import { getText, writeToFile } from "./helpers";
import { CustomList } from "./components/CustomList";

type dataType = { description: string }[];

const App: React.FC = () => {
    const initState = [{ description: "Text" }];
    const [file, setFile] = useState<File | null>();
    const [data, setData] = useState<dataType>(initState);

    useEffect(() => {
        if (file) {
            getText(file, initState, setData);
        }
    }, [file]);

    useEffect(() => {}, [data]);

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files) {
            setFile(files[0]);
        }
    };

    return (
        <div className="container">
            <div className="file-input-container">
                <label className="file-input-label" htmlFor="file-upload">
                    Load
                </label>
                <input
                    id="file-upload"
                    className="file-input"
                    type="file"
                    accept=".csv"
                    onChange={handleChangeFile}
                />
            </div>
            <CustomList data={data as dataType}/>
            <button className="button-save" onClick={writeToFile}>
                Save
            </button>
        </div>
    );
};

export default App;
