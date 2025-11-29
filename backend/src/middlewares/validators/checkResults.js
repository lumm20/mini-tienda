import { validationResult} from "express-validator";
import AppError from "../../utils/AppError.js";

export const checkResults = (req, res, next) => {
  const errors = validationResult(req);

  //si se detectaron errores en la validacion
  if (!errors.isEmpty()) {
    //formateer los errores para extraer solo el mensaje del error
    const resFormatted = errors.formatWith(err => err.msg);
    console.log('Formatted errors:', resFormatted);
    //se lanza un error para que se capture en el middleware del errorHandler
    throw new AppError('Los datos ingresados son inválidos',400, resFormatted.array());
  }

  next();
};