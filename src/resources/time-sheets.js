/* GET */


const timeSheets = require('../data/time-sheets.json');

const gettimeSheetById = async (req, res) => {
    const id = req.params.id;
    const timeSheetFind = timeSheets.find(item => item.id == parseInt(id));

    console.log('timeSheetFind', timeSheetFind)

    if (!timeSheetFind) {
        res.json({
            msg: `This time Sheet with ID ${id} does not exist`
        })
    } res.json({
        data: timeSheetFind
    })

}
export {
    gettimeSheetById
}

/* EDIT / PUT */

