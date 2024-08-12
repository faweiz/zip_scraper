import axios from 'axios';
// import cheerio from 'cheerio';
import * as cheerio from 'cheerio';
import express from 'express';

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
// app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to Web Scraper API!');
});

// Get zip-codes zip code details
app.get('/zip/:zipId', async (req, res) => {
  const { zipId } = req.params;
  const zipCode_baseUrl = 'https://www.zip-codes.com/zip-code/';
  const zipCode_url = `${zipCode_baseUrl}${zipId}/zip-code-${zipId}.asp`
  console.log("zipCode_url: " + zipCode_url);

  try {
    console.log(`Getting Zip Code data`);

    const response = await axios.get(`${zipCode_url}`, { headers: { "Accept-Encoding": "gzip,deflate,compress" } });
    const htmlData = response.data;
    const $ = cheerio.load(htmlData);

    let data = {
      City: '', Counties: '', TimeZone: '', LocalTime: '', Population: '', AreaCode:'', LandArea:'', QuickLink:'',
      CurrentPopulation:'', Households:'', TwentyPopulation:'', AverageHouseValue:'', PopulationDensity:'', PersonsPerHousehold:'', AverageIncome:'', AverageFamilySize:'', 
      whitePopulation:'', blackPopulation:'', hispanicPopulation:'', asianPopulation:'', americanIndianPopulation:'', hawaiianPopulation:'', otherPopulation:'',  
      whitePopulationPercent:'', blackPopulationPercent:'', hispanicPopulationPercent:'', asianPopulationPercent:'', americanIndianPopulationPercent:'', hawaiianPopulationPercent:'', otherPopulationPercent:'',  
    }

    data.City = $('#info > table > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim();
    data.Counties = $('#info > table > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim();
    data.TimeZone = $('#info > table > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim();
    data.LocalTime = $('#info > table > tbody > tr:nth-child(5) > td:nth-child(2)').text().trim();
    data.Population = $('#info > table > tbody > tr:nth-child(6) > td:nth-child(2)').text().trim();
    data.AreaCode = $('#info > table > tbody > tr:nth-child(8) > td:nth-child(2)').text().trim();
    data.LandArea = $('#info > table > tbody > tr:nth-child(10) > td:nth-child(2)').text().trim();
    data.QuickLink = $('#info > table > tbody > tr:nth-child(11) > td:nth-child(2)').text().trim();

    // ZIP Code  Demographics
    data.CurrentPopulation = $('#demographics > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim();
    data.Households = $('#demographics > div:nth-child(3) > table > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim();
    data.TwentyPopulation = $('#demographics > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim();
    data.AverageHouseValue = $('#demographics > div:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim();
    data.PopulationDensity = $('#demographics > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim();
    data.PersonsPerHousehold = $('#demographics > div:nth-child(3) > table > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim();
    data.AverageIncome = $('#demographics > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim();
    data.AverageFamilySize = $('#demographics > div:nth-child(3) > table > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim();

    // Population by Race
    data.whitePopulation = $('#race-0 > div.dCTa > table > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim();
    data.blackPopulation = $('#race-0 > div.dCTa > table > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim();
    data.hispanicPopulation = $('#race-0 > div.dCTa > table > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim();
    data.asianPopulation = $('#race-0 > div.dCTa > table > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim();
    data.americanIndianPopulation = $('#race-0 > div.dCTa > table > tbody > tr:nth-child(5) > td:nth-child(2)').text().trim();
    data.hawaiianPopulation = $('#race-0 > div.dCTa > table > tbody > tr:nth-child(6) > td:nth-child(2)').text().trim();
    data.otherPopulation = $('#race-0 > div.dCTa > table > tbody > tr:nth-child(7) > td:nth-child(2)').text().trim();

    // Population by Race Percent
    data.whitePopulationPercent = $('#race-0 > div.dCTa > table > tbody > tr:nth-child(1) > td:nth-child(3)').text().trim();
    data.blackPopulationPercent = $('#race-0 > div.dCTa > table > tbody > tr:nth-child(2) > td:nth-child(3)').text().trim();
    data.hispanicPopulationPercent = $('#race-0 > div.dCTa > table > tbody > tr:nth-child(3) > td:nth-child(3)').text().trim();
    data.asianPopulationPercent = $('#race-0 > div.dCTa > table > tbody > tr:nth-child(4) > td:nth-child(3)').text().trim();
    data.americanIndianPopulationPercent = $('#race-0 > div.dCTa > table > tbody > tr:nth-child(5) > td:nth-child(3)').text().trim();
    data.hawaiianPopulationPercent = $('#race-0 > div.dCTa > table > tbody > tr:nth-child(6) > td:nth-child(3)').text().trim();
    data.otherPopulationPercent = $('#race-0 > div.dCTa > table > tbody > tr:nth-child(7) > td:nth-child(3)').text().trim();
    
    console.log(data);
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the data.' });
  }
});


// Get usa zip code details
app.get('/zip/:zipId/:state', async (req, res) => {
        const { zipId } = req.params;
        const { state } = req.params;
        const usa_baseUrl = 'http://www.usa.com/';
        const usa_url = `${usa_baseUrl}${zipId}-${state}.htm`
        console.log("usa_url: " + usa_url);
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
