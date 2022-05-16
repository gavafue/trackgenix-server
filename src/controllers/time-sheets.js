import TimeSheetModel from '../models/Time-sheets';

const getTimeSheetById = async (req, res) => {
  try {
    if (req.params.id) {
      const timeSheet = await TimeSheetModel.findById(req.params.id);
      if (!timeSheet) {
        return res.status(404).json({
          msg: `The id ${req.params.id} does not exist`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        msg: 'The request was successful',
        data: timeSheet,
        error: false,
      });
    }
    return res.status(400).json({
      msg: 'Missing id parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.json({
      msg: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

// const deleteTimeSheet = async (req, res) => {
//   try {
//     if (!req.params.id) {
//       return res.status(400).json({
//         msg: 'Missing id parameter',
//         data: undefined,
//         error: true,
//       });
//     }
//     const result = await TimeSheetModel.findByIdAndDelete(req.params.id);
//     if (!result) {
//       return res.status(404).json({
//         msg: `The time sheet with id ${req.params.id} has not been found`,
//         data: undefined,
//         error: true,
//       });
//     }
//     return res.status(200).json({
//       msg: `The time sheet with ${req.params.id} has been successfully deleted`,
//       data: result,
//       error: false,
//     });
//   } catch (error) {
//     return res.json({
//       msg: `There was an error: ${error}`,
//       data: undefined,
//       error: true,
//     });
//   }
// };

export default {
  getTimeSheetById,
//   deleteTimeSheet,
};
