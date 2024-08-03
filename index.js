// import axios from "axios"
// import cheerio from "cheerio"
// import express from "express"

// const PORT = process.env.PORT || 5000
// const app = express()
// app.use(express.json());

// const baseUrl = 'https://www.zip-codes.com/zip-code/'

// // Welcome route
// app.get('/', async (req, res) => {
//     res.send('Welcome to Web Scraper API!');
// });

// // Get zip code details
// app.get('/zip/:zipId', async (req, res, next) => {
//     const { zipId } = req.params;
//     let articles = [];
//     let ZipCode  = [], City = [], State = [], Counties = [], CityAlias = [], AreaCode = [], TimeZone = [], Latitude = [], Longitude = [], Elevation = [], Region = [], Division = [],
//                 CurrentPopulation2020 = [], Population2010 = [], Households_per_ZIP_Code = [], Average_House_Value = [], Avg_Income_Per_Household = [], Persons_Per_Household = [], 
//                 White_Population = [], Black_Population = [], Hispanic_Population = [], Asian_Population = [], American_Indian_Population = [], Hawaiian_Population = [],
//                 Other_Population = [], Male_Population = [], Female_Population = [], Median_Age = [], Male_Median_Age = [], Female_Median_Age = [],
//                 Total_Residential_Mailboxes = [], Total_Business_Mailboxes = [], Total_Delivery_Receptacles = [], Number_of_Businesses = [], First_Quarter_Payroll = [], Annual_Payroll = [],
//                 Number_of_Employees = [], Water_Area = [], Land_Area = [], Single_Family_Units = [], Multi_Family_Units  = [];
//     try {
//         console.log(`Getting Zip Code data`);

//         axios
//         .get(`${baseUrl}${zipId}/zip-code-${zipId}.asp`, { headers: { "Accept-Encoding": "gzip,deflate,compress" }  })
//         .then((response) => {
//             const htmlData = response.data
//             const $ = cheerio.load(htmlData)

//             // 1. ZIP Code 23112 Details
//             // body > table > tbody > tr > td:nth-child(2) > div > div:nth-child(6) > table > tbody > tr:nth-child(1) > td.info
//             $("body > table > tbody > tr > td:nth-child(2) > div > div:nth-child(6) > table > tbody").each((index, element) => {
//                 ZipCode = $($($(element).find("tr")[0]).find("td.info")).text();
//                 City = $($($(element).find("tr")[1]).find("td.info")).text();
//                 State = $($($(element).find("tr")[2]).find("td.info")).text();
//                 Counties = $($($(element).find("tr")[3]).find("td.info")).text();
//                 CityAlias = $($($(element).find("tr")[5]).find("td.info")).text();
//                 AreaCode = $($($(element).find("tr")[6]).find("td.info")).text();
//                 TimeZone = $($($(element).find("tr")[9]).find("td.info")).text();
//                 Latitude = $($($(element).find("tr")[11]).find("td.info")).text();
//                 Longitude = $($($(element).find("tr")[12]).find("td.info")).text();
//                 Elevation = $($($(element).find("tr")[13]).find("td.info")).text();
//                 Region = $($($(element).find("tr")[16]).find("td.info")).text();
//                 Division = $($($(element).find("tr")[17]).find("td.info")).text();
//             });

//             // 2. ZIP Code 23112 2010 Census Demographics
//             // body > table > tbody > tr > td:nth-child(2) > div > div:nth-child(9) > div:nth-child(2) > table:nth-child(3) > tbody > tr:nth-child(1) > td.info
//             $("body > table > tbody > tr > td:nth-child(2) > div > div:nth-child(9) > div:nth-child(2) > table:nth-child(3) > tbody").each((index, element) => {
//                 CurrentPopulation2020 = $($($(element).find("tr")[0]).find("td.info")).text();
//                 Population2010 = $($($(element).find("tr")[1]).find("td.info")).text();
//                 Households_per_ZIP_Code = $($($(element).find("tr")[2]).find("td.info")).text();
//                 Average_House_Value = $($($(element).find("tr")[3]).find("td.info")).text();
//                 Avg_Income_Per_Household = $($($(element).find("tr")[4]).find("td.info")).text();
//                 Persons_Per_Household = $($($(element).find("tr")[5]).find("td.info")).text();
//                 White_Population = $($($(element).find("tr")[6]).find("td.info")).text();
//                 Black_Population = $($($(element).find("tr")[7]).find("td.info")).text();
//                 Hispanic_Population = $($($(element).find("tr")[8]).find("td.info")).text();
//                 Asian_Population = $($($(element).find("tr")[9]).find("td.info")).text();
//                 American_Indian_Population = $($($(element).find("tr")[10]).find("td.info")).text();
//                 Hawaiian_Population = $($($(element).find("tr")[11]).find("td.info")).text();
//                 Other_Population = $($($(element).find("tr")[12]).find("td.info")).text();
//                 Male_Population = $($($(element).find("tr")[13]).find("td.info")).text();
//                 Female_Population = $($($(element).find("tr")[14]).find("td.info")).text();
//                 Median_Age = $($($(element).find("tr")[15]).find("td.info")).text();
//                 Male_Median_Age = $($($(element).find("tr")[16]).find("td.info")).text();
//                 Female_Median_Age = $($($(element).find("tr")[17]).find("td.info")).text();
//             });

