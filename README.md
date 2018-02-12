## Project Setup and Deployment
```bash
# install Vue prerequisite
npm install
 
# deploy Vue APPs into Django project
npm run build-all
 
# install Django prerequisite
pip install -r ../requirements/requirements.txt
 
# make Vue assets files serveable through Django static files
python ../manage.py collectstatic
 
# start Django server
python ../manage.py runserver
```

## Build Setup
``` bash
# install dependencies
npm install
 
# list available APPs
npm run list
 
# run specific APP in development mode
npm run dev APP
 
# run all APPs in development mode
npm run start
 
# build specific APP for production and deploy in Django
npm run build APP
 
# build all APPs for production and deploy in Django
npm run build-all
 
# build specific APP for production and view the bundle analyzer report
npm run build APP --report
 
# run unit tests for all APPs
npm run unit
 
#run unit tests once for all APPs
npm run unit-single-run
 
# run e2e tests for specific APP
npm run e2e APP
 
# run unit tests for all APPs and e2e tests for specific APP
npm test APP
```

## Register new APP
### Create new instance in 'config/apps.env.js' under 'APPS_CONFIG'
#### Example
```javascript
// The name of the application
'example': {
    entry: {
        // The development main file
        app: './src/main-example.js'
    },
    dev: {
        // The development port to run application on
        port: 8085,
        // Whether the application should open a new tab upon start in development mode
        autoOpenBrowser: true
    },
    build: {
        // The production index file
        index: path.resolve(__dirname, '../../templates/index.html'),
        // The production folder for assets files
        assetsRoot: path.resolve(__dirname, '../../static/'),
        // The production folder for css and js files
        assetsSubDirectory: 'example',
        // The url to the production assets files
        assetsPublicPath: '/static/'
    }
}
```
The build section will be used to deploy the APP in the Django-Project  
'index' and 'assetsRoot' are folders on your computer.  
The 'assetsSubDirectory' will be created inside 'assetsRoot'.  
The 'assetsSubDirectory' will be appended to the 'assetsPublicPath', when accessed from the 'index' file.  
In this example the css and js files will be located in '../../static/example/' and the public url to those files will be '/static/example/[file-name]'

## Mock Data
### Indicate whether mock data should be used in 'config/[test/dev/prod].env.js'
```javascript
module.exports = merge(..., {
  NODE_ENV: ...,
  USE_MOCK_DATA: true //This indicates that mock data should be used
})
```
### The mock adapter can be found in 'src/classes/http/HttpAdapter.js'
### Example
```javascript
this.mock.onPost('http://localhost:8000/account/login/').reply(function (config) {
  return new Promise((resolve, reject) => {
    resolve([
      200,
      mockData
    ])
  })
})
```
This example indicates that on POST to 'http://localhost:8000/account/login/' the mock adapter should respond with status code 200 and the specified mock data  
The reply function takes one argument containing all information about the http-call ('config' in this example). This can be used to determine get-params/post-data e.g. config.params/config.data  
The URL can also be a regex e.g.
```javascript
let re = new RegExp('^http://localhost:8000/case/[0-9]+/$')
this.mock.onPost(re)
```

**Important**

When using regex as URL, make sure to include '^' and '$' for an exact match.

## Tests

### Dependencies

Include this in the top of each test
```javascript
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const copy = function (data) {
  return JSON.parse(JSON.stringify(data))
}
chai.should()
chai.use(sinonChai)
```
**Important**

Use copy if you want to manipulate Mock Data

### Syntax

##### Naming the Test

If you are writing a test for a Vue component, you should name it like so
```javascript
describe('-- Vue: nameOfComponent --', () => {...})
```
In the case of testing a class, you should simply replace 'Vue' with' Class like so
```javascript
describe('-- Class: nameOfClass --', () => {...})
```

##### Describe()

Each functionality you test should follow this convention
```javascript
describe(':: functionality ::', () => {...})
```
where 'functionality' is preferably a name of a function. IF it is a function,
add empty braces `()` after the name without any parameters even if they exist.


In case of a lot of tests in decision coverage, you might
want to describe branches. Do them like this
```javascript
describe('> BRANCH <', () => {...})
```
##### It()

Inside each functionality you test, there should be at least one `it()`
The name should describe what it is testing, for example
```javascript
it('should successfully get objects', () => {...})
it('should fail to get objects', () => {...})
```
In the above example, the test is clearly doing decision coverage.
'Successfully' and 'fail to' are examples, always name your test cases
so it is easy to understand what they are testing.

##### Matching values

When you want to see if two values are the same, use the 'match' assertion
from Sinon.js like so
```javascript
sinon.assert.match(true, false)
```
Since this will fail, Karma will tell you what the expected and actual values
are.
If you would use
```javascript
expect(true).to.equal(false)
```
Karma would give you an error message like this
```javascript
expected true to equal false
```
which can be hard to read when comparing objects.

**Important**

Do not use `expect` when comparing objects.

See [Sinon Matchers](http://sinonjs.org/releases/v1.17.7/matchers/) for
information on how to assert expects in a `spy()`

#### Frameworks

##### Sinon-Chai
[Spies, Stubs and Mocks of Sinon](https://jaketrent.com/post/sinon-spies-vs-stubs/)

[Assertions for Sinon-Chai](http://ricostacruz.com/cheatsheets/sinon-chai.html)

[Difference between assert, expect and should](https://stackoverflow.com/questions/21396524/what-is-the-difference-between-assert-expect-and-should-in-chai)

Note that you can negate any assertion with Chai's `.not`
E. g. for `notCalled` use `spy().not.called`.
