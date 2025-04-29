import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
    https
        .get(process.env.API_URL, (res) => {
            if (res.statusCode === 200) {
                console.log("GET request sent successfully");
            } else {
                console.log("GET request failed", res.statusCode);
            }
        })
        .on("error", (e) => console.error("Error while sending request", e));
});

//MINUTE, HOUR, DAY OF THE MONTH, MONTH, DAY OF THE WEEK

export default job;

//cron jobs are scheduled jobs that run periodically at fixed intervals
