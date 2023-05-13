import DataURIParser from "datauri/parser.js";
import path from 'path';

const getDataUri = (file) => {
    const parse = new DataURIParser();
    const extName = path.extname(file.originalname).toString();

    console.log(extName);
    const baseFile = parse.format(extName, file.buffer);

    return baseFile;
}

export default getDataUri;