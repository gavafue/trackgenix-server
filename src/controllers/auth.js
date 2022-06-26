import firebase from '../helper/firebase/index';
import Employees from '../models/Employees';

const employeeSignUp = async (req, res) => {
  try {
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'EMPLOYEE' });

    const userCreated = new Employees({
      email: req.body.email,
      firebaseUid: newFirebaseUser.uid,
    });
    const userSaved = await userCreated.save();
    return res.status(201).json({
      message: 'User created!',
      data: userSaved,
    });
  } catch (error) {
    if (firebaseUid) {
      await firebase.auth().deleteUser(firebaseUid);
    }
    return res.status(400).json({ message: error.toString() });
  }
};

export default { employeeSignUp };
