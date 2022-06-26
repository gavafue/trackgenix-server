import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/Users';

const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userCreated = new Users({
      email: req.body.email,
      password: hashedPassword,
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

const login = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      throw new Error('Invalid user credentials');
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id
        },
        process.env.JWT_KEY,
        {
          expiresIn: '2h',
        },
      );
      const updatedUser = await Users.findOneAndUpdate(
        { email: req.body.email },
        { token },
        { new: true },
      );
      return res.status(200).json({
        message: 'User logged',
        data: {
          email: updatedUser.email,
          _id: updatedUser._id,
          token: updatedUser.token,
        },
      });
    }
    throw new Error('Invalid user credentials');
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
    });
  }
};

const logout = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_KEY);
    const user = await Users.findById(decoded.userId);
    if (!user) {
      throw new Error('Invalid user credentials');
    }
    const updatedUser = await Users.findOneAndUpdate(
      { token: '' },
      { new: true },
    );
    return res.status(200).json({
      message: 'Logged out successfully',
      data: {
        email: updatedUser.email,
        _id: updatedUser._id,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
    });
  }
};

export default { register, login, logout };
