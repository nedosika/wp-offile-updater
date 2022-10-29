import XMLParser from "react-xml-parser";

export default class URLsParser extends FileReader {
    file

    constructor(props) {
        super();
    }

    parse(file){
        this.file = file;
        return this;
    }

    onError(cb){
        super.onerror = cb;
        return this;
    }

    then(cb){
        super.onload = (e) => {
            cb(this._parser(e.target.result.toString()));
        }
        super.readAsText(this.file, 'UTF-8');
    }

    _parser(){}
}

export class JsonURLsParser extends URLsParser {
    constructor(props) {
        super();
    }

    _parser(result){
        const urls = JSON.parse(result);
        return urls.map(({urls}) =>
            Object.entries(urls).map(([, value]) => value)[0])
            .filter(({mimetype}) => mimetype === 'text/html')
            .map(({url}) => url)
    }
}

export class XmlURLsParser extends URLsParser {
    constructor(props) {
        super();
    }

    _parser(result){
        const xml = new XMLParser().parseFromString(result);
        return xml.getElementsByTagName('loc').map((loc) => loc.value);
    }
}
