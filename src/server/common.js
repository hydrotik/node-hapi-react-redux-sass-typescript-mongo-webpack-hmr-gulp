const get = (path, o, d) => {
    let parts = path.replace(/\[/g, '.').replace(/\]/g, '').split('.').filter((s) => { return s !== '' });

    let results = parts.reduce((acc, val) => {
        return (typeof(acc) === "undefined" || acc === null ? undefined : acc[val]);
    }, o);

    return typeof(results) === "undefined" ? d : results;
}

module.exports = {
    get
}

