let response = [];

export async function LoadHoraro() {
    try {
        const apiCall = await fetch('https://horaro.org/-/api/v1/schedules/2211jgbb8x43m97a13');
        const schedule = await apiCall.json();

        let startObject = {};

        const data = schedule.data;

        data.columns.map((item) => {
            const key = item;

            Object.assign(startObject, {
                [key]: key
            });
        });

        data.items.map((item) => {
            let myObj = {};
            const regexx = /\[(.+)\]\((.+)\)/;
            item.data.map((d, idx) => {
                // console.log(d.match(regexx));
                // console.log(regexx.exec(d));
                myObj[Object.keys(startObject)[[idx]]] = d;
            });
            response.push(myObj);
        });

        return response;
    } catch(err) {
        console.log(err);
    }
}
