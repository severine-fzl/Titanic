import { UserModel } from '../Models/User.js';

export async function CreateUserController(req, res) {
  const { firstName, lastName, email, password, password_confirm } = req.body;

  try {
    const newUser = await UserModel.createUser(firstName, lastName, email, password, password_confirm);
    await newUser.save()

    res.redirect('/login');
  } catch ({ message: errorMessage }) {
    console.log(errorMessage)
    return res.status(400).render('home', { errorMessage, values: req.body });
  }
}

export async function LoginUserController(req, res) {
  const { email, password } = req.body;

  try {
    const loggedUser = await UserModel.checkUserCredentials(email, password);

    // Saves user in session
    req.session.user = loggedUser;
    res.redirect('/dashboard');
  } catch (error) {
    res.redirect('/login');
  }
}