//             // 3. ZIP Code 23112 Other Demographics
//             // body > table > tbody > tr > td:nth-child(2) > div > div:nth-child(9) > div:nth-child(2) > table:nth-child(5) > tbody > tr:nth-child(1) > td.info
//             $("body > table > tbody > tr > td:nth-child(2) > div > div:nth-child(9) > div:nth-child(2) > table:nth-child(5) > tbody").each((index, element) => {
//                 Total_Residential_Mailboxes = $($($(element).find("tr")[0]).find("td.info")).text();
//                 Total_Business_Mailboxes = $($($(element).find("tr")[1]).find("td.info")).text();
//                 Total_Delivery_Receptacles = $($($(element).find("tr")[2]).find("td.info")).text();
//                 Number_of_Businesses = $($($(element).find("tr")[3]).find("td.info")).text();
//                 First_Quarter_Payroll = $($($(element).find("tr")[4]).find("td.info")).text();
//                 Annual_Payroll = $($($(element).find("tr")[5]).find("td.info")).text();
//                 Number_of_Employees = $($($(element).find("tr")[6]).find("td.info")).text();
//                 Water_Area = $($($(element).find("tr")[7]).find("td.info")).text();
//                 Land_Area = $($($(element).find("tr")[8]).find("td.info")).text();
//                 Single_Family_Units = $($($(element).find("tr")[11]).find("td.info")).text();
//                 Multi_Family_Units = $($($(element).find("tr")[12]).find("td.info")).text();
//             });
//             articles.push({
//                 ZipCode, City, State, Counties, CityAlias, AreaCode, TimeZone, Latitude, Longitude, Elevation, Region, Division,
//                 CurrentPopulation2020, Population2010, Households_per_ZIP_Code, Average_House_Value, Avg_Income_Per_Household, Persons_Per_Household, 
//                 White_Population, Black_Population, Hispanic_Population, Asian_Population, American_Indian_Population, Hawaiian_Population,
//                 Other_Population, Male_Population, Female_Population, Median_Age, Male_Median_Age, Female_Median_Age,
//                 Total_Residential_Mailboxes, Total_Business_Mailboxes, Total_Delivery_Receptacles, Number_of_Businesses, First_Quarter_Payroll, Annual_Payroll,
//                 Number_of_Employees, Water_Area, Land_Area, Single_Family_Units, Multi_Family_Units,
//             })
//             console.log(articles)
//             res.json(articles);
//         }) .catch((error) => console.error(error));
//     } catch (error) {
//         res.json(error);
//         console.log(`Error`);
//     }
// });


// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))



// import axios from 'axios';
// import cheerio from 'cheerio';
// import express from 'express';

// const PORT = process.env.PORT || 5000;
// const app = express();
// app.use(express.json());

// // const baseUrl = 'https://www.zip-codes.com/zip-code/';
// const baseUrl = 'http://www.usa.com/21076-md.htm';

// // Welcome route
// app.get('/', (req, res) => {
//   res.send('Welcome to Web Scraper API!');
// });

// // Get zip code details
// // app.get('/zip/:zipId', async (req, res) => {
// app.get('/zip/', async (req, res) => {
//   const { zipId } = req.params;
//   try {
//     console.log(`Getting Zip Code data`);

//     // const response = await axios.get(`${baseUrl}${zipId}/zip-code-${zipId}.asp`, { headers: { "Accept-Encoding": "gzip,deflate,compress" } })
//     const response = await axios.get(`${baseUrl}`, { headers: { "Accept-Encoding": "gzip,deflate,compress" } });;
//     const htmlData = response.data;
//     // console.log("htmlData: " + htmlData);
//     const $ = cheerio.load(htmlData);

