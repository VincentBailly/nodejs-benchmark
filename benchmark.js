child_process = require('child_process');
now = require('perf_hooks').performance.now;
fs = require('fs');

let scenarioName = process.argv[2];

scenarios = {}


scenarios['perf measurement'] = function() {
    now = require('perf_hooks').performance.now;
    ti = now();
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['empty function declaration'] = function() {
    now = require('perf_hooks').performance.now;
    ti = now();
    function foo() {}
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['empty for loop of 1000 iterations'] = function() {
    now = require('perf_hooks').performance.now;
    ti = now();
    for (let i = 0; i < 1000; i++) {}
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['create 1000 empty objects'] = function() {
    now = require('perf_hooks').performance.now;
    ti = now();
    for (let i = 0; i < 1000; i++) {
        let a = {}
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['create 10000 empty objects'] = function() {
    now = require('perf_hooks').performance.now;
    ti = now();
    for (let i = 0; i < 10000; i++) {
        let a = {}
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['create 100000 empty objects'] = function() {
    now = require('perf_hooks').performance.now;
    ti = now();
    for (let i = 0; i < 100000; i++) {
        let a = {}
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['create 1000000 empty objects'] = function() {
    now = require('perf_hooks').performance.now;
    ti = now();
    for (let i = 0; i < 1000000; i++) {
        let a = {}
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['create 10000000 empty objects'] = function() {
    now = require('perf_hooks').performance.now;
    ti = now();
    for (let i = 0; i < 10000000; i++) {
        let a = {}
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['call 1000000 times an empty function'] = function() {
    now = require('perf_hooks').performance.now;
    function noop() {}
    ti = now();
    for (let i = 0; i < 1000000; i++) {
        noop();
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['create 1 million times the same string'] = function() {
    now = require('perf_hooks').performance.now;
    let str;
    ti = now();
    for (let i = 0; i < 1000000; i++) {
        str = 'hello world';
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['iterate 1 million times in an empty for-loop'] = function() {
    now = require('perf_hooks').performance.now;
    ti = now();
    for (let i = 0; i < 1000000; i++) {
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['create 1 million empty arrays'] = function() {
    now = require('perf_hooks').performance.now;
    let arr = []
    // store the result in an array to be sure they are
    // not garbage collected
    // initialize the array to store them so it does not count
    // in the measurement
    for (let i = 0; i < 1000000; i++) {
        arr.push(undefined);
    }
    ti = now();
    for (let i = 0; i < 1000000; i++) {
        arr[i] = []
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['create 1 million empty objects'] = function() {
    now = require('perf_hooks').performance.now;
    let arr = []
    // store the result in an array to be sure they are
    // not garbage collected
    // initialize the array to store them so it does not count
    // in the measurement
    for (let i = 0; i < 1000000; i++) {
        arr.push(undefined);
    }
    ti = now();
    for (let i = 0; i < 1000000; i++) {
        arr[i] = {}
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['fill an array with 1 million integers'] = function() {
    now = require('perf_hooks').performance.now;
    let arr = []
    ti = now();
    for (let i = 0; i < 1000000; i++) {
        arr.push(1)
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['fill a linked-list with 1 million integers'] = function() {
    now = require('perf_hooks').performance.now;
    let arr = { };
    ti = now();
    for (let i = 0; i < 1000000; i++) {
        arr.next = {value : 1}
        arr = arr.next;
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['assign 1 million times a variable'] = function() {
    now = require('perf_hooks').performance.now;
    let variable;
    ti = now();
    for (let i = 0; i < 1000000; i++) {
        variable = 1;
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['assign 1 million times a variable with eval()'] = function() {
    now = require('perf_hooks').performance.now;
    let variable;
    ti = now();
    let code = 'variable = 1';
    for (let i = 0; i < 1000000; i++) {
        eval(code);
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['assign 1 million times a variable with a function call'] = function() {
    now = require('perf_hooks').performance.now;
    let variable;
    ti = now();
    let fn = function () {variable = 1 }
    for (let i = 0; i < 1000000; i++) {
        fn();
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['assign 1 million times a variable with a lambda function call'] = function() {
    now = require('perf_hooks').performance.now;
    let variable;
    ti = now();
    let fn =  () => {variable = 1 }
    for (let i = 0; i < 1000000; i++) {
        fn();
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
}
scenarios['10000 empty iterations with callbacks'] = function() {
    now = require('perf_hooks').performance.now;
    let i = 0;
    let ti = now();
    function callback() {
        if (++i === 10000) {
            tf = now();
            process.stdout.write((tf-ti).toString());
        } else {
            callback()
        }
    }
    callback();
}
scenarios['10000 empty iterations with process.nextTick()'] = function() {
    now = require('perf_hooks').performance.now;
    let i = 0;
    let ti = now();
    function callback() {
        if (++i === 10000) {
            tf = now();
            process.stdout.write((tf-ti).toString());
        } else {
            process.nextTick(callback)
        }
    }
    process.nextTick(callback);
}
scenarios['10000 empty iterations with setImmediate'] = function() {
    now = require('perf_hooks').performance.now;
    let i = 0;
    let ti = now();
    function callback() {
        if (++i === 10000) {
            tf = now();
            process.stdout.write((tf-ti).toString());
        } else {
            setImmediate(callback)
        }
    }
    setImmediate(callback);
}
scenarios['10000 empty iterations with promise.then()'] = function() {
    now = require('perf_hooks').performance.now;
    let i = 0;
    let ti = now();
    let p = Promise.resolve();
    function callback() {
        if (++i === 10000) {
            tf = now();
            process.stdout.write((tf-ti).toString());
        } else {
            p.then(callback)
        }
    }
    p.then(callback);
}
scenarios['read 1000 files of size 7Kb serially'] = function () {
    now = require('perf_hooks').performance.now;
    fs = require('fs');
    fs.rmSync('test-files', { force: true, recursive: true });
    fs.mkdirSync('test-files');
    const buff = Buffer.allocUnsafe(1024 * 7);
    for (let i = 0; i < 1000; i++) {
        fs.writeFileSync(`test-files/file-${i}`, buff);
    }
    ti = now();
    for (let i = 0; i < 1000; i++) {
        fs.readFileSync(`test-files/file-${i}`);
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
    fs.rmSync('test-files', { force: true, recursive: true });
}
scenarios['read 100000 files of size 7Kb serially'] = function () {
    now = require('perf_hooks').performance.now;
    fs = require('fs');
    fs.rmSync('test-files', { force: true, recursive: true });
    fs.mkdirSync('test-files');
    const buff = Buffer.allocUnsafe(1024 * 7);
    for (let i = 0; i < 100000; i++) {
        fs.writeFileSync(`test-files/file-${i}`, buff);
    }
    ti = now();
    for (let i = 0; i < 100000; i++) {
        fs.readFileSync(`test-files/file-${i}`);
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
    fs.rmSync('test-files', { force: true, recursive: true });
}
scenarios['read 1000 files of size 7Kb async'] = function () {
    now = require('perf_hooks').performance.now;
    fs = require('fs');
    fs.rmSync('test-files', { force: true, recursive: true });
    fs.mkdirSync('test-files');
    const buff = Buffer.allocUnsafe(1024 * 7);
    for (let i = 0; i < 1000; i++) {
        fs.writeFileSync(`test-files/file-${i}`, buff);
    }
    let j = 0;
    function done() {
        if ( ++j === 1000) {
            tf = now();
            process.stdout.write((tf-ti).toString());
            fs.rmSync('test-files', { force: true, recursive: true });
        }
    }
    ti = now();
    for (let i = 0; i < 1000; i++) {
        fs.readFile(`test-files/file-${i}`, done);
    }
}
scenarios['write 1000 files of size 7Kb serially'] = function () {
    now = require('perf_hooks').performance.now;
    fs = require('fs');
    fs.rmSync('test-files', { force: true, recursive: true });
    fs.mkdirSync('test-files');
    const buff = Buffer.allocUnsafe(1024 * 7);
    ti = now();
    for (let i = 0; i < 1000; i++) {
        fs.writeFileSync(`test-files/file-${i}`, buff);
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
    fs.rmSync('test-files', { force: true, recursive: true });
}
scenarios['write 1000 files of size 7Kb async'] = function () {
    now = require('perf_hooks').performance.now;
    fs = require('fs');
    fs.rmSync('test-files', { force: true, recursive: true });
    fs.mkdirSync('test-files');
    const buff = Buffer.allocUnsafe(1024 * 7);
    let j = 0;
    function done() {
        if ( ++j === 1000) {
            tf = now();
            process.stdout.write((tf-ti).toString());
            fs.rmSync('test-files', { force: true, recursive: true });
        }
    }
    ti = now();
    for (let i = 0; i < 1000; i++) {
        fs.writeFile(`test-files/file-${i}`, buff, done);
    }
}
scenarios['write 10000 files of size 7Kb serially'] = function () {
    now = require('perf_hooks').performance.now;
    fs = require('fs');
    fs.rmSync('test-files', { force: true, recursive: true });
    fs.mkdirSync('test-files');
    const buff = Buffer.allocUnsafe(1024 * 7);
    ti = now();
    for (let i = 0; i < 10000; i++) {
        fs.writeFileSync(`test-files/file-${i}`, buff);
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
    fs.rmSync('test-files', { force: true, recursive: true });
}
scenarios['write 10000 files of size 7Kb async'] = function () {
    now = require('perf_hooks').performance.now;
    fs = require('fs');
    fs.rmSync('test-files', { force: true, recursive: true });
    fs.mkdirSync('test-files');
    const buff = Buffer.allocUnsafe(1024 * 7);
    let j = 0;
    function done() {
        if ( ++j === 10000) {
            tf = now();
            process.stdout.write((tf-ti).toString());
            fs.rmSync('test-files', { force: true, recursive: true });
        }
    }
    ti = now();
    for (let i = 0; i < 10000; i++) {
        fs.writeFile(`test-files/file-${i}`, buff, done);
    }
}
scenarios['write 100000 files of size 7Kb serially'] = function () {
    now = require('perf_hooks').performance.now;
    fs = require('fs');
    fs.rmSync('test-files', { force: true, recursive: true });
    fs.mkdirSync('test-files');
    const buff = Buffer.allocUnsafe(1024 * 7);
    ti = now();
    for (let i = 0; i < 100000; i++) {
        fs.writeFileSync(`test-files/file-${i}`, buff);
    }
    tf = now();
    process.stdout.write((tf-ti).toString());
    fs.rmSync('test-files', { force: true, recursive: true });
}
scenarios['write 100000 files of size 7Kb async'] = function () {
    now = require('perf_hooks').performance.now;
    fs = require('fs');
    fs.rmSync('test-files', { force: true, recursive: true });
    fs.mkdirSync('test-files');
    const buff = Buffer.allocUnsafe(1024 * 7);
    let j = 0;
    function done() {
        if ( ++j === 100000) {
            tf = now();
            process.stdout.write((tf-ti).toString());
            fs.rmSync('test-files', { force: true, recursive: true });
        }
    }
    ti = now();
    for (let i = 0; i < 100000; i++) {
        fs.writeFile(`test-files/file-${i}`, buff, done);
    }
}
scenarios['write 100000 files of size 7Kb async with limit of 1000'] = function () {
    now = require('perf_hooks').performance.now;
    fs = require('fs');
    fs.rmSync('test-files', { force: true, recursive: true });
    fs.mkdirSync('test-files');
    const buff = Buffer.allocUnsafe(1024 * 7);
    let j = 0;
    let started = 0;
    function done() {
        if ( ++j === 100000) {
            tf = now();
            process.stdout.write((tf-ti).toString());
            fs.rmSync('test-files', { force: true, recursive: true });
        } else {
            if (started < 100000 && j - started < 1000) {
                started++;
                fs.writeFile(`test-files/file-${started}`, buff, done);
            }
        }
    }
    ti = now();
    for (let i = 0; i < 1000; i++) {
        started++;
        fs.writeFile(`test-files/file-${i}`, buff, done);
    }
}
scenarios['write 100000 files of size 7Kb async with limit of 100'] = function () {
    now = require('perf_hooks').performance.now;
    fs = require('fs');
    fs.rmSync('test-files', { force: true, recursive: true });
    fs.mkdirSync('test-files');
    const buff = Buffer.allocUnsafe(1024 * 7);
    let j = 0;
    let started = 0;
    function done() {
        if ( ++j === 100000) {
            tf = now();
            process.stdout.write((tf-ti).toString());
            fs.rmSync('test-files', { force: true, recursive: true });
        } else {
            if (started < 100000 && j - started < 100) {
                started++;
                fs.writeFile(`test-files/file-${started}`, buff, done);
            }
        }
    }
    ti = now();
    for (let i = 0; i < 100; i++) {
        started++;
        fs.writeFile(`test-files/file-${i}`, buff, done);
    }
}
scenarios['write 100000 files of size 7Kb async with limit of 10000'] = function () {
    now = require('perf_hooks').performance.now;
    fs = require('fs');
    fs.rmSync('test-files', { force: true, recursive: true });
    fs.mkdirSync('test-files');
    const buff = Buffer.allocUnsafe(1024 * 7);
    let j = 0;
    let started = 0;
    function done() {
        if ( ++j === 100000) {
            tf = now();
            process.stdout.write((tf-ti).toString());
            fs.rmSync('test-files', { force: true, recursive: true });
        } else {
            if (started < 100000 && j - started < 10000) {
                started++;
                fs.writeFile(`test-files/file-${started}`, buff, done);
            }
        }
    }
    ti = now();
    for (let i = 0; i < 10000; i++) {
        started++;
        fs.writeFile(`test-files/file-${i}`, buff, done);
    }
}
scenarios['write 100000 files of size 7Kb async promise with limit of 1000'] = function () {
    now = require('perf_hooks').performance.now;
    fs = require('fs');
    fs.rmSync('test-files', { force: true, recursive: true });
    fs.mkdirSync('test-files');
    const buff = Buffer.allocUnsafe(1024 * 7);
    let j = 0;
    let started = 0;
    function done() {
        if ( ++j === 100000) {
            tf = now();
            process.stdout.write((tf-ti).toString());
            fs.rmSync('test-files', { force: true, recursive: true });
        } else {
            if (started < 100000 && j - started < 1000) {
                started++;
                fs.promises.writeFile(`test-files/file-${started}`, buff).then(done);
            }
        }
    }
    ti = now();
    for (let i = 0; i < 1000; i++) {
        started++;
        fs.promises.writeFile(`test-files/file-${i}`, buff).then(done);
    }
}



scenario = scenarios[scenarioName];
if (!scenario) { console.error('wrong scenario name'); process.exit(1); }

let scenarioCode = scenario.toString();
scenarioCode = scenarioCode.split('\n').slice(1, -1).join('\n');

fs.writeFileSync('tmp.js', scenarioCode);

result = []
duration = parseInt(process.env['dur'])
loops = parseInt(process.env['loops'])

for (let j = 0; j < loops; j++) {
    cp = child_process.spawnSync('node', ['tmp.js']);
    err = cp.stderr.toString()
    output = cp.stdout.toString()
    if (process.env['debug']) {
        console.log({err, output});
        process.exit();
    }
    duration = parseFloat(output)

    result.push(duration);
}

fs.rmSync('tmp.js')

const percentiles = getPercentiles(result);

let report = `

${(new Date()).toDateString()}
${(new Date()).toTimeString()}

Scenario: "${scenarioName}"
Env:
  - loops: ${loops}
Percentiles:
  - p10: ${percentiles[0]}
  - p50: ${percentiles[1]}
  - p90: ${percentiles[2]}

Code:
\`\`\`
${scenarioCode}
\`\`\`
`

fs.appendFileSync('results.log', report);

console.log(percentiles)

function getPercentiles(result) {
    result.sort();
    let t10 = round(result[Math.floor(9 * loops / 100)])
    let t50 = round(result[Math.floor(49 * loops / 100)])
    let t90 = round(result[Math.floor(89 * loops / 100)])
    return [ t10, t50, t90];
}

function round(number) {
    function multiplyBy10(str) {
        if (/\./.test(str)) {
            return str.replace(/\.(.)/, '$1.').replace(/\.$/, '').replace(/^00/, '0');
        } else {
            return str + '0';
        }
    }
    function divideBy10(str) {
        if (/\./.test(str)) {
            return str.replace(/(.)\./, '.$1').replace(/^\./, '0.');
        } else {
            return str.replace(/(.)$/, '.$1').replace(/^\./, '0.').replace(/0$/,'');
        }
    }
    if (number === 0) { return '0' }
    if (number >= 10) { return multiplyBy10(round(number / 10)) }
    if (number < 1) { return divideBy10(round(number * 10)) }
    return number.toString().slice(0, 4).replace(/\.(0)*$/, '');
}
