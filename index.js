import axios from "axios"
import cheerio from "cheerio"
import express from "express"

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json());

const baseUrl = 'https://www.zip-codes.com/zip-code/'

// Welcome route
app.get('/', async (req, res) => {
    res.send('Welcome to Web Scraper API!');
});

// Get zip code details
app.get('/zip/:zipId', async (req, res, next) => {
    const { zipId } = req.params;
    let articles = [];
    let ZipCode  = [], City = [], State = [], Counties = [], CityAlias = [], AreaCode = [], TimeZone = [], Latitude = [], Longitude = [], Elevation = [], Region = [], Division = [],
                CurrentPopulation2020 = [], Population2010 = [], Households_per_ZIP_Code = [], Average_House_Value = [], Avg_Income_Per_Household = [], Persons_Per_Household = [], 
                White_Population = [], Black_Population = [], Hispanic_Population = [], Asian_Population = [], American_Indian_Population = [], Hawaiian_Population = [],
                Other_Population = [], Male_Population = [], Female_Population = [], Median_Age = [], Male_Median_Age = [], Female_Median_Age = [],
                Total_Residential_Mailboxes = [], Total_Business_Mailboxes = [], Total_Delivery_Receptacles = [], Number_of_Businesses = [], First_Quarter_Payroll = [], Annual_Payroll = [],
                Number_of_Employees = [], Water_Area = [], Land_Area = [], Single_Family_Units = [], Multi_Family_Units  = [];
    try {
        console.log(`Getting Zip Code data`);

        axios
        .get(`${baseUrl}${zipId}/zip-code-${zipId}.asp`, { headers: { "Accept-Encoding": "gzip,deflate,compress" }  })
        .then((response) => {
            const htmlData = response.data
            const $ = cheerio.load(htmlData)

            // 1. ZIP Code 23112 Details
            // body > table > tbody > tr > td:nth-child(2) > div > div:nth-child(6) > table > tbody > tr:nth-child(1) > td.info
            $("body > table > tbody > tr > td:nth-child(2) > div > div:nth-child(6) > table > tbody").each((index, element) => {
                ZipCode = $($($(element).find("tr")[0]).find("td.info")).text();
                City = $($($(element).find("tr")[1]).find("td.info")).text();
                State = $($($(element).find("tr")[2]).find("td.info")).text();
                Counties = $($($(element).find("tr")[3]).find("td.info")).text();
                CityAlias = $($($(element).find("tr")[5]).find("td.info")).text();
                AreaCode = $($($(element).find("tr")[6]).find("td.info")).text();
                TimeZone = $($($(element).find("tr")[9]).find("td.info")).text();
                Latitude = $($($(element).find("tr")[11]).find("td.info")).text();
                Longitude = $($($(element).find("tr")[12]).find("td.info")).text();
                Elevation = $($($(element).find("tr")[13]).find("td.info")).text();
                Region = $($($(element).find("tr")[16]).find("td.info")).text();
                Division = $($($(element).find("tr")[17]).find("td.info")).text();
            });

            // 2. ZIP Code 23112 2010 Census Demographics
            // body > table > tbody > tr > td:nth-child(2) > div > div:nth-child(9) > div:nth-child(2) > table:nth-child(3) > tbody > tr:nth-child(1) > td.info
            $("body > table > tbody > tr > td:nth-child(2) > div > div:nth-child(9) > div:nth-child(2) > table:nth-child(3) > tbody").each((index, element) => {
                CurrentPopulation2020 = $($($(element).find("tr")[0]).find("td.info")).text();
                Population2010 = $($($(element).find("tr")[1]).find("td.info")).text();
                Households_per_ZIP_Code = $($($(element).find("tr")[2]).find("td.info")).text();
                Average_House_Value = $($($(element).find("tr")[3]).find("td.info")).text();
                Avg_Income_Per_Household = $($($(element).find("tr")[4]).find("td.info")).text();
                Persons_Per_Household = $($($(element).find("tr")[5]).find("td.info")).text();
                White_Population = $($($(element).find("tr")[6]).find("td.info")).text();
                Black_Population = $($($(element).find("tr")[7]).find("td.info")).text();
                Hispanic_Population = $($($(element).find("tr")[8]).find("td.info")).text();
                Asian_Population = $($($(element).find("tr")[9]).find("td.info")).text();
                American_Indian_Population = $($($(element).find("tr")[10]).find("td.info")).text();
                Hawaiian_Population = $($($(element).find("tr")[11]).find("td.info")).text();
                Other_Population = $($($(element).find("tr")[12]).find("td.info")).text();
                Male_Population = $($($(element).find("tr")[13]).find("td.info")).text();
                Female_Population = $($($(element).find("tr")[14]).find("td.info")).text();
                Median_Age = $($($(element).find("tr")[15]).find("td.info")).text();
                Male_Median_Age = $($($(element).find("tr")[16]).find("td.info")).text();
                Female_Median_Age = $($($(element).find("tr")[17]).find("td.info")).text();
            });

            // 3. ZIP Code 23112 Other Demographics
            // body > table > tbody > tr > td:nth-child(2) > div > div:nth-child(9) > div:nth-child(2) > table:nth-child(5) > tbody > tr:nth-child(1) > td.info
            $("body > table > tbody > tr > td:nth-child(2) > div > div:nth-child(9) > div:nth-child(2) > table:nth-child(5) > tbody").each((index, element) => {
                Total_Residential_Mailboxes = $($($(element).find("tr")[0]).find("td.info")).text();
                Total_Business_Mailboxes = $($($(element).find("tr")[1]).find("td.info")).text();
                Total_Delivery_Receptacles = $($($(element).find("tr")[2]).find("td.info")).text();
                Number_of_Businesses = $($($(element).find("tr")[3]).find("td.info")).text();
                First_Quarter_Payroll = $($($(element).find("tr")[4]).find("td.info")).text();
                Annual_Payroll = $($($(element).find("tr")[5]).find("td.info")).text();
                Number_of_Employees = $($($(element).find("tr")[6]).find("td.info")).text();
                Water_Area = $($($(element).find("tr")[7]).find("td.info")).text();
                Land_Area = $($($(element).find("tr")[8]).find("td.info")).text();
                Single_Family_Units = $($($(element).find("tr")[11]).find("td.info")).text();
                Multi_Family_Units = $($($(element).find("tr")[12]).find("td.info")).text();
            });
            articles.push({
                ZipCode, City, State, Counties, CityAlias, AreaCode, TimeZone, Latitude, Longitude, Elevation, Region, Division,
                CurrentPopulation2020, Population2010, Households_per_ZIP_Code, Average_House_Value, Avg_Income_Per_Household, Persons_Per_Household, 
                White_Population, Black_Population, Hispanic_Population, Asian_Population, American_Indian_Population, Hawaiian_Population,
                Other_Population, Male_Population, Female_Population, Median_Age, Male_Median_Age, Female_Median_Age,
                Total_Residential_Mailboxes, Total_Business_Mailboxes, Total_Delivery_Receptacles, Number_of_Businesses, First_Quarter_Payroll, Annual_Payroll,
                Number_of_Employees, Water_Area, Land_Area, Single_Family_Units, Multi_Family_Units,
            })
            console.log(articles)
            res.json(articles);
        }) .catch((error) => console.error(error));
    } catch (error) {
        res.json(error);
        console.log(`Error`);
    }
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
