using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using OfficeOpenXml;
using WorldCities.Data;
using WorldCities.Data.Models;


namespace WorldCities.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeedController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IWebHostEnvironment env;

        public SeedController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            this.context = context;
            this.env = env;
        } 


        [HttpGet]
        public async Task<ActionResult> Import()
        {
           if (!this.env.IsDevelopment())
            {
                throw new SecurityException("Not Allowed");
            } 

            var path = Path.Combine(this.env.ContentRootPath, "Data/Source/worldcities.xlsx");
            using var stream = System.IO.File.OpenRead(path);
            using var excelPackage = new ExcelPackage(stream);
            var worksheet = excelPackage.Workbook.Worksheets[0];
            var nEndRow = worksheet.Dimension.End.Row;
            var numberOfCountriesAdded = 0;
            var numberOfCitiesAdded = 0;
            var countriesByName = this.context.Countries.AsNoTracking().ToDictionary(x => x.Name, StringComparer.OrdinalIgnoreCase);

            for (int nRow = 2; nRow <= nEndRow; nRow++)
            {
                var row = worksheet.Cells[nRow, 1, nRow, worksheet.Dimension.End.Column];
                var countryName = row[nRow, 5].GetValue<string>();
                var iso2 = row[nRow, 6].GetValue<string>();
                var iso3 = row[nRow, 7].GetValue<string>();
                if (countriesByName.ContainsKey(countryName))
                    continue;
                var country = new Country
                {
                    Name = countryName,
                    ISO2 = iso2,
                    ISO3 = iso3
                };
                await this.context.Countries.AddAsync(country);
                countriesByName.Add(countryName, country);
                numberOfCountriesAdded++;
            }
            if (numberOfCountriesAdded > 0)
                await this.context.SaveChangesAsync();
            // create a lookup dictionary
            // containing all the cities already existing 
            // into the Database (it will be empty on first run). 
            var cities = this.context.Cities
                .AsNoTracking()
                .ToDictionary(x => (
                    Name: x.Name,
                    Lat: x.Lat,
                    Lon: x.Lon,
                    CountryId: x.CountryId));
            // iterates through all rows, skipping the first one 
            for (int nRow = 2; nRow <= nEndRow; nRow++)
            {
                var row = worksheet.Cells[
                    nRow, 1, nRow, worksheet.Dimension.End.Column];
                var name = row[nRow, 1].GetValue<string>();
                var nameAscii = row[nRow, 2].GetValue<string>();
                var lat = row[nRow, 3].GetValue<decimal>();
                var lon = row[nRow, 4].GetValue<decimal>();
                var countryName = row[nRow, 5].GetValue<string>();
                // retrieve country Id by countryName
                var countryId = countriesByName[countryName].Id;
                // skip this city if it already exists in the database
                if (cities.ContainsKey((
                    Name: name,
                    Lat: lat,
                    Lon: lon,
                    CountryId: countryId)))
                    continue;
                // create the City entity and fill it with xlsx data 
                var city = new City
                {
                    Name = name,
                    Name_ASCII = nameAscii,
                    Lat = lat,
                    Lon = lon,
                    CountryId = countryId
                };
                // add the new city to the DB context 
                this.context.Cities.Add(city);
                // increment the counter 
                numberOfCitiesAdded++;
            }
            // save all the cities into the Database 
            if (numberOfCitiesAdded > 0)
                await this.context.SaveChangesAsync();
            return new JsonResult(new
            {
                Cities = numberOfCitiesAdded,
                Countries = numberOfCountriesAdded
            });

        }
    }
}
