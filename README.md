



## On 2nd commit - metrics looks similar to this:

```
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",route="/metrics",status_code="null"} 3
http_requests_total{method="GET",route="/analytics",status_code="null"} 4

# HELP active_requests Number of active requests
# TYPE active_requests gauge
active_requests 1

# HELP http_request_duration_ms Duration of HTTP requests in ms
# TYPE http_request_duration_ms histogram
http_request_duration_ms_bucket{le="0.1",method="GET",route="/metrics",code="200"} 0
http_request_duration_ms_bucket{le="5",method="GET",route="/metrics",code="200"} 2
http_request_duration_ms_bucket{le="15",method="GET",route="/metrics",code="200"} 3
http_request_duration_ms_bucket{le="50",method="GET",route="/metrics",code="200"} 3
http_request_duration_ms_bucket{le="100",method="GET",route="/metrics",code="200"} 3
http_request_duration_ms_bucket{le="300",method="GET",route="/metrics",code="200"} 3
http_request_duration_ms_bucket{le="500",method="GET",route="/metrics",code="200"} 3
http_request_duration_ms_bucket{le="+Inf",method="GET",route="/metrics",code="200"} 3
http_request_duration_ms_sum{method="GET",route="/metrics",code="200"} 16
http_request_duration_ms_count{method="GET",route="/metrics",code="200"} 3
http_request_duration_ms_bucket{le="0.1",method="GET",route="/analytics",code="304"} 0
http_request_duration_ms_bucket{le="5",method="GET",route="/analytics",code="304"} 3
http_request_duration_ms_bucket{le="15",method="GET",route="/analytics",code="304"} 4
http_request_duration_ms_bucket{le="50",method="GET",route="/analytics",code="304"} 4
http_request_duration_ms_bucket{le="100",method="GET",route="/analytics",code="304"} 4
http_request_duration_ms_bucket{le="300",method="GET",route="/analytics",code="304"} 4
http_request_duration_ms_bucket{le="500",method="GET",route="/analytics",code="304"} 4
http_request_duration_ms_bucket{le="+Inf",method="GET",route="/analytics",code="304"} 4
http_request_duration_ms_sum{method="GET",route="/analytics",code="304"} 20
http_request_duration_ms_count{method="GET",route="/analytics",code="304"} 4
```

### --- All these work via cumulative timings 
- means for 0-0.1 resolve timing there are 0 requests
- for 0.1 to 5ms, 3-0 = 3 requests
- for 5 to 15ms, 4-3 = 1 request

### Our motive for prometheus 
- is to expose an endpoint /metrics with all the data like counter, gauge, histogram
