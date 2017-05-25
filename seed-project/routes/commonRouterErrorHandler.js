/**
 * Created by supeng on 2017/5/20.
 */
module.exports = {
    twohundredResponds,
    fiveHundredErrorResponds,
    fourHundredErrorResponds,
    withFiveHundredError
};

function fiveHundredErrorResponds(res, err, title) {
    return res.status(500).json({
        title: title ||'An error occured',
        error: err
    });
}

function twohundredResponds(res, result, message) {
    res.status(201).json({
        message: message||'Success',
        obj: result
    });
}

function fourHundredErrorResponds(res, err, title){
    return res.status(401).json({
        title: title || 'Login failed',
        error: {message: error || 'Invalid login credentials'}
    })
}

function withFiveHundredError(res, err, title) {
    if (err) {
        fiveHundredErrorResponds(res, err, title);
    }
}
