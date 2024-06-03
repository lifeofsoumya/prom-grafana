import { NextFunction, Request, Response } from "express";
import client from "prom-client";

const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
})
const requestGauge = new client.Gauge({
    name: 'active_requests',
    help: 'Number of active requests'
})

export const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, ] // buckets of timings
});

export const requestMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    requestGauge.inc();

    req.on('end', ()=> {
        const endTime = Date.now();
        console.log('Req took ', endTime - startTime, ' ms')

        requestCounter.inc({
            method: req.method,
            route: req.route? req.route.path : req.path,
            status_code: req.statusCode
        })

        requestGauge.dec();

        httpRequestDurationMicroseconds.observe({ // observing for time to resolve the req on ending
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode
        }, endTime - startTime )
    })

    next();
}