import 'express-async-errors'; // Deve ser o primeiro import de biblioteca
import express from 'express';
import { router } from './modules/index'; // Busca automaticamente o index.ts de modules
import { errorHandler } from './shared/middlewares/errorHandler';

const app = express();

// 1. Permite que a API receba JSON
app.use(express.json());

// 2. Importa todas as rotas da aplicação
app.use(router);

// 3. O Error Handler DEVE vir depois das rotas
// Se vier antes, ele não "escuta" os erros que acontecem nelas.
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});