//     let data = {
//       ZipCode: '', City: '', State: '', Counties: '', CityAlias: '', AreaCode: '', TimeZone: '', Latitude: '', Longitude: '', Elevation: '', Region: '', Division: '',
//       CurrentPopulation2020: '', Population2010: '', Households_per_ZIP_Code: '', Average_House_Value: '', Avg_Income_Per_Household: '', Persons_Per_Household: '', 
//       White_Population: '', Black_Population: '', Hispanic_Population: '', Asian_Population: '', American_Indian_Population: '', Hawaiian_Population: '',
//       Other_Population: '', Male_Population: '', Female_Population: '', Median_Age: '', Male_Median_Age: '', Female_Median_Age: '',
//       Total_Residential_Mailboxes: '', Total_Business_Mailboxes: '', Total_Delivery_Receptacles: '', Number_of_Businesses: '', First_Quarter_Payroll: '', Annual_Payroll: '',
//       Number_of_Employees: '', Water_Area: '', Land_Area: '', Single_Family_Units: '', Multi_Family_Units: ''
//     };

//     // Adjusted selectors based on actual webpage structure
//     // const tableRows = $('table.statTable tbody tr');
//     const tableRows = $("#content > table > tbody > tr > td:nth-child(1) > table > tbody");
//     console.log("tableRows: ");
//     console.log(tableRows);
//     tableRows.each((index, element) => {
//       const row = $(element);
//       const label = row.find('tr:nth-child(1) > td:nth-child(1) > b').text().trim();
//       console.log("label: ");
//       console.log(label);
//       const value = row.find('tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)').text().trim();
//       console.log("value: ");
//       console.log(value);

//       switch(label) {

//       }



//     //   switch(label) {
//     //     case 'Zip Code':
//     //       data.ZipCode = value;
//     //       break;
//     //     case 'City':
//     //       data.City = value;
//     //       break;
//     //     case 'State':
//     //       data.State = value;
//     //       break;
//     //     case 'County':
//     //       data.Counties = value;
//     //       break;
//     //     case 'City Alias(es)':
//     //       data.CityAlias = value;
//     //       break;
//     //     case 'Area Code(s)':
//     //       data.AreaCode = value;
//     //       break;
//     //     case 'Timezone':
//     //       data.TimeZone = value;
//     //       break;
//     //     case 'Latitude':
//     //       data.Latitude = value;
//     //       break;
//     //     case 'Longitude':
//     //       data.Longitude = value;
//     //       break;
//     //     case 'Elevation':
//     //       data.Elevation = value;
//     //       break;
//     //     case 'Region':
//     //       data.Region = value;
//     //       break;
//     //     case 'Division':
//     //       data.Division = value;
//     //       break;
//     //     case 'Current Population (2020)':
//     //       data.CurrentPopulation2020 = value;
//     //       break;
//     //     case 'Population (2010)':
//     //       data.Population2010 = value;
//     //       break;
//     //     case 'Households per ZIP Code':
//     //       data.Households_per_ZIP_Code = value;
//     //       break;
//     //     case 'Average House Value':
//     //       data.Average_House_Value = value;
//     //       break;
//     //     case 'Avg. Income Per Household':
//     //       data.Avg_Income_Per_Household = value;
//     //       break;
//     //     case 'Persons Per Household':
//     //       data.Persons_Per_Household = value;
//     //       break;
//     //     case 'White Population':
//     //       data.White_Population = value;
//     //       break;
//     //     case 'Black Population':
//     //       data.Black_Population = value;
//     //       break;
//     //     case 'Hispanic Population':
//     //       data.Hispanic_Population = value;
//     //       break;
//     //     case 'Asian Population':
//     //       data.Asian_Population = value;
//     //       break;
//     //     case 'American Indian Population':
//     //       data.American_Indian_Population = value;
//     //       break;
//     //     case 'Hawaiian Population':
//     //       data.Hawaiian_Population = value;
//     //       break;
//     //     case 'Other Population':
//     //       data.Other_Population = value;
//     //       break;
//     //     case 'Male Population':
//     //       data.Male_Population = value;
//     //       break;
//     //     case 'Female Population':
//     //       data.Female_Population = value;
//     //       break;
//     //     case 'Median Age':
//     //       data.Median_Age = value;
//     //       break;
//     //     case 'Male Median Age':
//     //       data.Male_Median_Age = value;
//     //       break;
//     //     case 'Female Median Age':
//     //       data.Female_Median_Age = value;
//     //       break;
//     //     case 'Total Residential Mailboxes':
//     //       data.Total_Residential_Mailboxes = value;
//     //       break;
//     //     case 'Total Business Mailboxes':
//     //       data.Total_Business_Mailboxes = value;
//     //       break;
//     //     case 'Total Delivery Receptacles':
//     //       data.Total_Delivery_Receptacles = value;
//     //       break;
//     //     case 'Number of Businesses':
//     //       data.Number_of_Businesses = value;
//     //       break;
//     //     case 'First Quarter Payroll':
//     //       data.First_Quarter_Payroll = value;
//     //       break;
//     //     case 'Annual Payroll':
//     //       data.Annual_Payroll = value;
//     //       break;
//     //     case 'Number of Employees':
//     //       data.Number_of_Employees = value;
//     //       break;
//     //     case 'Water Area':
//     //       data.Water_Area = value;
//     //       break;
//     //     case 'Land Area':
//     //       data.Land_Area = value;
//     //       break;
//     //     case 'Single Family Units':
//     //       data.Single_Family_Units = value;
//     //       break;
//     //     case 'Multi Family Units':
//     //       data.Multi_Family_Units = value;
//     //       break;
//     //   }
//     });

