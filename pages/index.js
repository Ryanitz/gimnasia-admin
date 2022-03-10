import { resolvers } from "./api/graphql";
import { useState } from "react/cjs/react.development";
import Players from "../components/players";

export default function Home({ players }) {
  const [playerName, setPlayerName] = useState("");
  const [playerSurname, setPlayerSurname] = useState("");
  const [activeTab, setActiveTab] = useState("Jugadores");

  const tabs = ["Agregar jugador", "Jugadores", "Editar Jugador"];

  const addPlayer = async () => {
    const response = await resolvers.Mutation.createPlayer({
      name: playerName,
      surname: playerSurname,
    });

    console.log(response);
    // getStaticProps();
  };

  return (
    <div>
      <div className="tabs w-screen">
        {tabs.map((tab) => (
          <a
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab tab-lg tab-bordered w-1/3 ${
              activeTab === tab ? "tab-active" : ""
            }`}
          >
            {tab}
          </a>
        ))}
      </div>
      {activeTab === "Agregar jugador" && (
        <div className="pt-8 ml-4 flex flex-col">
          <input
            type="text"
            placeholder="Nombre"
            className="input input-bordered w-full max-w-xs mb-4"
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Apellido"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setPlayerSurname(e.target.value)}
          />
          <button className="btn" onClick={addPlayer}>
            Agregar Jugador
          </button>
        </div>
      )}
      {activeTab === "Jugadores" && (
        <div>
          <Players players={players} />
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const players = await resolvers.Query.players();

  return {
    props: {
      players,
    },
  };
}
