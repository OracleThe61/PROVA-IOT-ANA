import { useEffect, useState } from "react";
import { getConsultas, postConsultas, deleteConsultas, patchConsultas } from "../../services/consulta.js";
import ModalConsulta from "../Modal/Modal";
import EditarConsulta from "../EditarConsulta/EditarConsulta";

function Consultas() {
    const [consultas, setConsultas] = useState([]);

    const [modal, setModal] = useState(false);

    const [consultaSelecionado, setConsultaSelecionado] = useState(null);

    const [modo, setModo] = useState("edit");

    const [horarioAgendado, setHorarioAgendado] = useState("");
    const [tipoConsulta, setTipoConsulta] = useState("");

    const carregarConsultas = async () => {
        try {
            const lista = await getConsultas();
            setConsultas(lista);
        } catch (error) {
            console.log("Erro ao carregar Consultas:", error);
            setConsultas([]);
        }
    };

    useEffect(() => {
        carregarConsultas();
    }, []);

    const abrirModalEditar = (consultas) => {
        setModo("edit");
        setConsultaSelecionado(consultas);

        setHorarioAgendado(consultas.horarioAgendado ?? "");
        setTipoConsulta(consultas.tipo_consulta ?? "");

        setModal(true);
    };

    const abrirModalAdicionar = () => {
        setModo("add");
        setConsultaSelecionado(null);

        setHorarioAgendado("");
        setTipoConsulta("");

        setModal(true);
    };

    const fecharModal = () => {
        setModal(false);
        setConsultaSelecionado(null);
    };

    async function salvar() {
        try {
            const payload = {
                tipo_consulta: tipoConsulta,
                horarioAgendado: horarioAgendado,
            }

            if (modo === "add") {
                const ok = await postConsultas(payload);

                if (ok === "") {
                    alert("Falha ao adicionar consulta.")
                    return false;
                }
                alert("Consulta Adicionado com sucesso")

                await carregarConsultas();
                fecharModal();
            } else {
                if (!consultaSelecionado.id) {
                    alert("Nenhum consulta selecionado");
                    return;
                }

                const ok = await patchConsultas(consultaSelecionado.id, payload)

                if (ok === "") {
                    alert("Não foi possivel editar seu consulta")
                    return;
                }

                alert("Consulta editado com sucesso")

                await carregarConsultas();
                fecharModal();
            }
        } catch (error) {
            console.log("Error:", error)
        }
    }

    const remover = async (id) => {
        try {
            const excluido = await deleteConsultas(id);

            if (excluido === "") {
                alert("Não deu pra excluir, se lascou")
                return false;
            }

            alert("Excluiu o consulta, Parabens")
            await carregarConsultas();
        } catch (error) {
            console.log("Erro:", error);

        }
    }

    return (
        <div className="container mt-4">
            <h2>Gerenciamento de Consultas</h2>
            <button className="btn btn-warning" onClick={abrirModalAdicionar}>
                Adicionar
            </button>

            <br />
            <br />

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Tipo Consulta:</th>
                        <th>Horario Criado:</th>
                        <th>Horario Da Consultas:</th>
                    </tr>

                </thead>
                <tbody>
                    {consultas && consultas.map((p) => (
                        <tr key={p.id}>
                            <td>{p.tipo_consulta}</td>
                            <td>{p.horarioAgendado}</td>
                            <td>{p.horarioCriado}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => abrirModalEditar(p)}>
                                    Editar
                                </button>
                                &nbsp;
                                <button className="btn btn-danger" onClick={() => remover(p.id)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ModalConsulta
                open={modal}
                onClose={fecharModal}
                onSave={salvar}
                title={modo === "add" ? "Adicionar consultas" : (consultaSelecionado?.tipo_consulta ?? "Editar consultas")}
            >
                <EditarConsulta
                    tipoConsulta={tipoConsulta}
                    horarioAgendado={horarioAgendado}
                    onChangeHorarioAgendado={setHorarioAgendado}
                    onChangeTipoConsulta={setTipoConsulta}
                />
            </ModalConsulta>
        </div>
    )
}

export default Consultas