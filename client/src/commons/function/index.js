export const showDate = (date, value) => {
    date = date + 86400000 * value;
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return `${da}-${mo}-${ye}`;
}
export const  showTime=(date)=>{
    let ho = new Intl.DateTimeFormat('en', { hour: 'numeric' }).format(date);
    let mi = new Intl.DateTimeFormat('en', { minute: 'numeric' }).format(date);
    return `${ho.slice(0,1)}:${mi}`;
}
export function formatMoney(number, decPlaces, decSep, thouSep) {
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSep = typeof decSep === "undefined" ? "." : decSep;
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep);
        // +(decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}