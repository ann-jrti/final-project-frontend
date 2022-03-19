function importAll(r) {
    let clothes = {};
    r.keys().map((item, index) => {
        clothes[item.replace("./", "")] = r(item);
    });
    return champs;
}

export const champs = importAll(
    require.context("./", false, /\.(png|jpe?g|svg)$/)
);
