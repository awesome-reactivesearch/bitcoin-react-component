
# How to build a Reusable React Component for showing realtime $bitcoin prices

![](https://cdn-images-1.medium.com/max/800/1*gfOxPyHPQnt8Wf28ESq8og.png)

If you haven’t been following the bitcoin prices lately, you might be missing out on a trend. Just this past month, the bitcoin price has been on a surge — jumped over USD 200 in value.

> For those living under the rock, Bitcoin is a new age peer-to-peer currency for  direct transactions without involving an intermediary. New bitcoins can be minted by running a mining software and there will only ever be 21 million bitcoins in the world, which means the more the bitcoins are minted the scarcer they get. It’s a fascinating topic, and you can ready more about it from the [bitcoin foundation](https://bitcoin.org/en/).

To catch up on all this fun, we decided to build ourselves a bitcoin price component in ReactJS that displays the current value. In a later post, we would like to extend this component to also allow setting price alerts to notify interested users in realtime for **buying** or **shorting** bitcoins.

![Final look at our live bitcoin price component, built with React.JS](https://cdn-images-1.medium.com/max/800/1*hlZezszi078AolVgkgSz_Q.png)

*****

## Key Ingredients

Of course, we will be using ReactJS for building the bitcoin component. On the backend side, we will be using AWS Lambda to fetch the bitcoin price data and index it into [appbase.io](https://appbase.io), our DB layer of choice for reactively displaying the current bitcoin price and (in later post) for building the “when price changes to X, send me an email” functionality.

There are good chances you are not familiar with at least one of these three technologies. This post is designed as a 101 tutorial and we will show how each of these works as we go along. The only pre-requisite is some experience of writing code in Javascript.

At the end of this post, you should be able to build a React component exactly like the one in the above image.

We will break down the post  into two parts:

1.  Building the UI component that displays the price in realtime along with the interactive chart,
2.  Writing the AWS lambda worker that polls the bitcoin price from a REST API in fixed intervals and indexes it into appbase.io.

*****

## First: The UI Component

For  those that haven’t worked with React before, it’s an open-source Javascript library for building reusable UI views. If you want to see how it compares to your experiences of building frontend UIs, I recommend reading the [why react](https://facebook.github.io/react/docs/why-react.html) page.

A component is a fundamental abstraction in React, an equivalent of UI widget. A React component can have more React components, thus promoting reusability. We will explain how this works as we go along.

### Step 1: Setting up the project

We will start by creating the project directory and add all the files we need for the components. You can call this directory **bitcoin-alert-component**. These are all the files we will be using for building the component.
```    
bitcoin-alert-component/
|_ _ _ _ src/
|        |_ _ _ _ index.html
|        |_ _ _ _ main.js
|        |_ _ _ _ components/
|                |_ _ _ _ appbase.js
|                |_ _ _ _ Bitcoin.js
|                |_ _ _ _ BitcoinChart.js
|                |_ _ _ _ Stats.js
|        |_ _ _ _ css/
|                |_ _ _ _ style.css
|_ _ _ _ package.json
|_ _ _ _ gulpfile.js
```    
We will first initialize package.json with all the npm dependencies. We will use the **browserify** module to transform all these dependencies to be compatible with browser js.
```javascript
{
  "name": "bitcoin-price-alert-backend",
  "main": "main.js",
    "dependencies": {
    "appbase-js": "^0.10.7",
    "bootstrap": "^3.3.5",
    "browserify": "^10.2.4",
    "gulp": "^3.9.0",
    "gulp-concat": "^2.6.0",
    "gulp-connect": "^2.2.0",
    "gulp-eslint": "^0.15.0",
    "gulp-open": "^0.3.2",
    "jquery": "^2.1.4",
    "react": "^15.1.0",
    "react-dom": "^15.1.0",
    "react-highcharts": "^8.3.2",
    "reactify": "^1.1.1",
    "vinyl-source-stream": "^1.1.0"
  },
  "devDependencies": {
    "babelify": "^7.2.0",
    "gulp-install": "^0.6.0"
  }
}
```    

We will add Gulpfile to automate Your Tasks Easily with Gulp.js
```javascript
touch gulpfile.js
```    

and [add following code](https://github.com/appbaseio-apps/bitcoin-react-component/blob/gh-pages/gulpfile.js) to it.

The code will go in the **src/** directory, let’s create it
``` 
mkdir -p src/components
```    
**main.js** will be our root javascript file. We will include it inside **index.html**. Let’s touch these two files.
``` 
touch src/index.html
touch src/main.js
```      
### Step 2: Writing React Components

Let’s start by touching the component files.
```javascript    
cd src/components/
touch appbase.js        # config file for connecting to realtimedata
touch Bitcoin.js
touch BitcoinChart.js   
touch Stats.js          # display realtime price stats
```     
We use the [appbase-js library](http://docs.appbase.io/scalr/javascript/api-reference.html) (available via bower and npm) for making live queries for streaming the bitcoin prices.

![Enter your username and password fields for your app as shown](https://cdn-images-1.medium.com/max/800/1*f0f7AkZzuwI6Hu0poF1TKQ.gif)

Login to the appbase.io dashboard to create an app and retrieve the **username** and **password** fields as shown in the above image. We will add them along with the **appname ** in the config.json file as shown below. We will also  set the **type** field (it’s equivalent to a table in SQL) to a string value, say “prices” and use it for retrieving the realtime price data.

```javascript
var Appbase = require("appbase-js");
var config = {
  "appname": "your_appbase_appname",
  "username": "your_appbase_app's_username",
  "password": "your_appbase_app's_password",
  "type": "your_app's_default_type_to_write_data"
};
var appbaseRef = new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: config.appname,
  username: config.username,
  password: config.password
});

exports.appbaseRef = appbaseRef;
exports.config = config;
```    

Next we will create Bitcoin component which will contain Stats and chart component which we will define ahead. Enter the following code in bitcoin.js:

```javascript   
var React = require('react');
var Stats = require("./Stats");
var BitcoinChart = require("./BitcoinChart");

var Bitcoin = React.createClass({
  handlePriceChange: function (priceObject) {
    // Logic for handling the price change goes here
  },
  render: function () {
    return (
      <div>
        <Stats onPriceChange={this.handlePriceChange} />
        <BitcoinChart />
      </div>
    )
  }
});

module.exports = Bitcoin;
```    
A component in React is always invoked with a React.createClass({specObj}), where the specification object should contain a mandatory render() method. It can contain other methods for initialization and specifying state changes when the user interacts with the DOM. You can read in depth about a [component’s spec and lifecycle here](https://facebook.github.io/react/docs/component-specs.html).

It is fairly simple file where we require our Stats component and render it in Bitcoin component.

* L5–8, We will define a **handlePriceChange()** method which will be called on price change.
* L9–16, we render the Stats component showing real-time bitcoin prices.

As we saw, now we will be building two sub-components that builds our bitcoin component:
```    
Bitcoin Component/
|_ _ _ _ BitcoinCharts component ( Display bitcoin data with history  on the chart)
|_ _ _ _ Stats component ( Display Bitcoin real time stats )
```    

Let us start by creating BitcoinCharts.js — a React component for displaying the real-time price updates on a chart.

```javascript   
var React = require("react");
var appbaseRef = require("./appbase").appbaseRef;
var config = require("./appbase").config;
var ReactHighstock = require("react-highcharts/bundle/ReactHighstock");

var data = []
var chartConfig = {
  rangeSelector: {
    buttons: [{
      count: 5,
      type: 'minute',
      text: '5M'
    }, {
        count: 60,
        type: 'minute',
        text: '60M'
      }, {
        type: 'all',
        text: 'All'
      }],
    inputEnabled: false,
    selected: 0
  },

  title: {
    text: 'Live Bitcoin Price'
  },

  xAxis: {
    minRange: 60 * 1000 * 2// Two minute
  },
  exporting: {
    enabled: false
  },

  series: [{
    name: 'Bitcoin Price',
    data: data
  }]
}

// Get 1000 records with desc sorted timestamp
var requestObject = {
  type: config.type,
  body: {
    size: 1000,
    query: {
      match_all: {}
    },
    sort: {
      timestamp: "desc"
    }
  }
};

// Use the local time on the x-axis
ReactHighstock.Highcharts.setOptions({
  global: {
    useUTC: false
  }
});
```   
* Line 6–40, we define the config for the Highchart. We define three range Selector — 5 Minutes, 60 Minutes and all.
* Line 43–54, We define the request object for Appbase. We will fetch last 1000 records.
* Line 57–61, we set UTCFalse as false so that it will have local timestamp.

Now that config are set, let us create BitcoinChart and use them. Add the following to BitcoinCharts.js

```javascript    
var BitcoinChart = React.createClass({

  componentDidMount: function () {
    var self = this;
    appbaseRef.search(requestObject).on('data', function (res) {
      var hits = [];
      var chart = self.refs.stockchart.getChart();
      res.hits.hits.map(function (hit) {
        var x = (new Date(hit._source.timestamp)).getTime(), // current time
          y = hit._source.last;
        hits.push([x, y]);
      })

      // Highchart expects data to be sorted
      hits = hits.sort();
      chart.series[0].setData(hits)

      appbaseRef.searchStream(requestObject).on('data', function (stream) {
        var x = (new Date()).getTime(), // current time
          y = stream._source.last
        hits.push([x, y])
        chart.series[0].setData(hits)
      }).on('error', function (error) {
        console.log("<br>Stream error: ", JSON.stringify(error))
      });
    }).on('error', function (error) {
      console.log("<br>Search error: ", JSON.stringify(error))
    });
  },
  render: function () {
    return <ReactHighstock ref = "stockchart"
      config = {chartConfig}
      />
  }
});
module.exports = BitcoinChart;
```    


* Line 3: The **componentDidMount** method is invoked once similar to the getInitialState, but only after the initial rendering of the component. 
* Line 5-16, we use search on Appbase to fetch the historical data. We use the request body we created above.
* Line 18–29, we use Appbase’s searchStream to fetch the new realtime results and then display it on the Highchart.
* Line 30–35, we define the **render()** method which is a mandatory method for each component. Here we render ReactHighStock component of Highcharts.

Next, we will create Stats.js — a React component for displaying the real-time price updates.

```javascript   
var React = require("react");
var appbaseRef = require("./appbase").appbaseRef;
var config = require("./appbase").config;

// Request object for fetching the last record
var requestObject = {
  type: config.type,
  body: {
    size: 1,
    query: {
      match_all: {}
    },
    sort: {
      timestamp: "desc"
    }
  }
};

var Stats = React.createClass({

  getInitialState: function () {
    return {
      bid: "0",
      last: "0",
      avg: "0",
      total: "0",
      ask: "0"
    };
  },
  componentDidMount: function () {
    var self = this;
    appbaseRef.search(requestObject).on('data', function (res) {
      // We fetch the last price data here, it will be returned in the res.hits.hits array
      self.updatePrice(res.hits.hits[0]._source);
      appbaseRef.searchStream(requestObject).on('data', function (stream) {
        // We subscribe to the last price value via searchStream method
        self.updatePrice(stream._source);
      }).on('error', function (error) {
        console.log('Error in streaming: ', error);
      });
    })
  },
  updatePrice: function (data) {
    this.setState({ bid: data.bid });
    this.setState({ last: data.last });
    this.setState({ avg: data['24h_avg'] });
    this.setState({ total: data.total_vol });
    this.setState({ ask: data.ask });
    this.props.onPriceChange(data);
  },
  render: function () {
    return (
      <div className="row text-center">
        <div className="col-md-12">
          <p className="label-text">BID</p>
          <div id="odometer" className="odometer odometer-theme-digital">
            {this.state.bid}
          </div>
          <br /><br />
        </div>
        <div className="col-md-6">
          <p className="label-text">LAST</p>
          <p className="val" id="avg">{this.state.last}</p>
        </div>
        <div className="col-md-6">
          <p className="label-text">AVG OF 24 HRS</p>
          <p className="val" id="avg">{this.state.avg}</p>
        </div>
        <div className="col-md-6">
          <p className="label-text">TOTAL</p>
          <p className="val" id="avg">{this.state.total}</p>
        </div>
        <div className="col-md-6">
          <p className="label-text">ASK</p>
          <p className="val" id="avg">{this.state.ask}</p>
        </div>
        <h5> <i className="spinner"> </i> Listening</h5>
      </div>
    )
  }
});
module.exports = Stats;
```    

* Line 5–17, we define a JSON query for retrieving the last price value from appbase.io
* Line 21–29: Inside **getInitialState,** we can set the initial state. The getInitialState method is like component’s constructor is called once at invocation
* Line 30–41: The **componentDidMount** method is invoked once similar to the getInitialState, but only after the initial rendering of the component. We use this method to subscribe to realtime price changes
* Particularly in line 32, we call the [search()](http://docs.appbase.io/scalr/javascript/apireference.html#javascript-api-reference-getting-data-search) method with the JSON query object defined earlier to get the last stored bitcoin price in the db.
* And in line 35-37, we subscribe to the last price query using the [searchStream()](http://docs.appbase.io/scalr/javascript/api-reference.html#javascript-api-reference-streaming-data-searchstream) method and update the state every time we receive a **new data** event.
* Inside the price **updatePrice()** method, we set the onPriceChange props as passed to the Stats Component inside Bitcoin Component’s Render method. This allows the parent component to react to the price change event in it’s own way.
* We will define the **render()** method from lines 51–81. This is a mandatory method for each component. Each component is a UI widget, hence it should return an HTML DOM markup that specifies the UI. It’s more powerful than an HTML markup because you can use any component specific **state** and **props** values before returning the markup.

Let us now look into how we can use this component.

### Step 3: Using the component

Next, we will add the following code in the index.html. We are using odometer style.
    

```html   
<!DOCTYPE html>
<html lang="en">

<head>
  <title>React starter</title>
  <link rel="stylesheet" href="css/bundle.css" />
  <link rel="stylesheet" href="http://github.hubspot.com/odometer/themes/odometer-theme-digital.css" />
  <script src="http://github.hubspot.com/odometer/odometer.js"></script>
  <script src="https://rawgit.com/appbaseio/appbase-js/master/browser/appbase.js" type="text/javascript"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/spinkit/1.2.5/spinkit.min.css">
</head>

<body>
  <div class="container container-table">
    <div class="row vertical-center-row">
      <div class="col-sm-12 col-md-6 col-md-offset-3" id="bitcoin">

      </div>
    </div>
  </div>
  <script src="scripts/bundle.js"></script>
</body>

</html>
```    

Add style.css in css folder:    

```css   
.odometer {
  font-size: 50px;
}

.odometer {
  font-size: 50px;
  position: fixed;
  border-radius: 5px;
  border: .1em solid rgba(139, 245, 165, 0.4);
  border-top-width: 0.1em;
  border-right-width: 0.1em;
  border-bottom-width: 0.1em;
  border-left-width: 0.1em;
  border-top-style: solid;
  border-right-style: solid;
  border-bottom-style: solid;
  border-left-style: solid;
  border-top-color: rgba(139, 245, 165, 0.4);
  border-right-color: rgba(139, 245, 165, 0.4);
  border-bottom-color: rgba(139, 245, 165, 0.4);
  border-left-color: rgba(139, 245, 165, 0.4);
  -moz-border-top-colors: none;
  -moz-border-right-colors: none;
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  border-image-source: none;
  border-image-slice: 100% 100% 100% 100%;
  border-image-width: 1 1 1 1;
  border-image-outset: 0 0 0 0;
  border-image-repeat: stretch stretch;
}

.btn {
  width: 100%;
  display: inline-block;
  ;
  margin: 0.5%;
}

.bid-center {
  margin-left: 35%;
  margin-top: 5%;
  margin-bottom: 5%;
}

.max {
  width: 100%;
}

.stats {
  margin-top: 5%;
}

.label-text {
  font-family: "Wallpoet", monospace;
  font-size: 20px;
}

p {
  font-size: 30px;
}

html,
body,
.container-table {
  height: 100%;
}

.container-table {
  display: table;
}

.vertical-center-row {
  display: table-cell;
  vertical-align: middle;
}

.spinner {
  width: 15px !important;
  height: 15px !important;
  display: inline-block;
  border-radius: 100%;
  background-color: black;
  -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
  animation: sk-scaleout 1.0s infinite ease-in-out;
}

@-webkit-keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0)
  }
  100% {
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}

@keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
    opacity: 0;
  }
}
```    

Now we will add a div for rendering the status update text inside the container div with id bitcoin we created above as shown in the snippet here.

We’re ready to render all this on the browser. It looks something like this:

![](https://cdn-images-1.medium.com/max/800/1*hC9ppEkWdUsCj9Ipq-fO4g.gif)

## Poll Bitcoin prices using AWS Lambda

We have real-time interface of Bitcoin price in place, where user can see the last bid, average price, etc. Now, we will work on the polling aspect which tracks the Bitcoin price changes.

### Step 4: Setup Credentials

The first thing we need to do is create the project and all the files we need. Let’s start by creating a new directory that we’ll call “aws-lambda-polling”. We’ll put all the files that we will need to run on server side in this new folder.
```    
aws-lambda-polling/
|_ _ _ _ index.js
|_ _ _ _ config.json
|_ _ _ _ package.json
```    
The above shows how our final directory structure would look. Let’s initialize all these files for later ease of access.
```    
touch app.js
touch config.json
touch package.json
```    
In Node, the package.json file holds the configuration for our app. Node’s package manager (npm) will use this to install any dependencies or modules that we are going to use. We will update package.json with the following json:

```javascript   
{
  "name": "bitcoin-price-alert-backend",
  "main": "index.js",
  "dependencies": {
    "async": "^2.0.0-rc.5",
    "request": "^2.72.0"
  }
}
```    

and then we will install the dependencies by running the following command inside the folder:
```    
npm install
```    
Next, we will update config.json with the same appbase.io credential as the earlier config we created in the frontend. We will add the **appname** along with it’s **username** and **password **credentials as shown below:

```javascript   
{
  "appname": "your_app_name",
  "username": "app_username",
  "password": "app_password",
  "type": "index_type"
}
```    

### Step 5: Poll for bitcoin prices

We will be using AWS Lambda for polling bitcoin APIs for live data which we will then insert into Appbase which provides streaming interface. 

[AWS Lambda](https://aws.amazon.com/lambda/) combines a robust event infrastructure with a simple deployment model. It lets you write small NodeJS functions that will be called with the event metadata from events triggered by various services or through your own code. One of the benefits of Lambda is that you don’t have to scale your Lambda functions as usage increases, AWS does this for you. You pay only for the compute time you consume - there is no charge when your code is not running which makes it pretty good for our use-case. Also, first 1 million requests per month are free. More about aws lambda pricing [here](https://aws.amazon.com/lambda/pricing/). You can follow up with this article with the free tier but for using Lambda(or any AWS services), you will have to enter your credit card details. 


Now let us write code for polling Bitcoin API at regular interval which we will host on AWS Lambda.

```javascript   
var async = require("async"),
  request = require('request'),
  config = require('./config.json');

var prevTimestamp;
// the 'handler' that lambda calls to execute our code
exports.handler = function (event, context) {

  var data;
  var url = 'https://api.bitcoinaverage.com/ticker/USD/';

  async.waterfall([

    function (callback) {

      // Make a request to bitcoin API for current price
      request(url, function (error, response, body) {
        if (!error && response != undefined && response.statusCode == 200) {
          data = JSON.parse(body);
          callback(null);
        } else {
          console.log("Got an error: ", error, ", status code: ", response.statusCode);
        }
      });

    },

    function (callback) {

      // Convert the datetime to the unix timestamp
      data.timestamp = (new Date(data.timestamp)).getTime();
      if (prevTimestamp == data.timestamp)
        return;
      else
        prevTimestamp = data.timestamp;

      // Index the data into Appbase
      request({
        url: 'http://scalr.api.appbase.io/' + config.appname + '/' + config.type, //URL to hit
        headers: {
          Authorization: 'Basic ' + new Buffer(config.username + ':' + config.password).toString('base64')
        },
        json: data,
        method: 'POST' //Specify the method
      }, function (error, response, body) {
        if (error) {
          console.log(error);
        } else {
          callback(null, 'done');
        }
      });

    }

    // optional callback for results
  ], function (err, result) {
    if (err) context.done(err, "Error!!");
    if (!err) context.done(null, "Success!");
  });

};
```    
In the above code, we exported handler function which will be executed by lambda. Inside the function, we make a request to [Bitcoin API](https://api.bitcoinaverage.com/ticker/USD/) and then index it to Appbase.     

### Step 6: Uploading

Deploying to Lambda is as simple as zipping up all your code and calling an api function or cli command and pushing the zip file to Lambda. Lambda then starts the node VM and calls the node function based on your triggers.

Create a new Lambda microservice by selecting AWS Lambda from the Services tab in the console, or go [here](https://console.aws.amazon.com/lambda/home?region=us-east-1) (link to US East N.Virginia again).

To interact with Lambda functions you can either use the handy-dandy AWS Lambda (web) console or the AWS CLI. For this demo we are going to create and run a Lambda function uisng the web console. It’s just easier for the demo. Here are the steps:

- Zip all your files in your aws-lambda-polling folder including the node_modules
- Go to AWS lambda page and click on get started. This will bring you to the lambda console.
- Click on the new lambda function and select the lambda-canary blueprint which is template for running the function at regular interval. 
- In the configure event source, name the rule name and schedule expression which will define at what interval you want your function to be triggered. In our example, we will keep that as 1 minute. So our bitcoin prices will be updated every minute. Click next.
- In the next screen, we will give name to our function as bitcoinPoller.  We will select Node.js as our runtime and then inside the the Lambda function code, we will click on Upload a zip file and then select the zip folder we created in step 5.
- Now define your handler in Lambda function handler and role section. Handler is defined as [name_of_your_file.functionName]. In our case it will be **index.handler**.
- Now create the basic execution role option for the Role by just following that through with the defaults. This will allow your AWS Lambda function to have permissions to execute the function. Once this is created and you’re taken back to the AWS Lambda creating screen, select the role you just created (the default name is something like basic_execution_rule). Click next.

![](https://cdn-images-1.medium.com/max/800/1*6CKbrd0dicYNW8RYUtUnwQ.gif)

Now in the Review step, select enable the event source. It will start our event source which triggers our Lambda function at every 1 minute. Click on Create function.

![](https://i.imgur.com/FlOWbNe.png)

Now your lambda function will be executed every one minute and you will see the window like this on next page:

![](https://camo.githubusercontent.com/98d41c99fc39847ef1933d752cb5a47b64d0d8a0/68747470733a2f2f692e696d6775722e636f6d2f744d6e355945392e706e67)


Here is the link to the repository if you don’t want to copy paste from here and
clone directly:

Bitcoin component demo —
[http://appbaseio-apps.github.io/bitcoin-react-component/dist/](http://appbaseio-apps.github.io/bitcoin-react-component/dist/)

Bitcoin component code —
[https://github.com/appbaseio-apps/bitcoin-react-component](https://github.com/appbaseio-apps/bitcoin-react-component)

Backend module —
[https://github.com/yashshah/aws-lambda-polling](https://github.com/yashshah/aws-lambda-polling)
