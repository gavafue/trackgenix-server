import EmployeeSchema from '../models/Employees';

const getAllEmployee = async (req, res) => {
    try {
        let employeeAll = 0;
        if (req.query) {
            employeeAll = await EmployeeSchema.find(req.query)
            if (employeeAll === 0) {
                return res.status(404).json({
                    msg: 'no hay nada',
                    data: undefined,
                    error: true,
                });
            }
        }
        else { employeeAll = EmployeeSchema.find({}); }
        return res.status(200).json({
            msg: 'The list has been successfully retrieved',
            data: employeeAll,
            error: false,
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Error',
            data: undefined,
            error: true,
        });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        if (req.params.id) {
            const employee = await EmployeeSchema.findById(req.params.id);
            return res.status(200).json({
                msg: `This employee with ID ${req.params.id} has been found`,
                data: employee,
                error: false,
            });
        }
        return res.status(404).json({
            msg: `This time Sheet with ID ${req.params.id} does not exist`,
            data: undefined,
            error: true,
        });
    } catch (error) {
        return res.json({
            msg: 'error',
            data: undefined,
            error: true,
        });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        if (req.params.id) {
            const employee = await EmployeeSchema.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                msg: `This employee with ID ${req.params.id} has been eliminated`,
                data: employee,
                error: false,
            });
        }
        return res.status(404).json({
            msg: 'this id no se borro',
            data: undefined,
            error: true,
        });
    } catch (error) {
        return res.json({
            msg: 'error',
            data: undefined,
            error: true,
        });
    }
};

export default {
  getAllEmployee,
  getEmployeeById,
  deleteEmployee,
};