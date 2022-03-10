export default function Players({ players }) {
  return (
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Apellido</th>
          </tr>
        </thead>
        <tbody>
          {players.map(({ name, surname }, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{name}</td>
              <td>{surname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
