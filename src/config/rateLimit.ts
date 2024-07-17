import { Ratelimit } from '@upstash/ratelimit'

import redis from './radishDB'

const rateLimit = new Ratelimit({
    redis : redis,
    limiter : Ratelimit.fixedWindow(14 , "1 m")
})

export default rateLimit;