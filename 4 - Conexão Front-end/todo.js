const express = require("express");
const cors = require("cors");
require("./config/db");
const tarefasRoutes = require("./routes/todoRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Bem-vindo à API");
});

app.use("/tarefas", tarefasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor de tarefas rodando na porta ${PORT}`);
});
