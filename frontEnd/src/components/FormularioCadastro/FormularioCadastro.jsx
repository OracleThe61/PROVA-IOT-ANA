import { useState } from "react"
import { useNavigate } from "react-router"
import { postUsuario } from '../../services/usuario';

function FormularioCadastro() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmar, setSenhaConfirmar] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState(1);


    const [senhasConferes, setSenhasConferes] = useState(true)
    const navigate = useNavigate();

    const handleNomeChange = (e) => setNome(e.target.value)
    const handleCpfChange = (e) => setCpf(e.target.value)
    const handleSenhaChange = (e) => setSenha(e.target.value)
    const handlesenhaConfirmar = (e) => setSenhaConfirmar(e.target.value)
    const handleTipoUsuario = (e) => setTipoUsuario(e.target.value)

    const senhaValida = () => senha.length >= 8 && senha === senhaConfirmar

    const resetForm = () => {
        setNome('')
        setCpf('')
        setSenha('')
        setSenhaConfirmar('')
        setSenhasConferes(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!senhaValida()) {
            setSenhasConferes(false)
            return
        }

        try {
            const data = {
                nome: nome,
                cpf: cpf,
                senha: senha,
                tipo_usuario: tipoUsuario
            }
            await postUsuario(data)

            resetForm()

            alert('Conta criada com sucesso!')
            navigate('/')


        }
        catch (error) {
            console.log('Erro ao de conexão:', error);
            alert('Erro ao Cadastrar conta')
        }
    }

    return (
        <div className='container'>
            <h2 >Criar Usuários</h2>
            <form onSubmit={handleSubmit} >

                <div className="form-group mb-3">
                    <label htmlFor="nomeRegistro" className='form-label'>Nome</label>
                    <input type="text" id='nomeRegistro' className="form-control" value={nome} onChange={handleNomeChange} required />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="cpfRegistro" className='form-label'>Cpf</label>
                    <input type="number" id='cpfRegistro' className="form-control" value={cpf} onChange={handleCpfChange} required />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="senhaRegistro">Senha</label>
                    <input type="password" id='senhaRegistro' className="form-control" value={senha} onChange={handleSenhaChange} placeholder='********' required />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="confirmarSenhaRegistro" className='form-label'>Confirmar Senha</label>
                    <input type="password" id='confirmarSenhaRegistro' className="form-control" value={senhaConfirmar} onChange={handlesenhaConfirmar} placeholder='********' required />

                    {!senhasConferes && (
                        <p>Senhas não correspodem</p>
                    )}
                </div>

                <select nome="tipoUsuario" id='tipoUsuario' className='form-select mb-3' value={tipoUsuario} onChange={handleTipoUsuario}>
                    <option value={1}>médico</option>
                    <option value={2}>Analista administrativo</option>

                </select>


                <div className="d-flex justify-content-center ">
                    <button type='submit' className="btn btn-primary fw-bold">
                        Criar Usuário
                    </button>
                </div>
            </form>

        </div>
    )
}

export default FormularioCadastro