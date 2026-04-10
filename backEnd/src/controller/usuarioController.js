import db from "../config/db.js";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
    try {
        const {nome, senha, cpf, tipo_usuario} = req.body;
        if(nome.length < 5 || nome === ""){
            return res.status(400).json({message:'O nome não está aqui, deve conter pelo menos 5 caracteres e não pode estar vazio'});
        }
        if(cpf.length < 5 || cpf === ""){
            return res.status(400).json({message:'O CPF não está aqui, deve conter pelo menos 5 caracteres e não pode estar vazio'});
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(senha, saltRounds)

        const [result] = await db.query("INSERT INTO usuario (nome, senha, cpf, tipo_usuario, ativo) VALUES (?, ?, ?, ?, ?)", [nome, hashPassword, cpf, tipo_usuario, 1]);

        if(result.affectedRows ===0){
            return res.status(400).json({message: 'Não foi possível criar o usuário.'});
        }
        return res.status(201).json({message: 'Usuário criado com sucesso.'});
    } catch (error) {
        return res.status(500).json({message: 'Erro ao criar usuário.', error: error.message});
    }
}
const getUsers = async (req, res) => {
    try {
		const [resultado] = await db.query("SELECT id, nome, cpf, tipo_usuario FROM usuario where ativo = 1");

		if(resultado.length === 0) {
			return res.status(404).json({ message: "Nenhum usuário encontrado" });
		}
		return res.status(200).json({ message: "Usuários encontrados", data: resultado });
	} catch (error) {
		return res.status(500).json({ message: "Erro ao buscar usuários", error: error.message });
	}
}
const editUser = async (req, res) => {
	try {
		const [resultado] = await db.query("UPDATE usuario SET nome = ?, cpf = ?, tipo_usuario = ? WHERE id = ?", [req.body.nome, req.body.cpf, req.body.tipo_usuario, req.params.id]);

		if (resultado.affectedRows === 0) {  
			return res.status(404).json({ message: "usuario não encontrado" });  
		}
		return res.status(200).json({ message: "usuario editado com sucesso", data: resultado });
	} catch (error) {
		return res.status(500).json({ message: "Erro ao editar usuario", error: error.message });
	}
}
const deleteUser = async (req, res) => {
	try {
		
		const [resultado] = await db.query("DELETE FROM usuario WHERE id = ?", [req.params.id]);

		if (resultado.affectedRows === 0) {  
			return res.status(404).json({ message: "usuario não encontrado" });  
		}
		return res.status(200).json({ message: "usuario deletado com sucesso", data: resultado });
	} catch (error) {
		return res.status(500).json({ message: "Erro ao deletar usuario", error: error.message });
	}
}

export {createUser,getUsers,editUser,deleteUser}