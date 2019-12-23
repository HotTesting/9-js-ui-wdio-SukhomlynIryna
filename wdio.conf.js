require("ts-node").register({ files: true });

const wdioConfig  = {
    runner: 'local',
    path: '/',
    specs: [
        './tests/specs/ordering*.ts'
    ],
    capabilities: [{
        maxInstances: 2,
        browserName: 'chrome',
    }],
    logLevel: 'warn',   // Level of logging verbosity: trace | debug | info | warn | error | silent
    baseUrl: 'http://ip-5236.sunline.net.ua:38015',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 1,
    services: ['chromedriver'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    beforeSession: function(config, capabilities) {
        if (process.env.DEBUG == "1") {
            // Giving debugger some time to connect...
            return new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

if (process.env.DEBUG == "1") {
    console.log("###### Running in debug mode! ######");
    wdioConfig.maxInstances = 1;
    wdioConfig["execArgv"] = ["--inspect=127.0.0.1:5858"];
    wdioConfig.mochaOpts.timeout = 360000;
}

exports.config = wdioConfig;