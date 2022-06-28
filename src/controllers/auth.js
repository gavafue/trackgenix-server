import firebase from '../helper/firebase/index';
import Employees from '../models/Employees';
import Admins from '../models/Admins';
import Superadmins from '../models/Super-admins';

const employeeSignUp = async (req, res) => {
  try {
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'EMPLOYEE' });

    const userCreated = new Employees({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      country: req.body.country,
      city: req.body.city,
      zip: req.body.zip,
      phone: req.body.phone,
      email: req.body.email,
      photo: req.body.photo,
      active: req.body.active,
      firebaseUid: newFirebaseUser.uid,
    });
    const userSaved = await userCreated.save();
    return res.status(201).json({
      message: 'User created!',
      data: userSaved,
    });
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
};

const adminSignUp = async (req, res) => {
  try {
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });

    const userCreated = new Admins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
      phone: req.body.phone,
      dateBirth: req.body.dateBirth,
      city: req.body.city,
      zip: req.body.zip,
      active: req.body.active,
      firebaseUid: newFirebaseUser.uid,
    });
    const userSaved = await userCreated.save();
    return res.status(201).json({
      message: 'User created!',
      data: userSaved,
    });
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
};

const superadminSignUp = async (req, res) => {
  try {
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'SUPERADMIN' });

    const userCreated = new Superadmins({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role,
      active: req.body.active,
      firebaseUid: newFirebaseUser.uid,
    });
    const userSaved = await userCreated.save();
    return res.status(201).json({
      message: 'User created!',
      data: userSaved,
    });
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
};

export default { employeeSignUp, adminSignUp, superadminSignUp };
