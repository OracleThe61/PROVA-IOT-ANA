import db from "../config/db.js";

const getConsultas = async (req, res) => {
	try {
		const [resultado] = await db.query("SELECT id, tipoConsulta, horarioAgendado FROM consulta where ativo = 1");

		if(resultado.length === 0) {
			return res.status(404).json({ message: "Nenhuma Consulta encontrada" });
		}
		return res.status(200).json({ message: "Consultas encontradas", data: resultado });
	} catch (error) {
		return res.status(500).json({ message: "Erro ao buscar Consultas", error: error.message });
	}
};

//criar funçção editar
const editarConsulta = async (req, res) => {
	try {
		const [resultado] = await db.query("UPDATE consulta SET tipoConsulta = ?, horarioAgendado = ?, WHERE id = ?", [req.body.tipoConsulta, req.body.horarioAgendado, req.params.id]);

		if (resultado.affectedRows === 0) {  
			return res.status(404).json({ message: "Consulta não encontrada, tente novamente" });  
		}
		return res.status(200).json({ message: "Consulta editada com sucesso!", data: resultado });
	} catch (error) {
		return res.status(500).json({ message: "Erro ao editar Consulta!", error: error.message });
	}
}

//criar função deletar
const deletarConsulta = async (req, res) => {
	try {
		// const [resultado] = await db.query("UPDATE Consulta SET ativo = 0 WHERE id = ?", [req.params.id]);
		const [resultado] = await db.query("DELETE FROM consulta WHERE id = ?", [req.params.id]);

		if (resultado.affectedRows === 0) {  
			return res.status(404).json({ message: "Consulta não encontrada" });  
		}
		return res.status(200).json({ message: "Consulta deletada com sucesso", data: resultado });
	} catch (error) {
		return res.status(500).json({ message: "Erro ao deletar Consulta", error: error.message });
	}
}

// criar funcao adicionar
const adicionarConsulta = async (req, res) => {
    try {
		const [resultado] = await db.query("INSERT INTO consulta (tipoConsulta, horarioAgendado) VALUES (?, ?)", [req.body.tipoConsulta, req.body.horarioAgendado]);

		if(resultado.affectedRows === 0) {
			return res.status(404).json({ message: "Nenhum Consulta adicionada" });
		}

		return res.status(201).json({ message: "Consulta adicionada com sucesso", data: resultado });
	} catch (error) {
		return res.status(500).json({ message: "Erro ao adicionar Consulta", error: error.message });
	}
}

export {
    adicionarConsulta, deletarConsulta, editarConsulta, getConsultas
}