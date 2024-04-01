const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require('jwks-rsa');
const envVariables = require('../../env-api-variables.json');

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: envVariables.jwksUri
    }),
    audience: envVariables.audience,
    issuer: envVariables.issuer,
    algorithms: ['RS256']
});

function getUserIdFromJwt(req){
    return req.user.sub;
}

module.exports = checkJwt;