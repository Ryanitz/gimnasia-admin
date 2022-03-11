import { resolvers } from "../pages/api/graphql";
import { useState } from "react/cjs/react.development";

export default function AddPlayer() {
  const [playerName, setPlayerName] = useState("");
  const [playerSurname, setPlayerSurname] = useState("");

  const addPlayer = async () => {
    const response = await resolvers.Mutation.createPlayer({
      name: playerName,
      surname: playerSurname,
    });

    console.log(response);
  };

  return (
    <div className="pt-8 flex flex-col w-1/2 m-auto px-4">
      <input
        type="text"
        placeholder="Nombre"
        className="input input-bordered w-full mb-4"
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apellido"
        className="input input-bordered w-full"
        onChange={(e) => setPlayerSurname(e.target.value)}
      />
      <button className="btn mt-4" onClick={addPlayer}>
        Agregar Jugador
      </button>
    </div>
  );
}
