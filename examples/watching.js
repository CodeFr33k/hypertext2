function(records) {
    const result = records.filter((record) => {
        const ok = record.lines.some((line) => {
            return line.toLowerCase().includes('watching');
        });
        return ok;
    });
    return result;
}
