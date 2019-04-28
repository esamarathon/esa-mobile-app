let response = [];

export async function LoadHoraro() {
    try {
        const apiCall = await fetch('https://horaro.org/esa/2018-one.json?named=true');
        const schedule = await apiCall.json();

        let startObject = {};

        schedule.schedule.columns.map((item) => {
            const key = item;

            Object.assign(startObject, {
                [key]: key
            });
        });

        schedule.schedule.items.map((item) => {
            let myObj = {};
            item.data.map((d, idx) => {
                myObj[Object.keys(startObject)[[idx]]] = d;
            });
            response.push(myObj);
        });

        return response;
    } catch(err) {
        console.log(err);
    }
}
