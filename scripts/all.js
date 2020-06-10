// const buyK

function runBuyKenya() {
    require('./puppetv2');
}

function runPigiame () {
    require('./puppet')
}

setTimeout(() => {
    runBuyKenya();
}, 2000);

setTimeout(() => {
    runPigiame();
}, 4000);