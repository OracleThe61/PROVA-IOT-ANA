const EditarConsulta = ({ tipoConsulta, horarioAgendado, onChangeTipoConsulta, onChangeHorarioAgendado }) => {
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="tipoConsulta" className="form-label">Tipo Consulta</label>
        <input
          type="text"
          className="form-control"
          id="tipoConsulta"
          value={tipoConsulta}
          onChange={(e) => onChangeTipoConsulta(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="horarioAgendado" className="form-label">Horario Agendado</label>
        <input
          className="form-control"
          id="horarioAgendado"
          type="date"
          value={horarioAgendado}
          onChange={(e) => onChangeHorarioAgendado(e.target.value)}
        />
        
      </div>

    </div>
  );
};

export default EditarConsulta;