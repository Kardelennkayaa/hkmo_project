var developmentDatabase = {
    postgres: {
    host: 'ec2-52-87-107-83.compute-1.amazonaws.com',
    port: 5432,
    database: 'd81ss3tdrvp4t5',
    user: 'dfoziovinfukjx',
    password: '5ee0236e5b8ce3fc0c1e04952c386d1a7fea4e3f24f9823ef26e6db9efa22818'
    }
    }
    var connectionString = "postgres://dfoziovinfukjx:5ee0236e5b8ce3fc0c1e04952c386d1a7fea4e3f24f9823ef26e6db9efa22818@ec2-52-87-107-83.compute-1.amazonaws.com:5432/d81ss3tdrvp4t5";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = true;
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }