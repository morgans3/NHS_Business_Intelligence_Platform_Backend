const AWS = require("aws-sdk");
const fs = require('fs')
const pool = require("../config/postgres").pool;
const parser = require('csv-parser');
pool.then(pool => {
    //Set the tables to be backed up here
    const tableNames = [
        "virtual_ward_decision_20211129_new",
    ];

    tableNames.forEach(tableName => {
        let filePath = `./postgres/backup_data/${tableName}.csv`;
        var csvData=[];
        var arrQuery=[];
        //Read the csv file containing the table data
        fs.createReadStream(filePath)
        .pipe(parser())
        .on('data', function(data){
            try {
                // Push the data to an array to be processed.
                csvData.push(data);
            }
            catch(err) {
                //error handler
                if(err){
                    console.log('Error: ' + err);
                }
            }
        })
        .on('end',function(){
            // Process the data ready to be inserted into the database
            if(csvData.length){
                // counter to keep track of the number of rows processed, this can be used to determine how many rows will be inserted at once
                let counter = 0
                let totalCounter = 0
                let queryStart = `INSERT INTO ${tableName} `;
                let queryValues = ``;
                let query = ``;
                let blnFirstRemainder = false;
                let csvCurrentRowCounter = 0;
                let csvReplaceItemCounter = 1;
                let csvReplaceValues = [];
                csvData.forEach(row => {                   
                    // If the counter has no value then this is the first row of the csv file, so we create the start of the insert query
                    if(!counter && !blnFirstRemainder){
                        queryStart += `(`;
                        Object.keys(row).forEach(key => {
                            queryStart += `${key},`;
                        });
                        queryStart += `)`;
                        queryStart = queryStart.replace(',)', ')');
                        queryStart += ` VALUES `;
                    }
                    // each value entry starts in it's own brackets
                    queryValues += `(`;
                    // get the length of the array so we can avoid a comma on the last item to be added to the query
                    let lastItem = (Object.keys(row).length - 1);
                    // loop through the array of values adding in a find and replace value ($1,$2,etc)
                    Object.keys(row).forEach(key => {
                        if(csvCurrentRowCounter == lastItem){
                            queryValues += `$${csvReplaceItemCounter}`;
                        } else {
                            queryValues += `$${csvReplaceItemCounter},`;
                        }
                        //update the replacement array with the value
                        csvReplaceValues = updateCSVReplaceValues(csvReplaceValues, row[key]);
                        //update the counters
                        csvCurrentRowCounter++
                        csvReplaceItemCounter++
                    });
                    //reset current row counter now the loop is over
                    csvCurrentRowCounter = 0;
                    //add the closing brackets to the query.
                    queryValues += `),`;
                    //Edit the number below to change how many rows per query, 1000 is the maximum Postgres limit.
                    if(counter && (counter % 500 == 0)){
                        //if this isn't the first time the values have reset (when counter = 1 the very first time we have updated headers and do not need to restart the loop)
                        if(blnFirstRemainder){
                            // remove the comma from the end of the query
                            queryValues = queryValues.slice(0, -1);
                            // build the query 
                            query = queryStart + queryValues;
                            // add the query to the array of queries and replacement values
                            arrQuery.push({text: query, values:csvReplaceValues});
                            //Reset the counters and values
                            csvReplaceValues = [];
                            queryValues = ``;
                            csvReplaceItemCounter = 1;
                            counter = 0;
                        }
                        blnFirstRemainder = true;
                    }
                    counter++;
                    totalCounter++;
                });
                queryValues = queryValues.slice(0, -1);
                query = queryStart + queryValues;
                arrQuery.push({text: query, values:csvReplaceValues});
                updateTable(arrQuery);
            }               
        }); 
    });

    function updateTable(arrQuery){
        if(arrQuery.length){
            let counter = 0;
            arrQuery.forEach(query => {
                pool.query(query, (error, results) => {
                    if (error) {
                        console.log(error + ' - query number ' + counter);
                    } else if (results && results.rows && results.rows.length) {
                        console.log(results.rows);
                    } else {
                        console.log("Table Updated, query number " + counter);
                    }
                    counter++;
                });
            });
        }
    }

    function updateCSVReplaceValues(arrValues, data){
        if(!data){
            data = null;
        }
        arrValues.push(data);
        return arrValues;
    }
});