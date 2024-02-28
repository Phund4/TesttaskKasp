import { parse } from "papaparse";
import axios from "axios";

type dataType = { description: string }[];

export function getText(
    file: File,
    initState: dataType,
    setter: React.Dispatch<React.SetStateAction<dataType>>
) {
    parse(file, {
        complete: function (results) {
            let data = initState;
            let arr = results.data as string[];
            for (let i = 0; i < arr.length; i++) {
                data.push({
                    description: arr[i],
                });
            }

            setter(data);
        },
    });
}

export function selectTextHandler(e: React.MouseEvent<HTMLSpanElement>) {
    let span = e.target as HTMLSpanElement;
    if (span.style.background == "orange") {
        span.style.background = "white";
        span.classList.remove("span-to-file");
    } else {
        span.style.background = "orange";
        span.classList.add("span-to-file");
    }
}

export function writeToFile(e: React.MouseEvent<HTMLButtonElement>) {
    let words: HTMLCollectionOf<Element> =
        document.getElementsByClassName("span-to-file");
    let result: string = "";
    let arrindexes: number[] = [];

    for (let i = 0; i < words.length; i++) {
        let index = parseInt(words[i].id.split("-")[3]) - 1;
        if (arrindexes[arrindexes.length - 1] != index) {
            arrindexes.push(index);
            result = result.slice(0, -1);
            result += "\n";
        }
        result += words[i].textContent + "|";
    }
    result = result.slice(0, -1);

    const formData = new FormData();
    formData.append("file", result);
    axios
        .post("http://localhost:3000/write", formData, {
            headers: {
                "Content-Type": "text/plain",
            }
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
}
