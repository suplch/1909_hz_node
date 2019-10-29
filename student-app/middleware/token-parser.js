const jwt = require('jsonwebtoken');


let whiteList = [
    '/login',
    '/students'
];

function matchWhiteList(url) {
    for (let item of whiteList) {
        if (url.startsWith(item)) {
            return true;
        }
    }
    return false;
}

module.exports = function () {

    return function (req, res, next) {
        console.log(req.url);

        if (matchWhiteList(req.url)) {
            next();
        } else {
            jwt.verify(req.cookies.token, 'abcdefg', async function (err, user) {
                if (err) {
                    res.send({
                        ok: false,
                        msg: 'token 校验失败'
                    });
                    return;
                }

                next();
            });
        }
    };

}
