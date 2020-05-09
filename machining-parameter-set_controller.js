const machining_parameter_set_model = require('./machining-parameter-set_model');

// HELPERS
const machining_parameter_set_data = (req) => {
    let data = {
        tool_name: req.body.tool_name,
        material: req.body.material,
        cutting_speed: req.body.cutting_speed,
        feed_rate: req.body.feed_rate
    };
    return data;
};



// CREATE

const api_post_machining_parameter_set = (req, res, next) => {
    console.log('api_post_machining_parameter_set');
    let data = machining_parameter_set_data(req);

    let new_machining_parameter_set = machining_parameter_set_model(data);

    new_machining_parameter_set.save().then(() => {
        console.log(new_machining_parameter_set);
        res.send(JSON.stringify(new_machining_parameter_set));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};

// READ ALL

const api_get_machining_parameter_sets = (req, res, next) => {
    console.log('api_get_machining_parameter_sets');

    machining_parameter_set_model.find({})
        .lean()
        .then(machining_parameter_sets => {
            res.send(JSON.stringify(machining_parameter_sets));
        }).catch(err => {
            res.status(500);
            res.send(err.errmsg);
            console.log(err);
        });
};

// READ ONE

const api_get_machining_parameter_set = (req, res, next) => {
    console.log('api_get_machining_parameter_set');
    let id = req.params.id;
    machining_parameter_set_model.findById(id)
    .then(data => {
        res.send(JSON.stringify(data));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};


// UPDATE

//PUT /api/material/5e877016c4bd517bd8ef178a
const api_put_machining_parameter_set = (req, res, next) => {
    let id = req.params.id;
    let data = machining_parameter_set_data(req);

    machining_parameter_set_model.findByIdAndUpdate(id, data, {
        new: true
    }).then((machining_parameter_set) => {
        res.send(machining_parameter_set);
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};

// DELETE

// DELETE /api/material/5e877016c4bd517bd8ef178a
const api_delete_machining_parameter_set = (req, res, next) => {
    let id = req.params.id;
    // material_model.findOneAndDelete({
    //     name: id
    // }).then(() => {
    //     res.send();
    // }).catch(err => {
    //     res.status(500);
    //     res.send(err.errmsg);
    //     console.log(err);
    // });

    machining_parameter_set_model.findByIdAndRemove(id)
    .then(() => {
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};


// EXPORTS
module.exports.api_post_machining_parameter_set = api_post_machining_parameter_set;
module.exports.api_get_machining_parameter_sets = api_get_machining_parameter_sets;
module.exports.api_get_machining_parameter_set = api_get_machining_parameter_set;
module.exports.api_put_machining_parameter_set = api_put_machining_parameter_set;
module.exports.api_delete_machining_parameter_set = api_delete_machining_parameter_set;