//     console.log("data: ");
//     console.log(data);
//     res.json(data);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while fetching the data.' });
//   }
// });

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



import axios from 'axios';
import cheerio from 'cheerio';
import express from 'express';

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());


// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to Web Scraper API!');
});

// Get zip code details
app.get('/zip/:zipId', async (req, res) => {
  const { zipId } = req.params;
  const zipCodes_baseUrl = 'https://www.zip-codes.com/zip-code/';
  try {
    console.log(`Getting Zip Code data`);

    const response = await axios.get(`${zipCodes_baseUrl}${zipId}/zip-code-${zipId}.asp`, { headers: { "Accept-Encoding": "gzip,deflate,compress" } });
    const htmlData = response.data;
    const $ = cheerio.load(htmlData);

    let data = {
      City: '', Counties: '', TimeZone: '', LocalTime: '', Population: '', AreaCode:'', LandArea:'', QuickLink:'',
    };

    data.City = $('#info > table > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim();
    data.Counties = $('#info > table > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim();
    data.TimeZone = $('#info > table > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim();
    data.LocalTime = $('#info > table > tbody > tr:nth-child(5) > td:nth-child(2)').text().trim();
    data.Population = $('#info > table > tbody > tr:nth-child(6) > td:nth-child(2)').text().trim();
    data.AreaCode = $('#info > table > tbody > tr:nth-child(8) > td:nth-child(2)').text().trim();
    data.LandArea = $('#info > table > tbody > tr:nth-child(10) > td:nth-child(2)').text().trim();
    data.QuickLink = $('#info > table > tbody > tr:nth-child(11) > td:nth-child(2)').text().trim();


    console.log(data);
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the data.' });
  }
});


// Get zip code details
app.get('/zip/:zipId/:state', async (req, res) => {
        const { zipId } = req.params;
        const { state } = req.params;
        const usa_baseUrl = 'http://www.usa.com/';
        const usa_url = `${usa_baseUrl}${zipId}-${state}.htm`
        console.log("usa_baseUrl: " + usa_baseUrl);
        try {
          console.log(`Getting Zip Code data`);
      
        //   const response = await axios.get(`${usa_baseUrl}`, { headers: { "Accept-Encoding": "gzip,deflate,compress" } });
          const response = await axios.get(`${usa_url}`, { headers: { "Accept-Encoding": "gzip,deflate,compress" } });
          const htmlData = response.data;
          console.log("htmlData: " + htmlData);
          const $ = cheerio.load(htmlData);
      
          let data = {
            Population:'', PopulationGrowth:'', PopulationDensity:'', MedianHouseholdIncome:'', MedianHousePrice:'', TimeZone:'', 
            LandArea:'', WaterArea:'', State:'', Area:'', Counties:'', City:'', SchoolDistrict:'', AreaCode:'', QuickLink:'',
          };
      
          data.Population = $('#content > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim();
          data.PopulationGrowth = $('#content > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim();
          data.PopulationDensity = $('#content > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim();
          data.MedianHouseholdIncome = $('#content > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(2) > a:nth-child(1)').text().trim();
          data.MedianHousePrice = $('#content > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(5) > td:nth-child(2) > a:nth-child(1)').text().trim();
          data.TimeZone = $('#content > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(6) > td:nth-child(2)').text().trim();
          data.LandArea = $('#content > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(7) > td:nth-child(2)').text().trim();
          data.WaterArea = $('#content > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(8) > td:nth-child(2)').text().trim();
          data.State = $('#content > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(9) > td:nth-child(2)').text().trim();
          data.Area = $('#content > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(10) > td:nth-child(2)').text().trim();
          data.Counties = $('#content > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(11) > td:nth-child(2) >').text().trim();
          data.City = $('#content > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(12) > td:nth-child(2)').text().trim();
          data.SchoolDistrict = $('#content > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(13) > td:nth-child(2)').text().trim();
          data.AreaCode = $('#content > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(14) > td:nth-child(2)').text().trim();
          data.QuickLink = usa_url;
      
      
          console.log(data);
          res.json(data);
      
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while fetching the data.' });
        }
      });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
