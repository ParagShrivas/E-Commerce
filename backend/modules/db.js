require("dotenv").config();
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const query = new Pool({
     connectionString: isProduction
          : `postgresql://parag:f8d2Tp4RQNu6lHu2ylJKNpluJn40PabW@dpg-cvtq7495pdvs73dv1ao0-a.oregon-postgres.render.com:5432/ecommerce_zg51`,
     ssl: isProduction
          ? {
               rejectUnauthorized: false,
          }
          : false,
});

module.exports = query;
