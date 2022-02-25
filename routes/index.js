import { Router } from 'express';

//inizializzo router express
const router = Router();

//carico error handler
import { catchErrors } from '../handlers/error';

import { getHomePage } from './home';

//GET home page
router.get('/', catchErrors(getHomePage));

//esporto il modulo
export default router;
