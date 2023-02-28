import Benchmark from "benchmark";
import database from "../database.js";
import CartIdNew from "./cart-id-new.js";
import CartIdOld from "./cart-id-old.js";
import CartRmPropNew from "./cart-rm-prop-new.js";
import CartRmPropOld from "./cart-rm-prop-old.js";
import CartPriceOld from "./cart-price-old.js";
import CartPriceNew from "./cart-price-new.js";

const suite = new Benchmark.Suite;

// suite
//     .add('Cart#cartIdUUID', function () {
//         new CartIdOld()
//     })
//     .add('Cart#cartIdCrypto', function () {
//         new CartIdNew()
//     })
//     .on('cycle', (event) => console.log(String(event.target)))
//     .on('complete', function() {
//         console.log(`Fastest is ${this.filter('fastest').map('name')}`)
//     })
//     .run()

const data = {
    products: [
        {
            id: 'ae',
            n: undefined,
            abc: undefined,
            a: null,
            b: 123
        },
        {
            id: 'ae',
            n: undefined,
            abc: undefined,
            a: null,
            b: 123
        }
    ]
}

// suite
//     .add('Cart#rmEmptyPropsMapReduce', function () {
//         new CartRmPropOld(data)
//     })
//     .add('Cart#rmEmptyPropsFor', function () {
//         new CartRmPropNew(data)
//     })
//     .on('cycle', (event) => console.log(String(event.target)))
//     .on('complete', function () {
//         console.log(`Fastest is ${this.filter('fastest').map('name')}`)
//     })
//     .run({ async: true })



suite
    .add('Cart#calcPriceMapReduce', function () {
        new CartPriceOld(database)
    })
    .add('Cart#calcPriceFor', function () {
        new CartPriceNew(database)
    })
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function () {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`)
    })
    .run({ async: true })